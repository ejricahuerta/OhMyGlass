// Emergency page for OhMyGlass
function EmergencyPage({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0 }); };
  const D = window.OMG_DATA;

  return (
    <>
      <div className="crumb">
        <div className="inner">
          <a onClick={() => go('home')} style={{cursor:'pointer'}}>Home</a>
          <span>/</span>
          <a onClick={() => go('services')} style={{cursor:'pointer'}}>Services</a>
          <span>/</span>
          <span className="current">Emergency Glass Repair · 24/7 Fast Response</span>
        </div>
      </div>

      {/* Hero — red, loud */}
      <section className="em-hero" data-float-underlay="red">
        <div className="inner">
          <div className="badge-row">
            <span className="big-badge"><span className="dot"></span>DISPATCHING NOW</span>
            <span className="big-badge outline">24/7 · Nights · Weekends · Holidays</span>
            <span className="big-badge outline">Rapid dispatch · GTA</span>
          </div>
          <h1>Emergency glass repair.<br/><span className="serif">When</span> you need it most.</h1>
          <p className="intro">
            Accidents, break-ins, and storms don't wait for business hours — and neither do we. OhMyGlass provides round-the-clock 24/7 emergency glass repair across the Greater Toronto Area. When you call, we confirm your address and job type, dispatch the nearest available crew right away, and your dispatcher gives an estimated arrival based on distance, traffic, and current volume. We carry board-up materials, common glass sizes, and professional tools on every service vehicle.
          </p>
          <div className="call-panel">
            <div>
              <div className="k">Main · 24/7 dispatch</div>
              <div className="v">647-803-2730</div>
            </div>
            <div className="sep"></div>
            <div>
              <div className="k">After hours line</div>
              <div className="v">437-525-1255</div>
            </div>
            <div className="call-panel-cta">
              <a href="tel:6478032730" className="btn" style={{background:'#fff', color:'#E5322D', padding:'14px 20px'}}>
                <Icon.Phone /> Call now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Safety checklist */}
      <section className="section-plain">
        <div className="inner">
          <div className="em-section-head">
            <div>
              <div className="num">SECTION 01</div>
              <h2>What to do <span className="serif">while</span> you wait.</h2>
            </div>
            <div className="sub">The first few minutes after a glass break are critical for safety. Follow these steps while you wait for our team to arrive.</div>
          </div>
          <div className="checklist">
            {D.checklist.map((c, i) => (
              <div className="item" key={i}>
                <div className="n">STEP · {c.n}</div>
                <div className="c">
                  <strong>{c.t}</strong>
                  <p>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-step process timeline */}
      <section className="section-plain">
        <div className="inner">
          <div className="em-section-head">
            <div>
              <div className="num">SECTION 02</div>
              <h2>How our <span className="serif">response</span> works.</h2>
            </div>
            <div className="sub">Our emergency process is designed to secure your property as fast as possible and schedule permanent replacement with minimal delay.</div>
          </div>
          <div className="process-timeline">
            {D.processSteps.map((s, i) => (
              <div className="step" key={i} style={{paddingLeft: i === 0 ? 0 : 24}}>
                <div className="n">{s.n} · {i === 0 ? 'CALL' : i === D.processSteps.length-1 ? 'DONE' : 'IN PROGRESS'}</div>
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
              <div className="num">SECTION 03</div>
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

      {/* Board-up callout */}
      <section className="section-plain" style={{background:'var(--bone)'}}>
        <div className="inner">
          <div className="boardup-callout">
            <div>
              <div className="tag">FREE WITH REPAIR</div>
              <h3>Board-up<br/><span className="serif">included.</span></h3>
            </div>
            <div>
              <p>Board-up is a temporary protective measure when permanent glass can't be installed immediately — custom sizes need fabrication, or breaks happen overnight.</p>
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
        <div className="inner" style={{maxWidth: 1440}}>
          <div className="form-grid">
            <div>
              <div className="mono em-form-section-kicker">Section 04 · Get help</div>
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
                  <a href="tel:6478032730" style={{fontSize:20, fontWeight:800, letterSpacing:'-0.01em'}}>Call 647-803-2730</a>
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
