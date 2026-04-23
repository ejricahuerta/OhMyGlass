// Dynamic slug page from pages.json; layout aligned with Services / Contact (page-hero, svc-category, section-plain)
const { useEffect: useEffectC, useState: useStateC } = React;

var LOCATION_SUFFIXES = ['newmarket', 'etobicoke', 'markham', 'north-york', 'richmond-hill', 'scarborough', 'toronto', 'vaughan', 'mississauga', 'brampton'];
/** Longest first — must match next-app/src/lib/service-location-matrix.ts */
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
var FLAGSHIP_CROSS_LINK_BASES = ['emergency-glass-repair', 'storefront-glass-repair', 'window-glass-replacement'];
var LOCATION_DISPLAY_NAMES = {
  newmarket: 'Newmarket',
  etobicoke: 'Etobicoke',
  markham: 'Markham',
  'north-york': 'North York',
  'richmond-hill': 'Richmond Hill',
  scarborough: 'Scarborough',
  toronto: 'Toronto',
  vaughan: 'Vaughan',
  mississauga: 'Mississauga',
  brampton: 'Brampton',
};
var SERVICE_LABELS = {
  'broken-window-repair': 'Broken window repair',
  'commercial-broken-window-repair': 'Commercial broken window repair',
  'commercial-custom-mirror': 'Commercial custom mirror installation',
  'commercial-door-repairs': 'Commercial door repairs',
  'commercial-double-pane-window-replacement': 'Commercial double-pane window replacement',
  'commercial-emergency-glass-repair': 'Commercial emergency glass repair',
  'commercial-foggy-window-repair': 'Commercial foggy window repair',
  'commercial-glass-repair': 'Commercial glass repair',
  'commercial-patio-door-repair': 'Commercial patio door repair',
  'commercial-shower-glass-repair': 'Commercial shower glass repair',
  'commercial-sliding-door-repair': 'Commercial sliding door repair',
  'commercial-storefront-glass-repair': 'Commercial storefront glass repair',
  'commercial-window-and-door-hardware-repairs': 'Commercial window & door hardware repairs',
  'commercial-window-glass-replacement': 'Commercial window glass replacement',
  'commercial-window-repair': 'Commercial window repair',
  'custom-mirror': 'Custom mirror installation',
  'door-repairs': 'Door repairs',
  'double-pane-window-replacement': 'Double-pane window replacement',
  'emergency-glass-repair': 'Emergency glass repair',
  'foggy-window-repair': 'Foggy window repair',
  'patio-door-repair': 'Patio door repair',
  'residential-broken-window-repair': 'Residential broken window repair',
  'residential-commercial-glass-repair': 'Residential commercial glass repair',
  'residential-custom-mirror': 'Residential custom mirror installation',
  'residential-door-repairs': 'Residential door repairs',
  'residential-double-pane-window-replacement': 'Residential double-pane window replacement',
  'residential-emergency-glass-repair': 'Residential emergency glass repair',
  'residential-foggy-window-repair': 'Residential foggy window repair',
  'residential-patio-door-repair': 'Residential patio door repair',
  'residential-shower-glass-repair': 'Residential shower glass repair',
  'residential-sliding-door-repair': 'Residential sliding door repair',
  'residential-storefront-glass-repair': 'Residential storefront glass repair',
  'residential-window-and-door-hardware-repairs': 'Residential window & door hardware repairs',
  'residential-window-glass-replacement': 'Residential window glass replacement',
  'residential-window-repair': 'Residential window repair',
  'shower-glass-repair': 'Shower glass repair',
  'sliding-door-repair': 'Sliding door repair',
  'storefront-glass-repair': 'Storefront glass repair',
  'window-and-door-hardware-repairs': 'Window & door hardware repairs',
  'window-glass-replacement': 'Window glass replacement',
  'window-repair': 'Window repair',
};

var LOCATION_SUFFIXES_LONGEST_FIRST = LOCATION_SUFFIXES.slice().sort(function (a, b) {
  return b.length - a.length;
});
/** Short pill label: SERVICE_LABELS title, plus city when slug ends with a known location. */
function relatedTierLinkLabel(slug) {
  for (var i = 0; i < LOCATION_SUFFIXES_LONGEST_FIRST.length; i++) {
    var loc = LOCATION_SUFFIXES_LONGEST_FIRST[i];
    var suf = '-' + loc;
    if (slug.length > suf.length && slug.slice(-suf.length) === suf) {
      var base = slug.slice(0, -suf.length);
      var name = SERVICE_LABELS[base];
      if (name) return name + ' · ' + (LOCATION_DISPLAY_NAMES[loc] || loc);
    }
  }
  if (SERVICE_LABELS[slug]) return SERVICE_LABELS[slug];
  return String(slug || '').replace(/-/g, ' ');
}

var RESOURCE_SERVICE_LINKS = {
  'how-to-tell-if-window-seal-is-broken': { path: '/foggy-window-repair', label: 'Foggy window repair' },
  'foggy-double-pane-windows-repair-vs-replace': { path: '/foggy-window-repair', label: 'Foggy window repair' },
  'emergency-glass-repair-toronto-what-to-expect': { path: '/emergency-glass-repair', label: 'Emergency glass repair' },
  'window-glass-replacement-cost-gta': { path: '/window-glass-replacement', label: 'Window glass replacement' },
  'storefront-glass-repair-toronto-business-owners': { path: '/storefront-glass-repair', label: 'Storefront glass repair' },
  'glass-repair-vs-replacement': { path: '/window-glass-replacement', label: 'Window glass replacement' },
};

