# workbook

Build the human PDFs for `master/` and pack `releases/master.zip`.

Human pages live in `scripts/workbook/pages/`. Those become `master/*.pdf`.
AI markdown lives in `master/context/` and is never printed into the PDFs.

No npm dependencies. Uses Edge or Chrome headless when present.

## Usage

```bash
# Rebuild PDFs + zip (from repo root)
node scripts/workbook/run.mjs

# One markdown file → sibling .pdf
node scripts/workbook/run.mjs path/to/notes.md
```

If no browser is found, the pack still zips; open any fallback `.html` and Print to PDF.

Author: mhmdreza_rafiei
