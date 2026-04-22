// Dynamic slug page from pages.json; layout aligned with Services / Contact (page-hero, svc-category, section-plain)
const { useEffect: useEffectC } = React;

var LOCATION_SUFFIXES = ['newmarket', 'etobicoke', 'markham', 'north-york', 'richmond-hill', 'scarborough', 'toronto', 'vaughan', 'mississauga'];
var SERVICE_BASES = ['emergency-glass-repair', 'storefront-glass-repair', 'window-glass-replacement'];
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
};
var SERVICE_LABELS = {
  'emergency-glass-repair': 'Emergency glass repair',
  'storefront-glass-repair': 'Storefront glass repair',
  'window-glass-replacement': 'Window glass replacement',
};

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

var SERVICE_AREA_SECTION_SLUGS = [
  'broken-window-repair',
  'residential-window-repair',
  'foggy-window-repair',
  'commercial-glass-repair',
  'storefront-glass-repair',
];

function cleanDisplayTitle(title) {
  return String(title || '')
    .replace(/\s*-\s*OhMyGlass\.ca$/i, '')
    .replace(/\s*–\s*OhMyGlass\.ca$/i, '')
    .replace(/\s*-\s*OhMyGlass$/i, '')
    .replace(/\s*–\s*OhMyGlass$/i, '')
    .replace(/\s*\|\s*OhMyGlass$/i, '')
    .trim();
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
function ContentEmSectionHead({ num, title, sub, headClassName, headStyle }) {
  var subText = sub != null && String(sub).trim() !== '' ? String(sub).trim() : null;
  return (
    <div className={'em-section-head' + (headClassName ? ' ' + headClassName : '')} style={headStyle || undefined}>
      <div>
        <div className="num">{num}</div>
        <h2>{title}</h2>
      </div>
      <div className="sub">{subText || '\u00a0'}</div>
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
function ContentSectionListBody({ section }) {
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
  for (var i = 0; i < SERVICE_BASES.length; i++) {
    var base = SERVICE_BASES[i];
    var prefix = base + '-';
    if (slug.indexOf(prefix) !== 0) continue;
    var locationSuffix = slug.slice(prefix.length);
    if (LOCATION_SUFFIXES.indexOf(locationSuffix) === -1) continue;
    var otherBases = SERVICE_BASES.filter(function (b) {
      return b !== base;
    });
    return {
      cityName: LOCATION_DISPLAY_NAMES[locationSuffix] || locationSuffix,
      otherLinks: otherBases.map(function (b) {
        return { slug: b + '-' + locationSuffix, label: SERVICE_LABELS[b] };
      }),
    };
  }
  return null;
}

function ContentPage({ slug, navigate }) {
  const page = typeof window.OMG_getPageBySlug === 'function' ? window.OMG_getPageBySlug(slug) : null;
  const contact = window.OMG_DATA.contact;
  const cities = window.OMG_DATA.serviceAreaCitiesList || [];

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

  const isGenericServiceWithAreas = SERVICE_BASES.indexOf(canonicalSlug) !== -1;
  const genericServiceAreaLinks = isGenericServiceWithAreas
    ? LOCATION_SUFFIXES.map(function (suffix) {
        return { name: LOCATION_DISPLAY_NAMES[suffix] || suffix, slug: canonicalSlug + '-' + suffix };
      })
    : [];

  const hasExplicitAreasSection = (page.sections || []).some(function (section) {
    return /areas?\s+we\s+serve|service\s+areas?/i.test(section.heading || '');
  });
  const shouldShowServiceAreaAboveForm =
    page.type === 'service' &&
    SERVICE_AREA_SECTION_SLUGS.indexOf(canonicalSlug) !== -1 &&
    !isGenericServiceWithAreas &&
    !hasExplicitAreasSection;
  const showAsideColumn = !isResource && shouldShowServiceAreaAboveForm;

  const relatedPageLinks = RELATED_PAGE_LINKS[canonicalSlug] || [];
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
          <div className="inner">
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
          </div>
        </section>

        <section className="section-plain">
          <div className="inner">
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
          </div>
        </section>

        <section className="section-plain">
          <div className="inner">
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
          </div>
        </section>

        <section className="section-plain">
          <div className="inner">
            <ContentEmSectionHead
              num="LOCAL · POPULAR PAGES"
              title="Popular Toronto area pages"
              sub="Quick links to our highest-priority local service pages."
            />
            <div className="content-em-band">
            <div className="svc-list content-area-link-grid">
              <ContentLink href="/window-repair-toronto" className="svc-item" navigate={navigate}>
                <span className="badge b-ink">TORONTO</span>
                <h3>Window Repair Toronto</h3>
                <p>Same-day residential and commercial window repair.</p>
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
              <ContentLink href="/glass-replacement-toronto" className="svc-item" navigate={navigate}>
                <span className="badge b-ink">GLASS</span>
                <h3>Glass Replacement Toronto</h3>
                <p>Expert window glass replacement with clear pricing.</p>
                <div className="arrow">
                  Learn more <Icon.Arrow size={12} />
                </div>
              </ContentLink>
            </div>
            </div>
          </div>
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
        <div className="inner content-page-inner-wide">
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
        </div>
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
          var headTitle = contentEmHeadingTitle(titleText);
          return (
            <section className={sectionClass} key={'emsec' + si}>
              <div className="inner content-page-inner-wide">
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
                  {section.list && section.list.length > 0 ? <ContentSectionListBody section={section} /> : null}
                </div>
              </div>
            </section>
          );
        })}

      {genericServiceAreaLinks.length > 0 && (
        <section className="section-plain content-em-landing-section">
          <div className="inner content-page-inner-wide">
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
          </div>
        </section>
      )}

      {isResource && (
        <section className="section-plain content-em-landing-section">
          <div className="inner content-page-inner-wide">
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
          </div>
        </section>
      )}

      {relatedPageLinks.length > 0 && (
        <section className="section-plain content-em-landing-section">
          <div className="inner content-page-inner-wide">
            <ContentEmSectionHead
              num="RELATED · LINKS"
              title={contentEmHeadingTitle('See also')}
              sub="Related pages that pair well with what you just read."
            />
            <div className="pill-row">
              {relatedPageLinks.map(function (link) {
                return (
                  <ContentLink key={link.href} href={link.href} className="pill" navigate={navigate}>
                    {link.label}
                  </ContentLink>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {isLocationPage && locationPageInfo && (
        <section className="section-plain content-em-landing-section">
          <div className="inner content-page-inner-wide">
            <ContentEmSectionHead
              num="LOCAL · MORE SERVICES"
              title={contentEmHeadingTitle('Other services in ' + locationPageInfo.cityName)}
              sub="Same crew and same trucks, with different glass specialties in your neighbourhood."
            />
            <div className="content-em-band">
              <nav className="svc-list content-area-link-grid" aria-label={'Other services in ' + locationPageInfo.cityName}>
                {locationPageInfo.otherLinks.map(function (link) {
                  return (
                    <ContentLink key={link.slug} href={'/' + link.slug} className="svc-item" navigate={navigate}>
                      <span className="badge b-ink">SERVICE</span>
                      <h3>{link.label}</h3>
                      <p>Same crew and trucks, with local {locationPageInfo.cityName} dispatch for this specialty.</p>
                      <div className="arrow">
                        View in {locationPageInfo.cityName} <Icon.Arrow size={12} />
                      </div>
                    </ContentLink>
                  );
                })}
              </nav>
            </div>
          </div>
        </section>
      )}

      {showAsideColumn && (
        <ServicesByAreaSection navigate={navigate} dispatchCtaLocation={'content-area-' + canonicalSlug} />
      )}

      {!isResource && (
        <section className="content-footer-strip">
          <div className="inner">
            Serving the Greater Toronto Area.{' '}
            <ContentLink href="/service-areas" className="content-nav-link" style={{ fontWeight: 700 }} navigate={navigate}>
              View Service Areas
            </ContentLink>
          </div>
        </section>
      )}
    </>
  );
}

Object.assign(window, { ContentPage });