var RELATED_PAGE_LINKS = {
  'shower-glass-repair': [
    { href: '/patio-door-repair', label: 'Patio Door Repair' },
    { href: '/door-repairs', label: 'Door Repairs' },
    { href: '/broken-window-repair', label: 'Broken Window Repair' },
  ],
  'patio-door-repair': [{ href: '/sliding-door-repair', label: 'Sliding Door Repair' }],
  'sliding-door-repair': [{ href: '/patio-door-repair', label: 'Patio Door Repair' }],
  'door-repairs': [
    { href: '/shower-glass-repair', label: 'Shower Glass Repair' },
    { href: '/patio-door-repair', label: 'Patio Door Repair' },
    { href: '/sliding-door-repair', label: 'Sliding Door Repair' },
  ],
  'residential-window-repair': [{ href: '/window-repair-cost', label: 'Window Repair Cost Guide' }],
  'foggy-window-repair': [{ href: '/window-repair-cost', label: 'Window Repair Cost Guide' }],
  'broken-window-repair': [{ href: '/window-repair-cost', label: 'Window Repair Cost Guide' }],
  'how-to-tell-if-window-seal-is-broken': [
    { href: '/foggy-window-repair', label: 'Foggy window repair' },
    { href: '/residential-window-repair', label: 'Residential window repair' },
    { href: '/window-repair-cost', label: 'Window repair cost' },
  ],
  'window-glass-replacement-cost-gta': [
    { href: '/broken-window-repair', label: 'Broken window repair' },
    { href: '/foggy-window-repair', label: 'Foggy window repair' },
    { href: '/emergency-glass-repair', label: 'Emergency glass repair' },
  ],
};

function filterMatrixBasesForTier(bases, filter) {
  if (!bases || !bases.length || filter === 'all') return bases || [];
  if (filter === 'residential') return bases.filter(function (b) { return b.indexOf('residential-') === 0; });
  if (filter === 'commercial') return bases.filter(function (b) { return b.indexOf('commercial-') === 0; });
  return bases;
}

function filterRelatedForTier(links, filter) {
  if (!links || !links.length || filter === 'all') return links || [];
  return links.filter(function (L) {
    var h = L.href || '';
    if (filter === 'residential') return h.indexOf('/commercial-') === -1;
    if (filter === 'commercial') return h.indexOf('/residential-') === -1;
    return true;
  });
}

function relatedLinksHaveTierMix(links) {
  var hasR = false;
  var hasC = false;
  (links || []).forEach(function (L) {
    var h = L.href || '';
    if (h.indexOf('/residential-') !== -1) hasR = true;
    if (h.indexOf('/commercial-') !== -1) hasC = true;
  });
  return hasR && hasC;
}

function TierViewToggle(props) {
  var filter = props.value;
  var onChange = props.onChange;
  var hint = props.hint;
  return (
    <div className="tier-view-toggle" role="group" aria-label="Filter links by property type">
      <div className="tier-view-toggle__row">
        <span className="tier-view-toggle__label">Show</span>
        <button
          type="button"
          className={'tier-view-toggle__btn' + (filter === 'all' ? ' tier-view-toggle__btn--active' : '')}
          aria-pressed={filter === 'all'}
          onClick={function () {
            onChange('all');
          }}
        >
          All
        </button>
        <button
          type="button"
          className={'tier-view-toggle__btn' + (filter === 'residential' ? ' tier-view-toggle__btn--active' : '')}
          aria-pressed={filter === 'residential'}
          onClick={function () {
            onChange('residential');
          }}
        >
          Residential
        </button>
        <button
          type="button"
          className={'tier-view-toggle__btn' + (filter === 'commercial' ? ' tier-view-toggle__btn--active' : '')}
          aria-pressed={filter === 'commercial'}
          onClick={function () {
            onChange('commercial');
          }}
        >
          Commercial
        </button>
      </div>
      {hint ? <p className="tier-view-toggle__hint">{hint}</p> : null}
    </div>
  );
}

function mergeRelatedLinkLists(manual, auto) {
  var seen = {};
  var out = [];
  function norm(href) {
    var h = String(href || '').trim();
    if (!h || h.charAt(0) !== '/') return null;
    return h;
  }
  function push(list) {
    (list || []).forEach(function (L) {
      var h = norm(L.href);
      if (!h || seen[h]) return;
      seen[h] = true;
      var slug = h.slice(1);
      out.push({ href: h, label: relatedTierLinkLabel(slug) });
    });
  }
  push(manual);
  push(auto);
  return out;
}

