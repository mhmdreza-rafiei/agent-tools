#!/usr/bin/env python3
"""
Audit file and folder paths against files-folders-structure rules.

Detects: non-lowercase folders, >2 folder words, non-snake_case stems,
duplicate stem tokens, format/language tokens in stems, and folder-name echo
(including glued compounds like core/ + coreapi_call -> "coreapi" starts with "core").

Usage:
  python check_files_folders.py [ROOT]
  python check_files_folders.py . --json
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path

# Directories to skip entirely
SKIP_DIR_NAMES = {
    ".git",
    ".hg",
    ".svn",
    ".cursor",
    "node_modules",
    "__pycache__",
    ".venv",
    "venv",
    ".tox",
    "dist",
    "build",
    "out",
    "target",
    ".next",
    "coverage",
    ".pytest_cache",
    "vendor",
}

# Stem tokens that look like file formats / languages (not exhaustive)
FORMAT_TOKENS = {
    "py",
    "python",
    "js",
    "jsx",
    "ts",
    "tsx",
    "mjs",
    "cjs",
    "json",
    "yaml",
    "yml",
    "toml",
    "xml",
    "html",
    "css",
    "scss",
    "sass",
    "less",
    "md",
    "markdown",
    "sql",
    "sh",
    "bash",
    "zsh",
    "fish",
    "ps1",
    "bat",
    "cmd",
    "go",
    "rs",
    "java",
    "kt",
    "kts",
    "rb",
    "php",
    "cs",
    "cpp",
    "c",
    "h",
    "hpp",
    "swift",
    "lua",
    "r",
    "dart",
    "vue",
    "svelte",
}

# Root-level doc stems allowed UPPERCASE
UPPERCASE_DOC_STEMS = {
    "README",
    "AGENTS",
    "CLAUDE",
    "DESIGN",
    "CHANGELOG",
    "CONTRIBUTING",
    "LICENSE",
    "CODEOWNERS",
    "SECURITY",
    "GOVERNANCE",
    "SUPPORT",
}

# Tooling-mandated filenames (full name, case-sensitive match)
TOOLING_FILENAMES = {
    "Dockerfile",
    "Makefile",
    "GNUmakefile",
    "go.mod",
    "go.sum",
    "Cargo.toml",
    "Cargo.lock",
    "package.json",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "composer.json",
    "Gemfile",
    "Rakefile",
    "Procfile",
    ".gitignore",
    ".gitattributes",
    ".dockerignore",
    ".editorconfig",
    # agentry-mandated marker filenames
    "SKILL.md",
    "README.md",
    "AGENTS.md",
    "CLAUDE.md",
    "LICENSE",
}

# Reference doc stems allowed UPPERCASE under skills/*/references/
REFERENCE_DOC_STEMS = {
    "SECTIONS",
    "TEMPLATE",
    "INDEX",
    "EXAMPLES",
    "REFERENCE",
    "REFERENCES",
}

SNAKE_RE = re.compile(r"^[a-z][a-z0-9]*(_[a-z0-9]+)*$")
KEBAB_RE = re.compile(r"^[a-z][a-z0-9]*(-[a-z0-9]+)*$")


@dataclass
class Issue:
    path: str
    code: str
    message: str
    suggestion: str | None = None


def folder_name_words(name: str) -> list[str]:
    return [p for p in name.lower().split("_") if p]


def folder_aliases(folder: str) -> set[str]:
    """Tokens derived from a directory basename for echo detection."""
    base = folder.lower()
    aliases: set[str] = {base}
    for part in base.split("_"):
        if not part:
            continue
        aliases.add(part)
        if len(part) > 3 and part.endswith("s") and not part.endswith("ss"):
            aliases.add(part[:-1])
        if part.endswith("ies") and len(part) > 4:
            aliases.add(part[:-3] + "y")
    return {a for a in aliases if len(a) >= 2}


def stem_echoes_folder(stem: str, parent_folder: str) -> list[tuple[str, str]]:
    """Folder echo: exact segment, glued prefix (core+api->coreapi), suffix."""
    violations: list[tuple[str, str]] = []
    aliases = folder_aliases(parent_folder)
    segments = stem.lower().split("_")

    for seg in segments:
        if not seg:
            continue
        for alias in aliases:
            if seg == alias:
                violations.append(
                    (
                        "STEM_ECHOES_FOLDER_EXACT",
                        f"segment '{seg}' equals folder token '{alias}'",
                    )
                )
                continue
            if len(alias) >= 2 and seg.startswith(alias) and len(seg) > len(alias):
                violations.append(
                    (
                        "STEM_ECHOES_FOLDER_PREFIX",
                        f"segment '{seg}' starts with folder token '{alias}' "
                        f"(glued compound, e.g. core + api -> coreapi)",
                    )
                )
            if len(alias) >= 3 and seg.endswith(alias) and len(seg) > len(alias):
                violations.append(
                    (
                        "STEM_ECHOES_FOLDER_SUFFIX",
                        f"segment '{seg}' ends with folder token '{alias}'",
                    )
                )

    # Whole-stem prefix/suffix when single segment
    if len(segments) == 1:
        seg = segments[0]
        for alias in aliases:
            if len(alias) >= 2 and seg.startswith(alias) and len(seg) > len(alias):
                key = (
                    "STEM_ECHOES_FOLDER_PREFIX",
                    f"stem '{seg}' starts with folder token '{alias}'",
                )
                if key not in violations:
                    violations.append(key)

    return violations


def duplicate_tokens(stem: str) -> list[str]:
    parts = [p for p in stem.lower().split("_") if p]
    seen: set[str] = set()
    dups: list[str] = []
    for p in parts:
        if p in seen and p not in dups:
            dups.append(p)
        seen.add(p)
    return dups


def format_tokens_in_stem(stem: str) -> list[str]:
    parts = [p for p in stem.lower().split("_") if p]
    if len(parts) <= 1:
        return []
    return [p for p in parts if p in FORMAT_TOKENS]


def is_doc_path(path: Path, root: Path) -> bool:
    if path.suffix.lower() not in {".md", ".mdx", ".rst", ".txt"}:
        return False
    rel = path.relative_to(root)
    if len(rel.parts) == 1:
        return True
    top = rel.parts[0].lower()
    return top in {"docs", "doc", "context", "documentation"}


def check_file(path: Path, root: Path, parent_folder: str) -> list[Issue]:
    issues: list[Issue] = []
    rel = path.relative_to(root).as_posix()
    name = path.name

    if name in TOOLING_FILENAMES:
        return issues

    if not path.suffix and name.startswith("."):
        return issues

    stem = path.stem
    suffix = path.suffix.lstrip(".").lower()

    if is_doc_path(path, root):
        rel_parts = path.relative_to(root).parts
        if len(rel_parts) == 1:
            if stem not in UPPERCASE_DOC_STEMS and stem != stem.upper():
                if stem != stem.lower() and "_" not in stem:
                    pass
            if stem in UPPERCASE_DOC_STEMS:
                if path.stem != stem:
                    pass
            expected_upper = stem.isupper() and len(rel_parts) == 1
            well_known = stem.upper() in UPPERCASE_DOC_STEMS
            if len(rel_parts) == 1 and not well_known and stem != stem.upper():
                if re.match(r"^[A-Z][A-Z0-9_]*$", stem) and stem not in UPPERCASE_DOC_STEMS:
                    issues.append(
                        Issue(
                            rel,
                            "DOC_UNEXPECTED_UPPERCASE",
                            f"root doc '{name}' is uppercase but not in well-known list",
                            "Use lowercase snake_case or add to project convention",
                        )
                    )
            if len(rel_parts) == 1 and well_known and path.stem != path.stem.upper():
                issues.append(
                    Issue(
                        rel,
                        "DOC_SHOULD_BE_UPPERCASE",
                        f"well-known doc should be {stem.upper()}{path.suffix}",
                        f"Rename to {stem.upper()}{path.suffix}",
                    )
                )
        else:
            if not SNAKE_RE.match(stem.lower()) and not stem.islower():
                issues.append(
                    Issue(
                        rel,
                        "DOC_NOT_LOWERCASE",
                        "documentation under docs/context should use lowercase snake_case stem",
                        f"e.g. {stem.lower()}{path.suffix}",
                    )
                )
            elif not SNAKE_RE.match(stem):
                if stem != stem.lower():
                    issues.append(
                        Issue(
                            rel,
                            "DOC_NOT_SNAKE_CASE",
                            "doc stem should be lowercase snake_case",
                            None,
                        )
                    )
        return issues

    # agentry reference docs (skills/*/references/SECTIONS.md, TEMPLATE.md, ...)
    rel_parts = path.relative_to(root).parts
    if "references" in rel_parts and stem in REFERENCE_DOC_STEMS:
        return issues

    # agentry .mdc files (agents/rules) use kebab-case, not snake_case
    is_mdc = suffix == "mdc"
    if is_mdc:
        if not KEBAB_RE.match(stem):
            issues.append(
                Issue(
                    rel,
                    "FILE_NOT_KEBAB_CASE",
                    f"stem '{stem}' must be lowercase kebab-case",
                    None,
                )
            )
        # Skip folder-echo and duplicate/format-token checks for .mdc:
        # agentry agent/rule names legitimately include the category
        # (e.g. agents/ai/ai-engineer.mdc) and use kebab-case tokens.
        return issues

    if suffix and stem:
        if not SNAKE_RE.match(stem):
            issues.append(
                Issue(
                    rel,
                    "FILE_NOT_SNAKE_CASE",
                    f"stem '{stem}' must be lowercase snake_case",
                    None,
                )
            )

        for dup in duplicate_tokens(stem):
            issues.append(
                Issue(
                    rel,
                    "STEM_DUPLICATE_TOKEN",
                    f"duplicate token '{dup}' in stem",
                    "Remove repeated word from stem or move into a subfolder",
                )
            )

        for tok in format_tokens_in_stem(stem):
            issues.append(
                Issue(
                    rel,
                    "STEM_FORMAT_TOKEN",
                    f"stem contains format/language token '{tok}'",
                    "Drop token from name (extension already indicates type)",
                )
            )

        if parent_folder:
            for code, detail in stem_echoes_folder(stem, parent_folder):
                issues.append(
                    Issue(
                        rel,
                        code,
                        detail,
                        f"Rename; folder is '{parent_folder}' -- do not echo it in the stem",
                    )
                )

    return issues


def check_folder_dir(path: Path, root: Path) -> list[Issue]:
    issues: list[Issue] = []
    rel = path.relative_to(root).as_posix()
    name = path.name

    if name != name.lower():
        issues.append(
            Issue(
                rel,
                "FOLDER_NOT_LOWERCASE",
                f"folder '{name}' must be lowercase",
                name.lower(),
            )
        )

    words = folder_name_words(name)
    if len(words) > 2:
        issues.append(
            Issue(
                rel,
                "FOLDER_TOO_MANY_WORDS",
                f"folder has {len(words)} words (max 2): {words}",
                "Split into nested single-word folders",
            )
        )

    return issues


def walk(root: Path) -> list[Issue]:
    all_issues: list[Issue] = []

    for dirpath, dirnames, filenames in os_walk(root):
        dirnames[:] = sorted(
            d for d in dirnames if d not in SKIP_DIR_NAMES and not d.startswith(".")
        )

        current = Path(dirpath)
        if current != root:
            all_issues.extend(check_folder_dir(current, root))

        parent_folder = current.name if current != root else ""

        for fn in sorted(filenames):
            if fn in SKIP_DIR_NAMES:
                continue
            fp = current / fn
            if not fp.is_file():
                continue
            all_issues.extend(check_file(fp, root, parent_folder))

    return all_issues


def os_walk(root: Path):
    """Wrapper so we can patch; uses pathlib."""
    import os

    for dirpath, dirnames, filenames in os.walk(root):
        yield Path(dirpath), dirnames, filenames


def main() -> int:
    parser = argparse.ArgumentParser(description="Check file/folder naming rules")
    parser.add_argument(
        "root",
        nargs="?",
        default=".",
        type=Path,
        help="Project root to scan (default: .)",
    )
    parser.add_argument("--json", action="store_true", help="JSON output")
    parser.add_argument(
        "--explain",
        metavar="PATH",
        type=str,
        help="Explain checks for one relative path, e.g. core/coreapi_call.py",
    )
    args = parser.parse_args()
    root = args.root.resolve()

    if args.explain:
        explain_path(root, args.explain)
        return 0

    if not root.is_dir():
        print(f"Not a directory: {root}", file=sys.stderr)
        return 2

    issues = walk(root)

    if args.json:
        print(json.dumps([asdict(i) for i in issues], indent=2))
    else:
        if not issues:
            print(f"OK -- no issues under {root}")
            return 0
        for i in issues:
            sug = f"  -> suggest: {i.suggestion}" if i.suggestion else ""
            print(f"{i.path}\n  [{i.code}] {i.message}{sug}\n")

    return 1 if issues else 0


def explain_path(root: Path, rel_path: str) -> None:
    """Debug helper for agents: show why a path passes or fails."""
    p = Path(rel_path)
    parts = p.parts
    parent_folder = parts[-2] if len(parts) >= 2 else ""
    stem = p.stem
    print(f"Path: {rel_path}")
    print(f"Parent folder token: '{parent_folder}'")
    print(f"Stem: '{stem}'")
    print(f"Folder aliases: {sorted(folder_aliases(parent_folder)) if parent_folder else '--'}")
    print(f"Duplicate tokens: {duplicate_tokens(stem) or 'none'}")
    print(f"Format tokens: {format_tokens_in_stem(stem) or 'none'}")
    for code, detail in stem_echoes_folder(stem, parent_folder):
        print(f"Echo: [{code}] {detail}")


if __name__ == "__main__":
    sys.exit(main())
