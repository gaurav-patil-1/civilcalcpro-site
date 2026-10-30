# Website showcase images

These are current app captures in transparent phone frames, with separate
Light and Dark versions. The website switches the images with its theme.
Keep the `1100 x 2275` canvas, transparent corners, filenames, and Light/Dark
folders when replacing them.

| File in both theme folders | App screen |
| --- | --- |
| `home-calculators.png` | Calculator home and construction categories |
| `rcc-library.png` | RCC calculator library |
| `figma-calc-screen.png` | Formwork: Beam (3 sides) |
| `scientific-calculator.png` | Scientific calculator with an example result |
| `figma-replace-projects-list.png` | Saved Projects list |
| `figma-replace-project-summary.png` | Project Materials tab with totals |
| `figma-replace-boq-export.png` | Project BOQ with export action |
| `history.png` | Saved calculation history |
| `unit-converter.png` | Converter categories |

The legacy `figma-` filenames are retained for stable website references; they
now contain matching app screens, not placeholders. OS status and gesture
bars are removed, with breathing room preserved below the app navigation.
Currency-bearing examples use USD consistently for the Seattle project.

Do not replace these files with unframed device captures. The reproducible
frame compositor and raw Light/Dark captures are in the sibling app checkout:
`civil-calc-pro/output/website-showcase/build-showcase.cjs`.

When refreshing the assets, update the `version` cache key in `assets/showcase.js` and initial
image URLs in `index.html` so returning visitors receive the new images.

## Fast delivery assets

Serve the responsive WebP derivatives instead of the PNG sources:

- `<original-stem>-550.webp` for smaller display sizes.
- `<original-stem>-1100.webp` for larger or high-density displays.

Both sizes preserve the transparent phone frame and screenshot aspect ratio.
The 550px version rounds the proportional height to 1138px; the full-size
version is 1100 × 2275px. Encoding uses quality 88 and lossless alpha.
The PNGs remain the source of truth for future screenshot updates.

Regenerate all 36 derivatives with Node and Sharp:

```sh
npm install --no-save --package-lock=false sharp
node scripts/optimize-showcase.cjs
```

Alternatively, set `SHARP_MODULE` to an existing Sharp installation when running
the script. After rebuilding, update the website's image cache version so returning
visitors receive the new assets.
