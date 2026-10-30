const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const code = fs.readFileSync(path.join(__dirname, '../assets/showcase.js'), 'utf8');
const files = ['rcc-library.png', 'figma-calc-screen.png', 'figma-replace-projects-list.png', 'figma-replace-boq-export.png'];
const flush = () => new Promise((resolve) => setImmediate(resolve));

function element(dataset = {}) {
  const classes = new Set();
  const attributes = new Map();
  const events = new Map();
  return {
    dataset, hidden: false, textContent: '', src: '', srcset: '',
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
      contains: (name) => classes.has(name),
      toggle(name, active) { if (active) classes.add(name); else classes.delete(name); },
    },
    setAttribute(name, value) { attributes.set(name, String(value)); },
    getAttribute(name) { return attributes.get(name) ?? null; },
    removeAttribute(name) { attributes.delete(name); if (name === 'srcset') this.srcset = ''; },
    addEventListener(name, callback) {
      if (!events.has(name)) events.set(name, []);
      events.get(name).push(callback);
    },
    emit(name, event = {}) { for (const callback of events.get(name) || []) callback(event); },
    closest() { return null; },
  };
}

function setup({ theme = 'light', dpr = 1, width = 288, hover = true, observer = true } = {}) {
  const root = element({ theme });
  const image = element({ showcase: files[0] });
  image.parentElement = element();
  image.getBoundingClientRect = () => ({ width });
  const figure = element();
  const status = element();
  const workflow = element();
  const toggle = element();
  toggle.closest = (selector) => selector === '[data-theme-toggle]' ? toggle : null;
  const hero = element({ showcase: 'home-calculators.png' });
  const steps = files.map((showcase, index) => element({ showcase, alt: `Screen ${index}`, figure: `Figure ${index}` }));
  const document = element();
  document.documentElement = root;
  const ids = { 'workflow-screen': image, 'workflow-figure': figure, 'workflow-status': status, workflow };
  document.getElementById = (id) => ids[id] || null;
  document.querySelectorAll = (selector) => ({ '.workflow-step': steps, 'img[data-showcase]': [hero, image], '[data-theme-toggle]': [toggle] })[selector] || [];
  const meta = {};
  document.querySelector = () => meta;
  const requests = [];
  class Image {
    constructor() {
      requests.push(this);
      this.loaded = false;
      this.decoded = false;
      this.decodePromise = new Promise((resolve, reject) => { this.resolveDecode = resolve; this.rejectDecode = reject; });
    }
    decode() { return this.decodePromise; }
    load() { this.loaded = true; this.onload(); }
    finish() { if (!this.loaded) this.load(); this.decoded = true; this.resolveDecode(); }
    fail() { this.onerror(); }
  }
  const observers = [];
  class IntersectionObserver {
    constructor(callback, options) { this.callback = callback; this.options = options; this.disconnected = false; observers.push(this); }
    observe(target) { this.target = target; }
    disconnect() { this.disconnected = true; }
    trigger(isIntersecting) { this.callback([{ isIntersecting }]); }
  }
  const window = element();
  window.devicePixelRatio = dpr;
  window.matchMedia = () => ({ matches: hover });
  if (observer) window.IntersectionObserver = IntersectionObserver;
  const stored = new Map();
  vm.runInNewContext(code, { document, window, Image, IntersectionObserver, Promise, Map, localStorage: { setItem: (key, value) => stored.set(key, value) } });
  const request = (index, mode = root.dataset.theme) => {
    const stem = files[index].replace('.png', '-');
    return requests.filter((item) => item.src.includes(`/${mode === 'dark' ? 'Dark' : 'Light'}/${stem}`)).at(-1);
  };
  return { root, image, figure, status, workflow, toggle, hero, steps, document, window, requests, observers, stored, request,
    switchTheme() { document.emit('click', { target: toggle }); },
  };
}

test('cold hover shows loading and waits for both download and decode before displaying the chosen screen', async () => {
  const h = setup();
  const initialSource = h.image.src;
  h.steps[1].emit('mouseenter');
  assert.equal(h.image.src, initialSource);
  assert.equal(h.image.classList.contains('is-changing'), true);
  assert.equal(h.image.parentElement.getAttribute('aria-busy'), 'true');
  assert.equal(h.status.hidden, false);
  assert.equal(h.status.textContent, 'Loading preview…');
  assert.equal(h.steps[1].getAttribute('aria-pressed'), 'true');
  const request = h.request(1);
  request.load();
  await flush();
  assert.equal(h.image.src, initialSource, 'download alone must not reveal an undecoded image');
  request.finish();
  await flush();
  assert.equal(h.image.src, request.src);
  assert.equal(h.image.dataset.showcase, files[1]);
  assert.equal(h.image.alt, 'Screen 1');
  assert.equal(h.figure.textContent, 'Figure 1');
  assert.equal(h.image.srcset, '');
  assert.equal(h.image.classList.contains('is-changing'), false);
  assert.equal(h.status.hidden, true);
  assert.equal(h.image.parentElement.getAttribute('aria-busy'), 'false');
});

