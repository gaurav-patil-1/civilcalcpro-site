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

When refreshing the assets, update the `showcaseVersion` cache key and initial
image URLs in `index.html` so returning visitors receive the new images.
