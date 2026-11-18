const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');

const INDEXABLE_PAGES = [
  { file: 'index.html', url: 'https://civilcalcpro.com/' },
  { file: 'calculators/index.html', url: 'https://civilcalcpro.com/calculators/' },
  { file: 'concrete-calculators/index.html', url: 'https://civilcalcpro.com/concrete-calculators/' },
  { file: 'rcc-steel-calculators/index.html', url: 'https://civilcalcpro.com/rcc-steel-calculators/' },
  { file: 'quantity-boq-calculators/index.html', url: 'https://civilcalcpro.com/quantity-boq-calculators/' },
  { file: 'electrical-calculators/index.html', url: 'https://civilcalcpro.com/electrical-calculators/' },
  { file: 'area-volume-conversion/index.html', url: 'https://civilcalcpro.com/area-volume-conversion/' },
  { file: 'privacy/index.html', url: 'https://civilcalcpro.com/privacy/' },
  { file: 'terms/index.html', url: 'https://civilcalcpro.com/terms/' },
];

function readRepoFile(relPath) {
  return fs.readFileSync(path.join(REPO_ROOT, relPath), 'utf8');
}

function extractJsonLdBlocks(html) {
  const matches = [
    ...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ];
  return matches.map((m) => JSON.parse(m[1]));
}

test('Google Search Site Name signals on homepage are 100% aligned and collision-free', () => {
  const homeHtml = readRepoFile('index.html');
  const blocks = extractJsonLdBlocks(homeHtml);
  assert.ok(blocks.length >= 2, 'Homepage must have standalone WebSite + entity graph JSON-LD');

  const websiteSchema = blocks[0];
  assert.equal(websiteSchema['@type'], 'WebSite');
  assert.equal(websiteSchema.name, 'CivilCalc Pro');
  assert.equal(websiteSchema.url, 'https://civilcalcpro.com/');
  assert.ok(Array.isArray(websiteSchema.alternateName));
  assert.ok(websiteSchema.alternateName.includes('CivilCalc Pro App'));
  assert.equal(websiteSchema.alternateName.includes('CivilCalc'), false);
  assert.equal(websiteSchema.alternateName.includes('Civil Calc Pro'), false);
  assert.equal(websiteSchema.alternateName.includes('civilcalcpro.com'), false);
  assert.equal(websiteSchema.alternateName.includes('CivilCalc Pro'), false);

  const h1Match = homeHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  assert.ok(h1Match, 'Homepage must have an H1');
  const h1Text = h1Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  assert.match(h1Text, /^CivilCalc Pro\b/, 'Homepage H1 must lead with CivilCalc Pro');

  assert.match(homeHtml, /<meta\s+property="og:site_name"\s+content="CivilCalc Pro"\s*\/>/);
  assert.match(homeHtml, /<meta\s+name="application-name"\s+content="CivilCalc Pro"\s*\/>/);
  assert.match(homeHtml, /<meta\s+name="apple-mobile-web-app-title"\s+content="CivilCalc Pro"\s*\/>/);

  const manifest = JSON.parse(readRepoFile('site.webmanifest'));
  assert.equal(manifest.name, 'CivilCalc Pro');
  assert.equal(manifest.short_name, 'CivilCalc Pro');
});

