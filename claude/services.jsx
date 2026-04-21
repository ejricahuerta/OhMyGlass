// Services page for OhMyGlass
function AreaDetailBody({ area: a, go }) {
  return (
    <>
      <div className="k">Now viewing · {a.name}</div>
      <h3>Emergency glass repair in {a.name}</h3>
      <p>{a.desc}</p>
      <div className="stats-row">
        <div className="ar-stat">
          <div className="v">{a.eta}</div>
          <div className="k">Service zone</div>
        </div>
        <div className="ar-stat">
          <div className="v">{a.jobs}</div>
          <div className="k">Jobs completed</div>
        </div>
        <div className="ar-stat">
          <div className="v">{a.pop}</div>
          <div className="k">Population served</div>
        </div>
        <div className="ar-stat">
          <div className="v">24/7</div>
          <div className="k">Availability</div>
        </div>
      </div>
      <div className="area-detail-actions">
        <a href="tel:6478032730" data-cta-location="services-area" className="btn btn-red">Dispatch to {a.name} · 647-803-2730</a>
        <button type="button" className="btn btn-bone-out" onClick={() => go('contact')}>Free quote for {a.name}</button>
      </div>
    </>
  );
}

function ServicesPage({ setPage }) {
  const [selectedArea, setSelectedArea] = React.useState(0);
  const go = (p) => { setPage(p); window.scrollTo({ top: 0 }); };
  const D = window.OMG_DATA;
  const area = D.areas[selectedArea];

  const categories = [
    { num: '01', title: 'Emergency & urgent', desc: 'When glass breaks outside business hours, call anytime. We dispatch 24/7 with board-up materials on every truck.', items: D.services.emergency, badgeInk: false },
    { num: '02', title: 'Residential', desc: 'From single-pane cracks to full double-pane IGU swaps. Homes, condos, and multi-unit buildings across the GTA.', items: D.services.residential, badgeInk: true },
    { num: '03', title: 'Commercial', desc: 'Storefronts, offices, retail. Same-day service to keep your business open and secure.', items: D.services.commercial, badgeInk: false },
    { num: '04', title: 'Specialty & more', desc: 'Hardware, custom mirrors, repair-vs-replace consultations.', items: D.services.more, badgeInk: true },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="crumb">
        <div className="inner">
          <a onClick={() => go('home')} style={{cursor:'pointer'}}>Home</a>
          <span>/</span>
          <span className="current">Services</span>
        </div>
      </div>

      {/* Hero */}
      <section className="page-hero">
        <div className="inner">
          <div className="eye">Section 01 · Our Services</div>
          <h1>Expert glass repair<br/><span className="serif">Toronto</span> & GTA.</h1>
          <p className="sub">
            Professional glass repair specialists. We repair cracked, broken, and foggy glass — saving you 60–80% vs replacement. 24/7 emergency service available across the Greater Toronto Area.
          </p>
          <p className="page-hero-trust">{window.OMG_DATA.trust.warrantyLine} {window.OMG_DATA.trust.insuranceLine}</p>
          <div className="phones">
            <div className="phone-grp">
              <div className="k">24/7 Main line</div>
              <a href="tel:6478032730" data-cta-location="services-hero" className="v"><span className="red">647-</span>803-2730</a>
            </div>
            <div className="phone-grp">
              <div className="k">After hours</div>
              <a href="tel:4375251255" data-cta-location="services-hero-alt" className="v">437-525-1255</a>
            </div>
            <div className="phones-cta">
              <button type="button" className="btn btn-red btn-lg" onClick={() => go('contact')}>Get a free quote <Icon.Arrow /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, ci) => (
        <section className="svc-category" key={ci}>
          <div className="inner">
            <div className="cat-header">
              <div>
                <div className="num">Category · {cat.num}</div>
                <h2>{cat.title}</h2>
              </div>
              <div className="desc">{cat.desc}</div>
            </div>
            <div className="svc-list">
              {cat.items.map((it, i) => (
                <div className="svc-item" key={i} onClick={() => go('emergency')}>
                  {it.badge && <span className={`badge${cat.badgeInk ? ' b-ink' : ''}`}>{it.badge}</span>}
                  {!it.badge && <span className="badge b-ink">SERVICE</span>}
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                  <div className="arrow">Learn more <Icon.Arrow size={12} /></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Service areas */}
      <section className="areas" id="areas">
        <div className="inner">
          <div className="section-eye">
            <span className="num" style={{color:'var(--red)'}}>05</span>
            <span>Services by area</span>
            <span className="line" style={{background:'rgba(245,242,236,0.2)'}}></span>
          </div>
          <div className="lead">
            <h2>We serve the<br/><span className="serif">full</span> GTA.</h2>
            <p className="areas-lede-copy">Choose a city for local stats and dispatch. On smaller screens, details open directly under each location.</p>
          </div>

          <div className="area-mobile-list" aria-label="Service areas — mobile">
            {D.areas.map((a, i) => (
              <div key={a.name} className="area-chip-wrap">
                <button
                  type="button"
                  className={`area-chip area-chip--mobile${selectedArea === i ? ' active' : ''}`}
                  id={`area-chip-m-${i}`}
                  aria-expanded={selectedArea === i}
                  aria-controls={`area-detail-m-${i}`}
                  onClick={() => {
                    setSelectedArea(i);
                    requestAnimationFrame(() => {
                      document.getElementById(`area-detail-m-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    });
                  }}
                >
                  <div className="area-chip-main">
                    <div className="num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="name">{a.name}</div>
                    <div className="sub">{a.eta} · {a.jobs} jobs</div>
                  </div>
                  <span className="area-chip-expand-icon" aria-hidden>
                    <Icon.ChevronDown size={18} />
                  </span>
                </button>
                {selectedArea === i && (
                  <div
                    id={`area-detail-m-${i}`}
                    className="area-detail area-detail--under-chip"
                    role="region"
                    aria-labelledby={`area-chip-m-${i}`}
                  >
                    <AreaDetailBody area={a} go={go} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="area-desktop-picker">
            <div className="area-chip-grid">
              {D.areas.map((a, i) => (
                <button
                  type="button"
                  key={a.name}
                  className={`area-chip area-chip--desktop${selectedArea === i ? ' active' : ''}`}
                  onClick={() => setSelectedArea(i)}
                  aria-pressed={selectedArea === i}
                >
                  <div className="num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="name">{a.name}</div>
                  <div className="sub">{a.eta} · {a.jobs} jobs</div>
                </button>
              ))}
            </div>
            <div className="area-detail" aria-live="polite">
              <AreaDetailBody area={area} go={go} />
            </div>
          </div>
        </div>
      </section>

      {/* Final emergency CTA */}
      <section className="cta-final" data-float-underlay="red">
        <div className="inner">
          <h2>Need help <span className="serif">now?</span></h2>
          <p>We're available 24/7 for emergency glass repair across the entire Greater Toronto Area. Board-up included free with permanent repair booking.</p>
          <div className="ctas">
            <a href="tel:6478032730" data-cta-location="services-bottom" className="btn btn-white btn-xl"><Icon.Phone /> 647-803-2730 · Main</a>
            <a href="tel:4375251255" className="btn btn-bone-out btn-xl"><Icon.Phone /> 437-525-1255 · After hours</a>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ServicesPage });
