# Module ID Unification Script

This repository includes a helper script that normalizes the classroom lesson modules so they all use the same canonical IDs, labels, and directory names.

## Usage

```bash
node scripts/unify-modules.mjs          # dry run (default)
node scripts/unify-modules.mjs --apply  # write changes
node scripts/unify-modules.mjs --dry    # explicit dry run
```

Running without `--apply` performs a dry run and prints a summary table of the updates it would make. Use `--apply` to write frontmatter updates and move lessons into the canonical folder for their module.

## What the script does

- Walks every `*.mdx` file under `src/content/classroom/`.
- Normalizes the `module` field to one of the canonical module IDs.
- Adds or fixes the human-readable `moduleLabel`.
- Preserves all other frontmatter values (including `order`) and leaves the MDX body untouched.
- Moves lessons into the canonical module directory when necessary.
- Prints a summary table detailing the planned or applied changes.

If the script cannot map a file to a known module ID, it will report the file in the summary without making any changes. Re-run with `--apply` after reviewing the dry-run output to persist the edits.