/** Picks residential / commercial / neutral tier siblings using slug naming; only adds hrefs that exist in pages.json. */
function getAutoTierRelatedLinks(canonicalSlug, locationPageInfo) {
  var links = [];
  var seen = {};
  function slugExists(slug) {
    return typeof window.OMG_getPageBySlug === 'function' && !!window.OMG_getPageBySlug(slug);
  }
  function add(slug) {
    if (!slugExists(slug)) return;
    var href = '/' + slug;
    if (seen[href]) return;
    seen[href] = true;
    links.push({ href: href, label: relatedTierLinkLabel(slug) });
  }

  if (locationPageInfo) {
    var base = locationPageInfo.serviceBase;
    var loc = locationPageInfo.locationSuffix;
    add(base);

    if (base === 'window-repair') {
      add('residential-window-repair-' + loc);
      add('commercial-window-repair-' + loc);
    } else if (base === 'residential-window-repair') {
      add('window-repair-' + loc);
      add('commercial-window-repair-' + loc);
    } else if (base === 'commercial-window-repair') {
      add('window-repair-' + loc);
      add('residential-window-repair-' + loc);
    } else if (base === 'commercial-glass-repair') {
      add('residential-commercial-glass-repair-' + loc);
    } else if (base === 'residential-commercial-glass-repair') {
      add('commercial-glass-repair-' + loc);
    } else if (
      base.indexOf('residential-') === 0 &&
      base !== 'residential-window-repair' &&
      base !== 'residential-commercial-glass-repair'
    ) {
      var coreR = base.slice('residential-'.length);
      add(coreR + '-' + loc);
      add('commercial-' + coreR + '-' + loc);
    } else if (base.indexOf('commercial-') === 0 && base !== 'commercial-window-repair') {
      var coreC = base.slice('commercial-'.length);
      add(coreC + '-' + loc);
      add('residential-' + coreC + '-' + loc);
    } else {
      add('residential-' + base + '-' + loc);
      add('commercial-' + base + '-' + loc);
    }
    return links;
  }

  if (SERVICE_LOCATION_BASES.indexOf(canonicalSlug) === -1) return links;

  var hub = canonicalSlug;
  function addHub(slug) {
    if (slug === hub) return;
    add(slug);
  }
  if (hub === 'window-repair') {
    addHub('residential-window-repair');
    addHub('commercial-window-repair');
  } else if (hub === 'residential-window-repair') {
    addHub('window-repair');
    addHub('commercial-window-repair');
  } else if (hub === 'commercial-window-repair') {
    addHub('window-repair');
    addHub('residential-window-repair');
  } else if (hub === 'commercial-glass-repair') {
    addHub('residential-commercial-glass-repair');
  } else if (hub === 'residential-commercial-glass-repair') {
    addHub('commercial-glass-repair');
  } else if (
    hub.indexOf('residential-') === 0 &&
    hub !== 'residential-window-repair' &&
    hub !== 'residential-commercial-glass-repair'
  ) {
    var hr = hub.slice('residential-'.length);
    addHub(hr);
    addHub('commercial-' + hr);
  } else if (hub.indexOf('commercial-') === 0 && hub !== 'commercial-window-repair') {
    var hc = hub.slice('commercial-'.length);
    addHub(hc);
    addHub('residential-' + hc);
  } else {
    addHub('residential-' + hub);
    addHub('commercial-' + hub);
  }
  return links;
}

function cleanDisplayTitle(title) {
  var t = String(title || '')
    .replace(/\s*-\s*OhMyGlass\.ca$/i, '')
    .replace(/\s*–\s*OhMyGlass\.ca$/i, '')
    .replace(/\s*-\s*OhMyGlass$/i, '')
    .replace(/\s*–\s*OhMyGlass$/i, '')
    .replace(/\s*\|\s*OhMyGlass$/i, '')
    .trim();
  return t.replace(/\s*\|\s*.+$/, '').trim();
}

function trimMeta(s, maxLen) {
  var t = String(s || '').trim();
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen - 3) + '...';
}

/** Prefer sentence or word boundary over hard slice (avoids “respo…”). */
function trimReadable(s, maxLen) {
  var t = String(s || '').trim();
  if (t.length <= maxLen) return t;
  var budget = maxLen - 1;
  var chunk = t.slice(0, budget);
  var dot = chunk.lastIndexOf('. ');
  if (dot >= Math.floor(maxLen * 0.45)) return chunk.slice(0, dot + 1) + '\u2026';
  var sp = chunk.lastIndexOf(' ');
  if (sp >= Math.floor(maxLen * 0.5)) return chunk.slice(0, sp) + '\u2026';
  return trimMeta(t, maxLen);
}

/** When the first page paragraph is long, keep the hero line short; full copy stays in the body. */
var HERO_LEDE_FROM_PARA_MAX = 260;
var HERO_LEDE_META_MAX = 320;

function contentPageHeroSub(page, paragraphs, isLocationPage, cityName) {
  var meta = page.seo && String(page.seo.meta_description || '').trim();
  if (meta) {
    if (meta.length <= HERO_LEDE_META_MAX) return meta;
    return trimReadable(meta, HERO_LEDE_META_MAX);
  }
  var p0 = paragraphs[0] ? String(paragraphs[0]).trim() : '';
  if (!p0) {
    if (isLocationPage && cityName) {
      return '24/7 window and door glass repair and replacement in ' + cityName + '. Full overview on this page.';
    }
    return 'Expert window and door glass repair and replacement across Toronto and the GTA.';
  }
  if (p0.length <= HERO_LEDE_FROM_PARA_MAX) return p0;
  if (isLocationPage && cityName) {
    return (
      'Emergency board-up, repairs, and replacement for ' +
      cityName +
      ' homes and businesses. Read the full overview below.'
    );
  }
  return 'Expert window and door glass repair and replacement across the GTA. Read the full overview below.';
}

