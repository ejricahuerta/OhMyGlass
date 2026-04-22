// Emergency page for OhMyGlass (marketing landing at /emergency-glass-repair)
function EmergencyPage({ navigate }) {
  const D = window.OMG_DATA;
  const T = D.trust;
  const C = D.contact;

  return (
    <>
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
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              navigate('/services');
            }}
            style={{ cursor: 'pointer' }}
          >
            Services
          </a>
          <span>/</span>
          <span className="current">Emergency Glass Repair · 24/7 Fast Response</span>
        </div>
      </div>

      {/* Hero (red, loud) */}
      <section className="em-hero" data-float-underlay="red">
        <div className="inner em-hero-inner">
          <div className="em-hero-copy">
            <h1>Emergency window &amp; door glass repair.<br/>When you need it <span className="serif">most</span>.</h1>
            <p className="intro">
              Accidents, break-ins, and storms don't wait for business hours, and neither do we. OhMyGlass provides round-the-clock 24/7 emergency window and door glass repair across the Greater Toronto Area. {T.responseTimeLine} We carry board-up materials, common glass sizes, and professional tools on every service vehicle.
            </p>
            {T.insuranceLine && String(T.insuranceLine).trim() ? <p className="em-hero-insurance">{T.insuranceLine}</p> : null}
          </div>
          <div className="em-hero-aside">
            <div className="call-panel">
              <div>
                <div className="k">Main · 24/7 dispatch</div>
                <div className="v">
                  <a href={C.phoneHref} data-cta-location="emergency-hero" className="em-hero-phone-link">
                    {C.phone}
                  </a>
                </div>
              </div>
              <div className="sep"></div>
              <div>
                <div className="k">After hours line</div>
                <div className="v">
                  <a href={C.afterHoursPhoneHref} data-cta-location="emergency-hero-alt" className="em-hero-phone-link">
                    {C.afterHoursPhone}
                  </a>
                </div>
              </div>
              <div className="call-panel-cta">
                <a href={C.phoneHref} data-cta-location="emergency-hero-cta" className="btn em-hero-call-btn" style={{ background: '#fff', color: '#E5322D' }}>
                  <Icon.Phone /> Call now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrokenGlassSafetyChecklistSection />

      {/* 5-step process timeline */}
      <section className="section-plain">
        <div className="inner">
          <div className="em-section-head">
            <div>
              <div className="num">DISPATCH · HOW IT WORKS</div>
              <h2>How our <span className="serif">response</span> works.</h2>
            </div>
            <div className="sub">Our emergency process is designed to secure your property as fast as possible and schedule permanent replacement with minimal delay.</div>
          </div>
          <div className="process-timeline">
            {D.processSteps.map((s, i) => (
              <div className="step" key={i} style={{paddingLeft: i === 0 ? 0 : 24}}>
                <div className="n">{s.n}</div>
                <div className="t">{s.t}</div>
                <div className="d">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of emergencies */}
      <section className="section-plain">
        <div className="inner">
          <div className="em-section-head">
            <div>
              <div className="num">SCOPE · WHAT WE HANDLE</div>
              <h2>What we <span className="serif">handle.</span></h2>
            </div>
            <div className="sub">We handle every kind of glass emergency for both residential and commercial properties across the GTA.</div>
          </div>
          <div className="em-types">
            {D.emTypes.map((t, i) => (
              <div className="em-type" key={i}>
                <div className="ic">{t.ic}</div>
                <div>
                  <strong>{t.t}</strong>
                  <p>{t.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-plain em-faq-section">
        <div className="inner">
          <div className="em-section-head em-section-head--faq">
            <div>
              <div className="num">FAQ · QUICK ANSWERS</div>
              <h2>Quick <span className="serif">answers.</span></h2>
            </div>
            <div className="sub">Insurance, billing, and what to expect when you call.</div>
          </div>
          <div className="faq-list">
            {D.faq.map((item, i) => (
              <details className="faq-item" key={i}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Board-up callout */}
      <section className="section-plain" style={{background:'var(--bone)'}}>
        <div className="inner">
          <div className="boardup-callout">
            <div className="boardup-seal" aria-hidden>
              <div className="boardup-seal-inner">
                <span className="boardup-seal-zero">$0</span>
                <span className="boardup-seal-cap">Board-up</span>
              </div>
            </div>
            <div>
              <div className="tag">FREE WITH REPAIR</div>
              <h3>Board-up<br/><span className="serif">included.</span></h3>
            </div>
            <div>
              <p>Board-up is a temporary protective measure when permanent glass can't be installed immediately, for example when custom sizes need fabrication or breaks happen overnight.</p>
              <ul>
                <li>Prevents rain and wind intrusion</li>
                <li>Deters further break-in attempts</li>
                <li>Maintains insulation until permanent glass</li>
                <li>Protects interior from debris and pests</li>
              </ul>
              <div className="free-banner">
                <div className="free-big">$0</div>
                <div className="t">Board-up is included at no additional charge when you proceed with the permanent glass replacement through OhMyGlass.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="form-section section-plain" style={{background:'var(--bone-2)'}}>
        <div className="inner">
          <div className="form-grid">
            <div>
              <div className="mono em-form-section-kicker">HELP · GET IN TOUCH</div>
              <h2 style={{fontSize:'clamp(36px, 4.5vw, 64px)', fontWeight:800, letterSpacing:'-0.025em', lineHeight:1, marginBottom:24}}>
                Non-emergency?<br/><span className="serif" style={{fontFamily:"'Fraunces', serif", fontStyle:'italic', fontWeight:400, color:'var(--red)'}}>Send us</span><br/> the details.
              </h2>
              <p style={{fontSize:16, lineHeight:1.6, color:'var(--ink-3)', marginBottom:24, maxWidth:480}}>
                For anything not a 2am emergency, the form is the fastest way to get a quote. We'll text or email back within 2 business hours.
              </p>
              <div className="em-form-callout" style={{padding:20, background:'var(--paper)', border:'1px solid var(--rule)', display:'flex', alignItems:'center', gap:16}}>
                <div style={{width:48, height:48, background:'var(--red)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%'}}>
                  <Icon.Phone size={20}/>
                </div>
                <div>
                  <div className="mono" style={{fontSize:10, letterSpacing:'0.12em', color:'var(--mute)', textTransform:'uppercase'}}>Is it urgent?</div>
                  <a href={C.phoneHref} data-cta-location="emergency-form-aside" style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em' }}>
                    Call {C.phone}
                  </a>
                </div>
              </div>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { EmergencyPage });
