// Services page for OhMyGlass
function ServicesPage({ navigate }) {
  const D = window.OMG_DATA;
  const C = D.contact;

  const categories = [
    { eyebrow: '24/7 · EMERGENCY & URGENT', title: 'Emergency & urgent', desc: 'When glass breaks outside business hours, call anytime. We dispatch 24/7 with board-up materials on every truck.', items: D.services.emergency, badgeInk: false },
    { eyebrow: 'HOMES · RESIDENTIAL', title: 'Residential', desc: 'From single-pane cracks to full double-pane IGU swaps. Homes, condos, and multi-unit buildings across the GTA.', items: D.services.residential, badgeInk: true },
    { eyebrow: 'BUSINESS · COMMERCIAL', title: 'Commercial', desc: 'Storefronts, offices, retail. Same-day service to keep your business open and secure.', items: D.services.commercial, badgeInk: false },
    { eyebrow: 'EXTRA · SPECIALTY & MORE', title: 'Specialty & more', desc: 'Hardware, custom mirrors, repair-vs-replace consultations.', items: D.services.more, badgeInk: true },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="crumb">
        <div className="inner">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            style={{ cursor: 'pointer' }}
          >
            Home
          </a>
          <span>/</span>
          <span className="current">Services</span>
        </div>
      </div>

      <PageHeroWithQuoteForm
        eye="SERVICES · WINDOW & DOOR GLASS"
        displayTitle=""
        titleContent={
          <>
            Window &amp; door glass repair
            <br />
            <span className="serif">Toronto</span> &amp; GTA.
          </>
        }
        sub={D.site.homeHeroSub}
        navigate={navigate}
        submitLocation="services-hero"
        phonesCtaMain="services-hero"
        phonesCtaAlt="services-hero-alt"
      />

      {/* Categories: same section rhythm as /emergency-glass-repair (section-plain + em-section-head) */}
      {categories.map((cat, ci) => (
        <section className="section-plain" key={ci}>
          <Reveal variant="section" className="inner">
            <div className="em-section-head">
              <div>
                <div className="num">{cat.eyebrow}</div>
                <h2>{cat.title}</h2>
              </div>
              <div className="sub">{cat.desc}</div>
            </div>
            <div className="content-em-band">
            <div className="svc-list">
              {cat.items.map((it, i) => (
                <Reveal
                  variant="card"
                  delayMs={i * 45}
                  className="svc-item"
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    if (it.link) navigate(it.link);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (it.link) navigate(it.link);
                    }
                  }}
                >
                  {it.badge && <span className={`badge${cat.badgeInk ? ' b-ink' : ''}`}>{it.badge}</span>}
                  {!it.badge && <span className="badge b-ink">SERVICE</span>}
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                  <div className="arrow">Learn more <Icon.Arrow size={12} /></div>
                </Reveal>
              ))}
            </div>
            </div>
          </Reveal>
        </section>
      ))}

      <ServicesByAreaSection navigate={navigate} />

      {/* Final emergency CTA */}
      <section className="cta-final" data-float-underlay="red">
        <Reveal variant="section" className="inner">
          <h2>Broken glass <span className="serif">after hours?</span></h2>
          <p>We're available 24/7 for emergency window and door glass repair across the entire Greater Toronto Area. Board-up included free with permanent repair booking.</p>
          <div className="ctas">
            <a href={C.phoneHref} data-cta-location="services-bottom" className="btn btn-white btn-xl">
              <Icon.Phone /> {C.phone} · Main
            </a>
            <a href={C.afterHoursPhoneHref} className="btn btn-bone-out btn-xl">
              <Icon.Phone /> {C.afterHoursPhone} · After hours
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

Object.assign(window, { ServicesPage });
