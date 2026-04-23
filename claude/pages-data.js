/**
 * Page lookup from window.OMG_PAGES (loaded from pages.json).
 * Mirrors svelte-app/src/lib/pages-data.js
 */
(function () {
  var SLUGS_WITH_DEDICATED_ROUTES = ['index', 'contact', 'free-quote', 'resources', 'services'];
  var SERVICE_LOCATION_BASES = [
    'residential-window-and-door-hardware-repairs',
    'commercial-window-and-door-hardware-repairs',
    'residential-double-pane-window-replacement',
    'commercial-double-pane-window-replacement',
    'residential-window-glass-replacement',
    'commercial-window-glass-replacement',
    'residential-commercial-glass-repair',
    'residential-storefront-glass-repair',
    'commercial-storefront-glass-repair',
    'residential-emergency-glass-repair',
    'commercial-emergency-glass-repair',
    'residential-broken-window-repair',
    'window-and-door-hardware-repairs',
    'commercial-broken-window-repair',
    'residential-foggy-window-repair',
    'residential-shower-glass-repair',
    'residential-sliding-door-repair',
    'commercial-foggy-window-repair',
    'commercial-shower-glass-repair',
    'commercial-sliding-door-repair',
    'double-pane-window-replacement',
    'residential-patio-door-repair',
    'commercial-patio-door-repair',
    'residential-custom-mirror',
    'residential-window-repair',
    'commercial-custom-mirror',
    'commercial-window-repair',
    'residential-door-repairs',
    'window-glass-replacement',
    'commercial-door-repairs',
    'commercial-glass-repair',
    'storefront-glass-repair',
    'emergency-glass-repair',
    'broken-window-repair',
    'foggy-window-repair',
    'shower-glass-repair',
    'sliding-door-repair',
    'patio-door-repair',
    'custom-mirror',
    'window-repair',
    'door-repairs',
  ];
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
