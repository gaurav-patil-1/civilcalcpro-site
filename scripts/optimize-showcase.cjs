/* Rebuild web delivery assets; preserve the original framed PNG captures. */
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');

const root = path.resolve(__dirname, '../public/images/showcase');
const names = [
  'home-calculators',
  'rcc-library',
  'figma-calc-screen',
  'scientific-calculator',
  'figma-replace-projects-list',
  'figma-replace-project-summary',
  'figma-replace-boq-export',
  'history',
  'unit-converter',
];

async function main() {
  let originalBytes = 0;
  const totals = { 550: 0, 1100: 0 };
  for (const mode of ['Light', 'Dark']) {
    for (const name of names) {
      const source = path.join(root, mode, `${name}.png`);
      const metadata = await sharp(source).metadata();
      if (metadata.width !== 1100 || metadata.height !== 2275) {
        throw new Error(`${source}: expected the 1100 × 2275 framed source`);
      }
      originalBytes += (await fs.stat(source)).size;
      for (const width of [550, 1100]) {
        const destination = path.join(root, mode, `${name}-${width}.webp`);
        await sharp(source)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 88, alphaQuality: 100, effort: 6, smartSubsample: true })
          .toFile(destination);
        totals[width] += (await fs.stat(destination)).size;
      }
    }
  }
  console.log(JSON.stringify({ sources: names.length * 2, originalBytes, webpBytesByWidth: totals }, null, 2));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