test('rapid A then B selection ignores A when its decode finishes after B', async () => {
  const h = setup();
  h.steps[1].emit('mouseenter');
  const a = h.request(1);
  h.steps[2].emit('mouseenter');
  const b = h.request(2);
  b.finish();
  await flush();
  a.finish();
  await flush();
  assert.equal(h.image.src, b.src);
  assert.equal(h.figure.textContent, 'Figure 2');
  assert.equal(h.steps[1].getAttribute('aria-pressed'), 'false');
  assert.equal(h.steps[2].getAttribute('aria-pressed'), 'true');
});

test('pending light-theme requests cannot replace the selected dark-theme screen', async () => {
  const h = setup();
  h.steps[3].emit('click');
  const light = h.request(3, 'light');
  h.switchTheme();
  const dark = h.request(3, 'dark');
  assert.equal(h.root.dataset.theme, 'dark');
  assert.match(h.hero.src, /\/Dark\//);
  light.finish();
  await flush();
  assert.equal(h.status.hidden, false, 'old theme completion must leave current loading state intact');
  dark.finish();
  await flush();
  assert.equal(h.image.src, dark.src);
  assert.equal(h.status.hidden, true);
  assert.equal(h.stored.get('ccp_theme'), 'dark');
});

test('load errors show a retry message and a new click retries instead of reusing the failed cache entry', async () => {
  const h = setup();
  h.steps[1].emit('click');
  const failed = h.request(1);
  failed.fail();
  await flush();
  assert.equal(h.status.hidden, false);
  assert.match(h.status.textContent, /unavailable.*retry/i);
  assert.equal(h.image.parentElement.getAttribute('aria-busy'), 'false');
  h.steps[1].emit('click');
  const retry = h.request(1);
  assert.notEqual(retry, failed);
  assert.equal(h.image.parentElement.getAttribute('aria-busy'), 'true');
  retry.finish();
  await flush();
  assert.equal(h.image.src, retry.src);
  assert.equal(h.status.hidden, true);
});

test('a stale request failure does not overwrite the latest successful preview', async () => {
  const h = setup();
  h.steps[1].emit('click');
  const stale = h.request(1);
  h.steps[2].emit('click');
  h.request(2).finish();
  await flush();
  stale.fail();
  await flush();
  assert.equal(h.image.src, h.request(2).src);
  assert.equal(h.status.hidden, true);
});

test('keyboard focus and touch clicks select previews while coarse-pointer hover does not', async () => {
  const h = setup({ hover: false });
  h.steps[1].emit('mouseenter');
  assert.equal(h.requests.length, 0);
  h.steps[1].emit('focus');
  h.request(1).finish();
  await flush();
  assert.equal(h.image.src, h.request(1).src);
  h.steps[3].emit('click');
  h.request(3).finish();
  await flush();
  assert.equal(h.image.src, h.request(3).src);
});

test('near-viewport observer preloads four previews only for the current theme and selected resolution', () => {
  const h = setup({ theme: 'dark', width: 250, dpr: 2 });
  assert.equal(h.requests.length, 0);
  assert.equal(h.observers[0].target, h.workflow);
  assert.equal(h.observers[0].options.rootMargin, '800px 0px');
  h.observers[0].trigger(false);
  assert.equal(h.requests.length, 0);
  h.observers[0].trigger(true);
  assert.equal(h.requests.length, 4);
  assert.equal(new Set(h.requests.map((item) => item.src)).size, 4);
  for (const request of h.requests) {
    assert.match(request.src, /\/Dark\/.*-550\.webp\?v=/);
    assert.equal(request.fetchPriority, 'low');
  }
  assert.equal(h.observers[0].disconnected, true);
  h.steps[2].emit('focus');
  assert.equal(h.requests.length, 4, 'selection should reuse warmed downloads');
  assert.equal(h.request(2).fetchPriority, 'high');
});

test('high-density displays preload the 1100px assets and theme changes warm the selected theme', () => {
  const h = setup({ width: 320, dpr: 2 });
  h.observers[0].trigger(true);
  assert.equal(h.requests.length, 4);
  assert.ok(h.requests.every((request) => /\/Light\/.*-1100\.webp/.test(request.src)));
  h.switchTheme();
  assert.equal(h.requests.length, 8);
  assert.equal(h.requests.filter((request) => /\/Dark\/.*-1100\.webp/.test(request.src)).length, 4);
});

test('without IntersectionObserver the window load event warms previews', () => {
  const h = setup({ observer: false });
  assert.equal(h.requests.length, 0);
  h.window.emit('load');
  assert.equal(h.requests.length, 4);
});
