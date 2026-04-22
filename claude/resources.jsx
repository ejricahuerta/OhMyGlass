// Resources hub: same shell as Services (page-hero + svc-category + svc-item cards)
const { useEffect: useEffectR, useState: useStateR } = React;

function cleanResourceTitle(title) {
  return String(title || '')
    .replace(/\s*[-–|]\s*OhMyGlass\.ca$/i, '')
    .replace(/\s*[-–|]\s*OhMyGlass$/i, '')
    .trim();
}

function ResourcesPage({ navigate }) {
  const [, setBump] = useStateR(0);
  const resources = (typeof window.OMG_getResourcePages === 'function' && window.OMG_getResourcePages()) || [];

  useEffectR(() => {
    var onReady = function () {
      setBump(function (n) {
        return n + 1;
      });
    };
    window.addEventListener('omg-pages-ready', onReady);
    return function () {
      window.removeEventListener('omg-pages-ready', onReady);
    };
  }, []);

  useEffectR(() => {
    document.title = 'Resources | OhMyGlass';
    var m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', 'Guides and articles on window and door glass repair and replacement in the Greater Toronto Area.');
  }, []);

  return (
    <>
      <div className="crumb">
        <div className="inner">
          <a
            href="/"
            className="content-nav-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            Home
          </a>
          <span>/</span>
          <span className="current">Resources</span>
        </div>
      </div>

      <PageHeroWithQuoteForm
        eye="Learn · Resources"
        displayTitle=""
        titleContent={
          <>
            Helpful guides
            <br />
            <span className="serif">and articles</span>
          </>
        }
        sub="Window and door glass repair and replacement in the Greater Toronto Area, written for homeowners and business owners."
        navigate={navigate}
        submitLocation="resources-hero"
        phonesCtaMain="resources-hero"
        phonesCtaAlt="resources-hero-alt"
      />

      <section className="section-plain">
        <Reveal variant="section" className="inner">
          <div className="em-section-head">
            <div>
              <div className="num">ARTICLES · ALL GUIDES</div>
              <h2>
                All <span className="serif">articles</span>
              </h2>
            </div>
            <div className="sub">
              Deep dives on foggy windows, emergency response, costs, and more. Tap a card to read the full guide.
            </div>
          </div>
          {resources.length === 0 ? (
            <p className="mono" style={{ color: 'var(--mute)' }}>
              Loading articles…
            </p>
          ) : (
            <div className="content-em-band">
            <ul className="svc-list">
              {resources.map((r, ri) => {
                const slug = window.OMG_urlToSlug(r.url);
                const href = '/' + slug;
                const desc = (r.seo && r.seo.meta_description) || '';
                return (
                  <Reveal as="li" variant="card" delayMs={ri * 50} key={slug} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    <a
                      href={href}
                      className="svc-item"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(href);
                      }}
                    >
                      <span className="badge b-ink">GUIDE</span>
                      <h3>{cleanResourceTitle(r.title)}</h3>
                      {desc ? <p>{desc.length > 160 ? desc.slice(0, 157) + '…' : desc}</p> : <p>Read the full guide.</p>}
                      <div className="arrow">
                        Read article <Icon.Arrow size={12} />
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </ul>
            </div>
          )}
        </Reveal>
      </section>
    </>
  );
}

Object.assign(window, { ResourcesPage });
