---
description: "Workspace guidance for the static multilingual CV/resume site. Use when editing HTML, CSS, JavaScript, or locale data for this project."
---

# Workspace instructions

## Project overview

This repository is a static, client-side résumé/CV site for Miguel Varela.

- `index.html` is the shell page and loads the site assets.
- `script.js` builds the page DOM dynamically from locale-specific data.
- `cv-data-es.js`, `cv-data-en.js`, and `cv-data-fr.js` contain the Spanish, English, and French resume content.
- `style.css` contains the layout and visual styling.
- `photo.jpg` and `background.jpg` are the visual assets used by the site.

There is no package manager, build system, or backend server in this repository. Changes can be previewed by opening `index.html` in a browser.

## Key patterns and conventions

- The site is plain HTML, CSS, and vanilla JavaScript.
- All resume content is loaded by `script.js` at runtime from the locale data files.
- The `titles` object in `script.js` maps UI section titles for each language.
- `setLanguage()` selects a language and regenerates the page content.
- Frequent updates should be made in the locale data files, not in the DOM creation helpers.

## When editing

- For content updates, edit `cv-data-*.js`.
- For layout or style changes, edit `style.css`.
- For behavior or structural DOM changes, edit `script.js`.
- Keep `index.html` minimal; it primarily loads assets and defines the page skeleton.

## Localization guidance

- Add or modify fields in each `cv-data-*.js` file consistently across languages.
- If you add a new section to the rendered page, update both `script.js` and every locale data file.
- Keep language-switcher buttons in `script.js` aligned with supported locales: `es`, `en`, `fr`.

## Best practices

- Avoid adding external dependencies unless the repository is explicitly migrated from static to build-based.
- Use semantic HTML in any new markup and preserve existing CSS class names where possible.
- Keep data and presentation separated: resume content belongs in the `cv-data-*.js` files, while rendering logic belongs in `script.js`.

## Preview and troubleshooting

- Open `index.html` directly in a browser to preview the site.
- If the page does not render, verify that the locale data scripts load before `script.js` in `index.html`.

## Use when

Use this guidance when working on:

- language-specific CV content
- responsive styling or layout updates
- JavaScript rendering logic for the resume
- browser preview and static site maintenance