test('All 9 indexable pages have unique titles/descriptions, valid JSON-LD, single H1, and exact canonicals', () => {
  const titles = new Set();
  const descriptions = new Set();

  for (const page of INDEXABLE_PAGES) {
    const html = readRepoFile(page.file);
    const blocks = extractJsonLdBlocks(html);
    assert.ok(blocks.length >= 1, `${page.file} must have JSON-LD`);

    if (page.file !== 'index.html') {
      const hasWebSiteOnSubpage = blocks.some(
        (b) =>
          b['@type'] === 'WebSite' ||
          (Array.isArray(b['@graph']) && b['@graph'].some((g) => g['@type'] === 'WebSite')),
      );
      assert.equal(
        hasWebSiteOnSubpage,
        false,
        `${page.file}: WebSite schema must only exist on root homepage`,
      );

      const breadcrumb = blocks.find((b) => b['@type'] === 'BreadcrumbList');
      assert.ok(breadcrumb, `${page.file} must include BreadcrumbList JSON-LD`);
      assert.equal(breadcrumb.itemListElement[0].name, 'CivilCalc Pro');
      assert.equal(breadcrumb.itemListElement[0].item, 'https://civilcalcpro.com/');
    }

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    assert.ok(titleMatch, `${page.file} missing <title>`);
    const title = titleMatch[1].trim();
    assert.equal(titles.has(title), false, `Duplicate <title> on ${page.file}: ${title}`);
    titles.add(title);

    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    assert.ok(descMatch, `${page.file} missing meta description`);
    const desc = descMatch[1].trim();
    assert.ok(desc.length >= 90, `${page.file} meta description too short (${desc.length} chars)`);
    assert.equal(descriptions.has(desc), false, `Duplicate description on ${page.file}`);
    descriptions.add(desc);

    const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
    assert.ok(canonMatch, `${page.file} missing canonical`);
    assert.equal(canonMatch[1], page.url, `${page.file} canonical mismatch`);

    const ogUrlMatch = html.match(/<meta\s+property="og:url"\s+content="([^"]+)"/i);
    assert.ok(ogUrlMatch, `${page.file} missing og:url`);
    assert.equal(ogUrlMatch[1], page.url, `${page.file} og:url mismatch`);

    assert.match(html, /max-image-preview:large/, `${page.file} missing max-image-preview:large`);
    assert.match(
      html,
      /https:\/\/civilcalcpro\.com\/og-banner\.png/,
      `${page.file} missing 1200x630 og-banner.png`,
    );

    const h1Count = [...html.matchAll(/<h1[\s>]/gi)].length;
    assert.equal(h1Count, 1, `${page.file} must have exactly 1 <h1>, found ${h1Count}`);
  }

  assert.equal(fs.existsSync(path.join(REPO_ROOT, 'og-banner.png')), true);
});

test('Zero broken internal links, fragment anchors, or local asset paths across all HTML pages', () => {
  const allFiles = [...INDEXABLE_PAGES.map((p) => p.file), '404.html'];
  const idMap = new Map();

  for (const file of allFiles) {
    const html = readRepoFile(file);
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
    const route = file === 'index.html' ? '/' : file === '404.html' ? '/404.html' : `/${file.replace('/index.html', '/')}`;
    idMap.set(route, ids);
  }

  for (const file of allFiles) {
    const html = readRepoFile(file);
    const currentRoute =
      file === 'index.html'
        ? '/'
        : file === '404.html'
          ? '/404.html'
          : `/${file.replace('/index.html', '/')}`;

    for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const ref = m[1];
      if (
        ref.startsWith('http://') ||
        ref.startsWith('https://') ||
        ref.startsWith('mailto:')
      ) {
        continue;
      }

      if (ref.startsWith('#')) {
        const frag = ref.slice(1);
        assert.equal(
          idMap.get(currentRoute).has(frag),
          true,
          `${file} has broken local anchor ${ref}`,
        );
        continue;
      }

      const [pathname, hash] = ref.split('#');
      const cleanPath = pathname.split('?')[0];

      if (cleanPath.endsWith('/')) {
        const targetHtml =
          cleanPath === '/'
            ? path.join(REPO_ROOT, 'index.html')
            : path.join(REPO_ROOT, cleanPath.slice(1), 'index.html');
        assert.equal(
          fs.existsSync(targetHtml),
          true,
          `${file} links to missing route ${ref}`,
        );
        if (hash) {
          assert.equal(
            idMap.get(cleanPath)?.has(hash),
            true,
            `${file} links to missing anchor #${hash} on ${cleanPath}`,
          );
        }
      } else {
        const targetAsset = path.join(REPO_ROOT, cleanPath.replace(/^\//, ''));
        assert.equal(
          fs.existsSync(targetAsset),
          true,
          `${file} references missing asset ${ref}`,
        );
      }
    }
  }
});

test('sitemap.xml matches all 9 canonical URLs with zero invalid entries', () => {
  const sitemap = readRepoFile('sitemap.xml');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(
    locs,
    INDEXABLE_PAGES.map((p) => p.url),
  );
  assert.equal(sitemap.includes('undefined'), false);
});
