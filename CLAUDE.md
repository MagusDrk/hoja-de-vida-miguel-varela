# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static, client-side multilingual CV/résumé site for Miguel Varela. No build system, package manager, or backend — open `index.html` directly in a browser to preview.

Deployed automatically to GitHub Pages on every push to `master` via `.github/workflows/static.yml`.

## File roles

- `index.html` — minimal shell; loads the four scripts and CSS, defines empty `<header>`, `<main>`, `<footer>`
- `script.js` — all rendering logic; builds the DOM from locale data at runtime
- `cv-data-es.js`, `cv-data-en.js`, `cv-data-fr.js` — resume content per locale (exported as `cvDataEs`, `cvDataEn`, `cvDataFr`)
- `style.css` — all visual styling and layout

## Architecture

`script.js` ties everything together:

1. `window.load` detects `navigator.language` and calls `setLanguage(lang)`.
2. `setLanguage` calls `createCV(titles[lang], cvData[lang])`, where `titles` is the in-file section-label map and `cvData` aggregates the three locale globals.
3. `createCV` calls `clearContent()` then a series of `createSection(title, content)` helpers that generate HTML strings and append `<section>` elements to `<main>`.

## Editing rules

- **Content changes** → edit `cv-data-*.js` only.
- **New CV section** → add data to all three `cv-data-*.js` files, add a title key to the `titles` object in `script.js` for all three locales, and add a `createSection(...)` call inside `createCV`.
- **Layout/style** → `style.css`.
- **DOM structure or rendering logic** → `script.js`.
- **Never add external dependencies** without migrating the project away from pure-static.

## Localization

Supported locales: `es`, `en`, `fr`. Language is auto-detected from `navigator.language` on load; buttons in the header allow manual switching via `setLanguage('es'|'en'|'fr')`.

When adding or renaming a field in the data files, keep all three locale files in sync.