function ContentLink({ href, className, children, navigate }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function ContentPageHero(props) {
  return <PageHeroWithQuoteForm phonesCtaMain="content-hero" phonesCtaAlt="content-hero-alt" {...props} />;
}

/** Ordinal kicker for CMS-driven content bands after overview (DETAIL · 01, …). */
function contentEmPageBandNum(n) {
  return 'DETAIL · ' + String(n).padStart(2, '0');
}

/** Same two-column band header as emergency.jsx (`em-section-head`). `title` may be a string or React node. */
function ContentEmSectionHead({ num, title, sub, headClassName, headStyle, hideSub }) {
  var subText =
    hideSub || sub == null || String(sub).trim() === '' ? null : String(sub).trim();
  return (
    <div
      className={
        'em-section-head' +
        (hideSub ? ' em-section-head--no-sub' : '') +
        (headClassName ? ' ' + headClassName : '')
      }
      style={headStyle || undefined}
    >
      <div>
        <div className="num">{num}</div>
        <h2>{title}</h2>
      </div>
      {!hideSub ? <div className="sub">{subText || '\u00a0'}</div> : null}
    </div>
  );
}

/**
 * Serif accent like emergency.jsx: prefers keywords (response, while, handle, answers),
 * otherwise last word (e.g. "Quick answers.").
 */
function contentEmHeadingTitle(heading) {
  var t = String(heading || '').trim();
  if (!t) return t;
  var accentRe = /\b(response|while|handle|answers)(\.|,|:)?/i;
  var m = accentRe.exec(t);
  if (m) {
    var before = t.slice(0, m.index);
    var mid = m[0];
    var after = t.slice(m.index + mid.length);
    return (
      <>
        {before}
        <span className="serif">{mid}</span>
        {after}
      </>
    );
  }
  var parts = t.split(/\s+/);
  if (parts.length < 2) return t;
  var last = parts.pop();
  return (
    <>
      {parts.join(' ')} <span className="serif">{last}</span>
    </>
  );
}

function isCityHubListSection(section) {
  return /\bby city\b/i.test(section.heading || '');
}

function parseListItemToTitleDesc(item) {
  var s = String(item || '').trim();
  if (!s) return { title: '', desc: '' };
  var ix = s.indexOf(':');
  if (ix > 0 && ix < 100 && /\s/.test(s.charAt(ix + 1) || '')) {
    return { title: s.slice(0, ix).trim(), desc: s.slice(ix + 1).trim() };
  }
  ix = s.indexOf(' \u2014 ');
  if (ix === -1) ix = s.indexOf(' – ');
  if (ix === -1) ix = s.indexOf(' - ');
  if (ix > 0) {
    return { title: s.slice(0, ix).trim(), desc: s.slice(ix + 3).trim() };
  }
  var dot = s.indexOf('. ');
  if (dot > 8 && dot < 120) {
    return { title: s.slice(0, dot + 1).trim(), desc: s.slice(dot + 2).trim() };
  }
  return { title: s, desc: '' };
}

/** Parses `City — /slug` rows from typed tier hub pages. */
function parseCityHubRow(item) {
  var parsed = parseListItemToTitleDesc(item);
  var d = (parsed.desc || '').trim();
  if (!parsed.title || !d || d.charAt(0) !== '/') return null;
  return { city: parsed.title, href: d };
}

/** Derives FAQ question (includes ?) and answer body from one list string. */
function parseFaqListItem(item) {
  var s = String(item || '').trim();
  var qix = s.indexOf('?');
  if (qix >= 0) {
    return { q: s.slice(0, qix + 1).trim(), a: s.slice(qix + 1).trim() };
  }
  return { q: s, a: '' };
}

function contentSectionListKind(section) {
  var h = (section.heading || '').toLowerCase();
  var list = section.list || [];
  var n = list.length;
  if (!n) return 'none';
  var withQ = list.filter(function (item) {
    return String(item).indexOf('?') >= 0;
  }).length;
  if (/faq|frequently asked|common questions|quick answers|questions and answers/i.test(h) || (n >= 2 && withQ >= Math.ceil(n * 0.6)))
    return 'faq';
  if (
    /checklist|what to do|safety|while you wait|before (we|our)|steps (to|you)|until (we|our)/i.test(h) ||
    section.list_style === 'checklist'
  )
    return 'checklist';
  // Category / problem grids: not the horizontal process timeline (avoid /how/ matching inside "shower", etc.)
  if (
    /\btypes\b|\bproblems?\b|\bsymptoms\b|\bcauses\b|\bkinds of\b|\bcategories\b|\bvarieties\b|what we handle|signs of|common .*(issues?|problems?|failures?)/i.test(
      h
    )
  )
    return 'types';
  // Real workflow / sequence copy only (word boundaries so "shower" does not match "how")
  var timelineHeading =
    /\bhow\b|\bprocess\b|\bsteps?\b|\bworks\b|\bresponse\b|what to expect|\bour service\b|\bour repair\b|repair process|step[- ]by[- ]step/i.test(h);
  if (n >= 3 && n <= 7 && timelineHeading) return 'timeline';
  if (section.list_style === 'timeline') return 'timeline';
  return 'types';
}

/** Renders list bodies to match emergency.jsx: em-types, process-timeline, faq-list, or checklist. */
function ContentSectionListBody({ section, navigate }) {
  var list = section.list || [];
  var kind = contentSectionListKind(section);
  if (kind === 'faq') {
    return (
      <div className="faq-list">
        {list.map(function (item, i) {
          var faq = parseFaqListItem(item);
          return (
            <details className="faq-item" key={i}>
              <summary>{faq.q}</summary>
              {faq.a ? <p>{faq.a}</p> : null}
            </details>
          );
        })}
      </div>
    );
  }
  if (kind === 'checklist') {
    return (
      <div className="checklist">
        {list.map(function (item, i) {
          var parsed = parseListItemToTitleDesc(item);
          var stepNum = String(i + 1).padStart(2, '0');
          return (
            <div className="item" key={i}>
              <div className="n">STEP · {stepNum}</div>
              <div className="c">
                {parsed.desc ? (
                  <>
                    <strong>{parsed.title}</strong>
                    <p>{parsed.desc}</p>
                  </>
                ) : (
                  <p>{item}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  if (kind === 'timeline') {
    var cols = list.length;
    return (
      <div className="process-timeline" style={{ '--timeline-cols': cols }}>
        {list.map(function (item, i) {
          var parsed = parseListItemToTitleDesc(item);
          var num = String(i + 1).padStart(2, '0');
          return (
            <div className="step" key={i} style={{ paddingLeft: i === 0 ? 0 : 24 }}>
              <div className="n">{num}</div>
              <div className="t">{parsed.title}</div>
              {parsed.desc ? <div className="d">{parsed.desc}</div> : null}
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="em-types">
      {list.map(function (item, i) {
        var parsed = parseListItemToTitleDesc(item);
        var num = String(i + 1).padStart(2, '0');
        return (
          <div className="em-type" key={i}>
            <div className="ic">{num}</div>
            <div>
              <strong>{parsed.title}</strong>
              {parsed.desc ? <p>{parsed.desc}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function computeLocationPageInfo(slug) {
  for (var i = 0; i < SERVICE_LOCATION_BASES.length; i++) {
    var base = SERVICE_LOCATION_BASES[i];
    var prefix = base + '-';
    if (slug.indexOf(prefix) !== 0) continue;
    var locationSuffix = slug.slice(prefix.length);
    if (LOCATION_SUFFIXES.indexOf(locationSuffix) === -1) continue;
    var otherLinks = [];
    for (var j = 0; j < FLAGSHIP_CROSS_LINK_BASES.length; j++) {
      var fb = FLAGSHIP_CROSS_LINK_BASES[j];
      if (fb === base) continue;
      otherLinks.push({ slug: fb + '-' + locationSuffix, label: SERVICE_LABELS[fb] });
    }
    return {
      cityName: LOCATION_DISPLAY_NAMES[locationSuffix] || locationSuffix,
      otherLinks: otherLinks,
      serviceBase: base,
      locationSuffix: locationSuffix,
    };
  }
  return null;
}

function ContentPage({ slug, navigate }) {
  var tierFilterState = useStateC('all');
  var tierFilter = tierFilterState[0];
  var setTierFilter = tierFilterState[1];

  const page = typeof window.OMG_getPageBySlug === 'function' ? window.OMG_getPageBySlug(slug) : null;
  const contact = window.OMG_DATA.contact;
  const cities = window.OMG_DATA.serviceAreaCitiesList || [];

  useEffectC(function () {
    setTierFilter('all');
  }, [slug]);

  useEffectC(() => {
    if (!page) return;
    var rawTitle = page.title || '';
    document.title = rawTitle.length > 60 ? rawTitle.slice(0, 57) + '...' : rawTitle;
    var meta = page.seo && page.seo.meta_description ? page.seo.meta_description : page.title;
    var m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', trimMeta(meta, 160));
  }, [slug, page]);

  if (!page) return null;

  const canonicalSlug = window.OMG_urlToSlug(page.url);
  const isServiceAreasPage = canonicalSlug === 'service-areas';
  const isResource = page.type === 'resource';
  const hasSections = Array.isArray(page.sections) && page.sections.length > 0;
  const serviceAreaLocations = page.service_area_locations || [];

  const paragraphs = isServiceAreasPage
    ? []
    : page.pagecontent
      ? page.pagecontent.split(/\n\n+/).filter(function (p) {
          return p.trim();
        })
      : [];

  const locationPageInfo = computeLocationPageInfo(canonicalSlug);
  const isLocationPage = locationPageInfo !== null;
  var moreMatrixBasesInCity = [];
  if (locationPageInfo && locationPageInfo.serviceBase) {
    for (var mi = 0; mi < SERVICE_LOCATION_BASES.length; mi++) {
      var mb = SERVICE_LOCATION_BASES[mi];
      if (mb === locationPageInfo.serviceBase) continue;
      if (FLAGSHIP_CROSS_LINK_BASES.indexOf(mb) !== -1) continue;
      moreMatrixBasesInCity.push(mb);
    }
  }

  const isGenericServiceWithAreas = SERVICE_LOCATION_BASES.indexOf(canonicalSlug) !== -1;
  const genericServiceAreaLinks = isGenericServiceWithAreas
    ? LOCATION_SUFFIXES.map(function (suffix) {
        return { name: LOCATION_DISPLAY_NAMES[suffix] || suffix, slug: canonicalSlug + '-' + suffix };
      })
    : [];

  const hasExplicitAreasSection = (page.sections || []).some(function (section) {
    return /areas?\s+we\s+serve|service\s+areas?/i.test(section.heading || '');
  });
  var serviceKeyForAreaSection =
    locationPageInfo && locationPageInfo.serviceBase ? locationPageInfo.serviceBase : canonicalSlug;
  const shouldShowServiceAreaAboveForm =
    page.type === 'service' &&
    SERVICE_LOCATION_BASES.indexOf(serviceKeyForAreaSection) !== -1 &&
    !isGenericServiceWithAreas &&
    !hasExplicitAreasSection;
  const showAsideColumn = !isResource && shouldShowServiceAreaAboveForm;

  var manualRelated = RELATED_PAGE_LINKS[canonicalSlug] || [];
  var autoTierRelated =
    page.type === 'service' && !isServiceAreasPage
      ? getAutoTierRelatedLinks(canonicalSlug, locationPageInfo)
      : [];
  var relatedPageLinks = mergeRelatedLinkLists(manualRelated, autoTierRelated);
  var filteredMatrixPills = filterMatrixBasesForTier(moreMatrixBasesInCity, tierFilter);
  var filteredRelated = filterRelatedForTier(relatedPageLinks, tierFilter);
  var showMatrixTierToggle = isLocationPage && moreMatrixBasesInCity.length > 0;
  var showRelatedOnlyTierToggle =
    !showMatrixTierToggle && relatedLinksHaveTierMix(relatedPageLinks) && relatedPageLinks.length > 1;
  const resourceSvc = RESOURCE_SERVICE_LINKS[canonicalSlug];
  const serviceAreasIntro = 'We provide expert window and door glass repair and replacement across the Greater Toronto Area.';
  const breadcrumbTail = cleanDisplayTitle(page.title);

  const heroSubDefault = contentPageHeroSub(page, paragraphs, isLocationPage, locationPageInfo ? locationPageInfo.cityName : '');

  /** When true, `BrokenGlassSafetyChecklistSection` is shown after the hero; section ordinals skip one index so DETAIL labels stay aligned with visible bands. */
  const postHeroSafetyChecklist = page.type === 'service' && !isResource && !isServiceAreasPage;
  const sectionNumOffset = postHeroSafetyChecklist ? 1 : 0;

  if (isServiceAreasPage) {
    return (
      <>
        <div className="crumb">
          <div className="inner">
            <ContentLink href="/" className="content-nav-link" navigate={navigate}>
              Home
            </ContentLink>
            <span>/</span>
            <span className="current">Service areas</span>
          </div>
        </div>
        <ContentPageHero
          eye="Coverage · Service areas"
          displayTitle="Service areas · GTA-wide dispatch"
          sub={serviceAreasIntro + ' Select your area for local emergency window and door glass repair, glass replacement, and more.'}
          navigate={navigate}
          submitLocation={'content-' + canonicalSlug}
        />

        <section className="section-plain">
          <Reveal variant="section" className="inner">
            <ContentEmSectionHead
              num="AREAS · BROWSE"
              title="Browse by area"
              sub="We serve the GTA. Choose your area for local window and door glass repair and replacement."
            />
            {serviceAreaLocations.length > 0 ? (
              <div className="content-em-band">
              <nav className="svc-list content-area-link-grid" aria-label="Service areas">
                {serviceAreaLocations.map(function (loc) {
                  var h = '/' + loc.slug;
                  return (
                    <ContentLink key={loc.slug} href={h} className="svc-item" navigate={navigate}>
                      <span className="badge b-ink">AREA</span>
                      <h3>{loc.name}</h3>
                      <p>Local window and door glass repair, emergency response, and replacement.</p>
                      <div className="arrow">
                        View area <Icon.Arrow size={12} />
                      </div>
                    </ContentLink>
                  );
                })}
              </nav>
              </div>
            ) : (
              <div className="content-area-chip-grid" role="list">
                {cities.map(function (city) {
                  return (
                    <span key={city} className="content-area-chip content-area-chip--static" role="listitem">
                      {city}
                    </span>
                  );
                })}
              </div>
            )}
          </Reveal>
        </section>

        <section className="section-plain">
          <Reveal variant="section" className="inner">
            <ContentEmSectionHead
              num="LOCATION · GTA MAP"
              title="Our location and the GTA"
              sub="OhMyGlass is based in North York and serves the Greater Toronto Area."
            />
            <div className="content-map-card">
              <iframe title="OhMyGlass location and Greater Toronto Area" src={contact.googleMapsEmbedGtaSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <div className="content-map-card-foot">
                <a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" className="content-nav-link content-map-link">
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section-plain">
          <Reveal variant="section" className="inner">
            <ContentEmSectionHead
              num="CONTACT · 24/7 HELP"
              title="Need window or door glass repair in your area?"
              sub="We're available 24/7 including nights, weekends, and holidays."
            />
            <div className="content-cta-row">
              <a href={contact.phoneHref} className="btn btn-red" data-cta-location="content-sa-cta">
                <Icon.Phone size={16} /> {contact.phone}
              </a>
              <a href={contact.afterHoursPhoneHref} className="btn btn-outline" data-cta-location="content-sa-cta-alt">
                After hours: {contact.afterHoursPhone}
              </a>
            </div>
          </Reveal>
        </section>

        <section className="section-plain">
          <Reveal variant="section" className="inner">
            <ContentEmSectionHead
              num="LOCAL · POPULAR PAGES"
              title="Popular Toronto area pages"
              sub="Quick links to our highest-priority local service pages."
            />
            <div className="content-em-band">
            <div className="svc-list content-area-link-grid">
              <ContentLink href="/commercial-glass-repair-toronto" className="svc-item" navigate={navigate}>
                <span className="badge b-ink">COMMERCIAL</span>
                <h3>Commercial glass repair Toronto</h3>
                <p>Offices, retail, and light industrial glass repair and replacement.</p>
                <div className="arrow">
                  Learn more <Icon.Arrow size={12} />
                </div>
              </ContentLink>
              <ContentLink href="/window-repair-toronto" className="svc-item" navigate={navigate}>
                <span className="badge b-ink">TORONTO</span>
                <h3>Residential window repair Toronto</h3>
                <p>Homes and condos: repair-first window and glass service.</p>
                <div className="arrow">
                  Learn more <Icon.Arrow size={12} />
                </div>
              </ContentLink>
              <ContentLink href="/window-repair-north-york" className="svc-item" navigate={navigate}>
                <span className="badge b-ink">NORTH YORK</span>
                <h3>Window Repair North York</h3>
                <p>Fast repair near our North York HQ.</p>
                <div className="arrow">
                  Learn more <Icon.Arrow size={12} />
                </div>
              </ContentLink>
              <ContentLink href="/window-glass-replacement-toronto" className="svc-item" navigate={navigate}>
                <span className="badge b-ink">GLASS</span>
                <h3>Glass Replacement Toronto</h3>
                <p>Expert window glass replacement with clear pricing.</p>
                <div className="arrow">
                  Learn more <Icon.Arrow size={12} />
                </div>
              </ContentLink>
            </div>
            </div>
          </Reveal>
        </section>
      </>
    );
  }

  var eyeLabel =
    isResource ? 'Guide · Article' : page.type === 'service' ? 'Service · OhMyGlass' : 'OhMyGlass · Info';

  return (
    <>
      <div className="crumb">
        <div className="inner content-page-inner-wide">
          <ContentLink href="/" className="content-nav-link" navigate={navigate}>
            Home
          </ContentLink>
          <span>/</span>
          {isResource ? (
            <>
              <ContentLink href="/resources" className="content-nav-link" navigate={navigate}>
                Resources
              </ContentLink>
              <span>/</span>
            </>
          ) : isLocationPage ? (
            <>
              <ContentLink href="/services" className="content-nav-link" navigate={navigate}>
                Services
              </ContentLink>
              <span>/</span>
              <ContentLink href="/service-areas" className="content-nav-link" navigate={navigate}>
                Service areas
              </ContentLink>
              <span>/</span>
            </>
          ) : page.type === 'service' ? (
            <>
              <ContentLink href="/services" className="content-nav-link" navigate={navigate}>
                Services
              </ContentLink>
              <span>/</span>
            </>
          ) : null}
          <span className="current">{breadcrumbTail}</span>
        </div>
      </div>

      <ContentPageHero
        eye={eyeLabel}
        displayTitle={breadcrumbTail}
        sub={heroSubDefault}
        navigate={navigate}
        submitLocation={'content-' + canonicalSlug}
      />

      {postHeroSafetyChecklist ? <BrokenGlassSafetyChecklistSection /> : null}

      <section className="section-plain content-em-landing-section">
        <Reveal variant="section" className="inner content-page-inner-wide">
          {isResource && (
            <div className="content-back-row">
              <ContentLink href="/resources" className="btn btn-bone-out" navigate={navigate}>
                <span className="content-back-arrow" aria-hidden>
                  <Icon.Arrow size={14} />
                </span>{' '}
                All resources
              </ContentLink>
            </div>
          )}
          {!hasSections && (
            <div className="content-em-prose">
              {paragraphs.map(function (p, i) {
                return <p key={i}>{p}</p>;
              })}
            </div>
          )}
          {hasSections && paragraphs.length > 0 && (
            <>
              <ContentEmSectionHead
                num={isResource ? 'GUIDE · OVERVIEW' : 'SERVICE · OVERVIEW'}
                title={contentEmHeadingTitle(isResource ? 'About this guide' : 'Overview')}
                sub={
                  isResource
                    ? 'How this guide is organized, and what to do next when you are ready for a quote or a repair.'
                    : undefined
                }
              />
              <div className="content-em-prose">
                {paragraphs.map(function (p, i) {
                  return <p key={'p' + i}>{p}</p>;
                })}
              </div>
            </>
          )}
        </Reveal>
      </section>

      {hasSections &&
        page.sections.map(function (section, si) {
          var sn = si + 1 + (paragraphs.length > 0 ? 1 : 0) + sectionNumOffset;
          var titleText = section.heading ? String(section.heading).trim() : 'Details';
          var listKind = contentSectionListKind(section);
          var isFaqSection = listKind === 'faq';
          var wash = listKind === 'faq' || listKind === 'timeline';
          var sectionClass =
            'section-plain content-em-landing-section' +
            (wash ? ' content-em-landing-section--wash' : '') +
            (isFaqSection ? ' em-faq-section' : '');
          var headNum = isFaqSection ? 'FAQ · QUICK ANSWERS' : contentEmPageBandNum(sn);
          var isCityHubHeading = /\bby city\b/i.test(titleText);
          var headTitle = isCityHubHeading ? titleText : contentEmHeadingTitle(titleText);
          return (
            <section className={sectionClass} key={'emsec' + si}>
              <Reveal variant="section" className="inner content-page-inner-wide">
                <ContentEmSectionHead
                  num={headNum}
                  title={headTitle}
                  headClassName={isFaqSection ? 'em-section-head--faq' : undefined}
                />
                <div className="content-em-body">
                  {section.content ? (
                    <div
                      className={
                        'content-em-prose' +
                        (section.list && section.list.length > 0 ? ' content-em-prose--before-checklist' : '')
                      }
                    >
                      <p>{section.content}</p>
                    </div>
                  ) : null}
                  {section.list && section.list.length > 0 ? (
                    <ContentSectionListBody section={section} navigate={navigate} />
                  ) : null}
                </div>
              </Reveal>
            </section>
          );
        })}

      {genericServiceAreaLinks.length > 0 && (
        <section className="section-plain content-em-landing-section">
          <Reveal variant="section" className="inner content-page-inner-wide">
            <ContentEmSectionHead
              num="AREAS · GTA"
              title={contentEmHeadingTitle('Areas we serve')}
              sub="This service is available across the GTA. Pick your city for a local landing page and dispatch context."
            />
            <div className="content-em-band">
              <div className="svc-list content-area-link-grid">
              {genericServiceAreaLinks.map(function (link) {
                return (
                  <ContentLink key={link.slug} href={'/' + link.slug} className="svc-item" navigate={navigate}>
                    <span className="badge b-ink">AREA</span>
                    <h3>{link.name}</h3>
                    <p>Local service and dispatch.</p>
                    <div className="arrow">
                      Learn more <Icon.Arrow size={12} />
                    </div>
                  </ContentLink>
                );
              })}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {isLocationPage && locationPageInfo && (
        <section className="section-plain content-em-landing-section">
          <Reveal variant="section" className="inner content-page-inner-wide">
            <ContentEmSectionHead
              num="LOCAL · PRIORITY"
              headClassName="em-section-head--stack"
              title={'Priority services in ' + locationPageInfo.cityName}
              sub="Same crew and trucks—other high-demand specialties in your neighbourhood."
            />
            <div className="content-em-band">
              <nav className="svc-list content-area-link-grid" aria-label={'Priority services in ' + locationPageInfo.cityName}>
                {locationPageInfo.otherLinks.map(function (link) {
                  return (
                    <ContentLink key={link.slug} href={'/' + link.slug} className="svc-item" navigate={navigate}>
                      <span className="badge b-ink">SERVICE</span>
                      <h3>{link.label}</h3>
                      <p>Local {locationPageInfo.cityName} dispatch for this specialty.</p>
                      <div className="arrow">
                        View in {locationPageInfo.cityName} <Icon.Arrow size={12} />
                      </div>
                    </ContentLink>
                  );
                })}
              </nav>
            </div>
            <p className="inner content-page-inner-wide text-center mt-6 mb-0" style={{ maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>
              <ContentLink href="/services" className="content-nav-link" style={{ fontWeight: 700 }} navigate={navigate}>
                Browse all services
              </ContentLink>
              <span className="text-neutral-500"> · </span>
              <ContentLink href="/service-areas" className="content-nav-link" style={{ fontWeight: 700 }} navigate={navigate}>
                Service areas
              </ContentLink>
            </p>
            {moreMatrixBasesInCity.length > 0 ? (
              <div className="content-local-matrix-block">
                <ContentEmSectionHead
                  num="LOCAL · SPECIALTIES"
                  headClassName="em-section-head--stack"
                  title={'More glass services in ' + locationPageInfo.cityName}
                  sub="Every other published city page for this area—filter when you already know residential vs commercial."
                />
                {showMatrixTierToggle ? (
                  <TierViewToggle
                    value={tierFilter}
                    onChange={setTierFilter}
                    hint="Applies to this list and Related below. Use All to include mixed-property (non-prefixed) pages."
                  />
                ) : null}
                {filteredMatrixPills.length > 0 ? (
                  <div className="pill-row pill-row--matrix">
                    {filteredMatrixPills.map(function (b) {
                      return (
                        <ContentLink key={b} href={'/' + b + '-' + locationPageInfo.locationSuffix} className="pill" navigate={navigate}>
                          {SERVICE_LABELS[b] || b}
                        </ContentLink>
                      );
                    })}
                  </div>
                ) : (
                  <p className="content-em-prose text-neutral-600 mt-3 mb-0" style={{ maxWidth: '40rem' }}>
                    No services match this filter for {locationPageInfo.cityName}. Choose <strong>All</strong> to see every
                    specialty, or switch between <strong>Residential</strong> and <strong>Commercial</strong>.
                  </p>
                )}
              </div>
            ) : null}
          </Reveal>
        </section>
      )}

      {showAsideColumn && (
        <ServicesByAreaSection navigate={navigate} dispatchCtaLocation={'content-area-' + canonicalSlug} />
      )}

      {isResource && (
        <section className="section-plain content-em-landing-section">
          <Reveal variant="section" className="inner content-page-inner-wide">
            <ContentEmSectionHead
              num="NEXT · STEPS"
              title={contentEmHeadingTitle('Next steps')}
              sub="Related services and how to reach us."
            />
            <div className="content-resource-links">
              {resourceSvc && (
                <ContentLink href={resourceSvc.path} className="pill" navigate={navigate}>
                  {resourceSvc.label}
                </ContentLink>
              )}
              <ContentLink href="/contact" className="pill" navigate={navigate}>
                Get a free quote
              </ContentLink>
              <ContentLink href="/resources" className="pill" navigate={navigate}>
                Back to Resources
              </ContentLink>
            </div>
          </Reveal>
        </section>
      )}

      {relatedPageLinks.length > 0 && (
        <section className="section-plain content-em-landing-section">
          <Reveal variant="section" className="inner content-page-inner-wide">
            <ContentEmSectionHead
              num="RELATED · PAGES"
              hideSub
              title={isLocationPage ? 'Related services' : 'Related pages'}
            />
            {showRelatedOnlyTierToggle ? (
              <TierViewToggle value={tierFilter} onChange={setTierFilter} />
            ) : null}
            {filteredRelated.length > 0 ? (
              <div
                className={
                  'related-pages-grid' + (filteredRelated.length > 4 ? ' related-pages-grid--dense' : '')
                }
              >
                {filteredRelated.map(function (link) {
                  return (
                    <ContentLink key={link.href} href={link.href} className="related-page-card" navigate={navigate}>
                      <span className="related-page-card__title">{link.label}</span>
                      <span className="related-page-card__foot">
                        View page <Icon.Arrow size={14} />
                      </span>
                    </ContentLink>
                  );
                })}
              </div>
            ) : (
              <p className="content-em-prose text-neutral-600 mt-3 mb-0" style={{ maxWidth: '40rem' }}>
                Nothing in this view. Choose <strong>All</strong> to restore every related link.
              </p>
            )}
          </Reveal>
        </section>
      )}
    </>
  );
}

Object.assign(window, { ContentPage });
