/**
 * Page lookup from window.OMG_PAGES (loaded from pages.json).
 * Mirrors svelte-app/src/lib/pages-data.js
 */
(function () {
  var SLUGS_WITH_DEDICATED_ROUTES = ['index', 'contact', 'free-quote', 'resources', 'services'];
  var SERVICE_LOCATION_BASES = ['emergency-glass-repair', 'storefront-glass-repair', 'window-glass-replacement'];
  var LOCATION_FIRST_PREFIXES = [
    'north-york',
    'richmond-hill',
    'newmarket',
    'etobicoke',
    'markham',
    'scarborough',
    'mississauga',
    'brampton',
    'toronto',
    'vaughan',
  ].sort(function (a, b) {
    return b.length - a.length;
  });

  function urlToSlug(url) {
    return String(url || '').replace(/\.html$/, '');
  }

  function getAllPages() {
    return Array.isArray(window.OMG_PAGES) ? window.OMG_PAGES : [];
  }

  window.OMG_urlToSlug = urlToSlug;

  window.OMG_getPageBySlug = function (slug) {
    var slugClean = urlToSlug(slug);
    var all = getAllPages();
    for (var i = 0; i < all.length; i++) {
      var p = all[i];
      if (p.url === slugClean || urlToSlug(p.url) === slugClean) return p;
    }
    return null;
  };

  window.OMG_getCanonicalSlugIfLocationFirst = function (slug) {
    var clean = urlToSlug(slug);
    if (SLUGS_WITH_DEDICATED_ROUTES.indexOf(clean) !== -1) return null;
    if (window.OMG_getPageBySlug(clean)) return null;
    for (var i = 0; i < LOCATION_FIRST_PREFIXES.length; i++) {
      var loc = LOCATION_FIRST_PREFIXES[i];
      var prefix = loc + '-';
      if (clean.indexOf(prefix) !== 0) continue;
      var service = clean.slice(prefix.length);
      if (SERVICE_LOCATION_BASES.indexOf(service) === -1) continue;
      var canonical = service + '-' + loc;
      if (window.OMG_getPageBySlug(canonical)) return canonical;
    }
    return null;
  };

  window.OMG_getContentPageSlugs = function () {
    return getAllPages()
      .map(function (p) {
        return urlToSlug(p.url);
      })
      .filter(function (slug) {
        return SLUGS_WITH_DEDICATED_ROUTES.indexOf(slug) === -1;
      });
  };

  window.OMG_getServicePages = function () {
    return getAllPages().filter(function (p) {
      return p.type === 'service';
    });
  };

  window.OMG_getResourcePages = function () {
    return getAllPages().filter(function (p) {
      return p.type === 'resource';
    });
  };

  window.OMG_getResourceSlugs = function () {
    return window.OMG_getResourcePages().map(function (p) {
      return urlToSlug(p.url);
    });
  };

  window.OMG_isResourcePage = function (page) {
    return page && page.type === 'resource';
  };
})();
