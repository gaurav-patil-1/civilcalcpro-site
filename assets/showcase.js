(function () {
  'use strict';
  var root = document.documentElement;
  var version = 'webp-20261030';
  var workflowImage = document.getElementById('workflow-screen');
  var workflowFigure = document.getElementById('workflow-figure');
  var workflowStatus = document.getElementById('workflow-status');
  var workflowWindow = workflowImage && workflowImage.parentElement;
  var steps = Array.from(document.querySelectorAll('.workflow-step'));
  var selectedStep = steps[0];
  var requestId = 0;
  var workflowNear = false;
  var cache = new Map();

  function url(file, width, theme) {
    return '/public/images/showcase/' + (theme === 'dark' ? 'Dark' : 'Light') + '/' +
      file.replace(/\.png$/, '-' + width + '.webp') + '?v=' + version;
  }

  function setSources(image, theme) {
    var file = image.dataset.showcase;
    image.srcset = url(file, 550, theme) + ' 550w, ' + url(file, 1100, theme) + ' 1100w';
    image.src = url(file, 1100, theme);
  }

  function workflowWidth() {
    var width = workflowImage.getBoundingClientRect().width || 288;
    return width * (window.devicePixelRatio || 1) <= 550 ? 550 : 1100;
  }

  function prepare(source, priority) {
    var entry = cache.get(source);
    if (entry) {
      if (priority === 'high') entry.image.fetchPriority = 'high';
      return entry.promise;
    }
    var image = new Image();
    image.decoding = 'async';
    image.fetchPriority = priority || 'low';
    var promise = new Promise(function (resolve, reject) {
      image.onload = function () {
        // Decode before revealing the image, rather than showing the previous step
        // while the browser is still downloading/decoding the new screenshot.
        (image.decode ? image.decode() : Promise.resolve()).then(resolve, reject);
      };
      image.onerror = function () { reject(new Error('Preview failed to load')); };
    }).catch(function (error) {
      cache.delete(source); // A click can retry a failed request.
      throw error;
    });
    cache.set(source, { image: image, promise: promise });
    image.src = source;
    return promise;
  }

  function warmWorkflow() {
    if (!workflowImage) return;
    workflowNear = true;
    var theme = root.dataset.theme;
    var width = workflowWidth();
    steps.forEach(function (step) {
      prepare(url(step.dataset.showcase, width, theme)).catch(function () {});
    });
  }

  function selectStep(step) {
    if (!step || !workflowImage) return;
    selectedStep = step;
    var id = ++requestId;
    var theme = root.dataset.theme;
    var source = url(step.dataset.showcase, workflowWidth(), theme);
    steps.forEach(function (item) {
      var active = item === step;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    workflowImage.classList.add('is-changing');
    workflowWindow.setAttribute('aria-busy', 'true');
    workflowStatus.textContent = 'Loading preview…';
    workflowStatus.hidden = false;
    prepare(source, 'high').then(function () {
      // Rapid hover, keyboard focus, or theme changes must never reveal an old request.
      if (id !== requestId || theme !== root.dataset.theme) return;
      workflowImage.removeAttribute('srcset');
      workflowImage.src = source;
      workflowImage.dataset.showcase = step.dataset.showcase;
      workflowImage.alt = step.dataset.alt;
      workflowFigure.textContent = step.dataset.figure;
      workflowImage.classList.remove('is-changing');
      workflowStatus.hidden = true;
      workflowWindow.setAttribute('aria-busy', 'false');
    }).catch(function () {
      if (id !== requestId || theme !== root.dataset.theme) return;
      workflowStatus.textContent = 'Preview unavailable. Select this step to retry.';
      workflowWindow.setAttribute('aria-busy', 'false');
    });
    warmWorkflow();
  }

  function applyTheme(theme) {
    ++requestId;
    root.dataset.theme = theme;
    var dark = theme === 'dark';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#0a100d' : '#f1efe7';
    document.querySelectorAll('img[data-showcase]').forEach(function (image) {
      if (image !== workflowImage || !workflowNear) setSources(image, theme);
    });
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    });
    if (workflowNear) selectStep(selectedStep);
    try { localStorage.setItem('ccp_theme', theme); } catch (_) {}
  }

  document.addEventListener('click', function (event) {
    if (event.target.closest('[data-theme-toggle]')) {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    }
  });
  steps.forEach(function (step) {
    step.addEventListener('click', function () { selectStep(step); });
    step.addEventListener('focus', function () { selectStep(step); });
    step.addEventListener('mouseenter', function () {
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) selectStep(step);
    });
  });
  applyTheme(root.dataset.theme || 'light');
  var workflow = document.getElementById('workflow');
  if (workflow && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        warmWorkflow();
        observer.disconnect();
      }
    }, { rootMargin: '800px 0px' });
    observer.observe(workflow);
  } else {
    window.addEventListener('load', warmWorkflow, { once: true });
  }
})();
