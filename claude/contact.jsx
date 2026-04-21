// Contact page for OhMyGlass
function ContactPage({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0 }); };

  return (
    <>
      <div className="crumb">
        <div className="inner">
          <a onClick={() => go('home')} style={{cursor:'pointer'}}>Home</a>
          <span>/</span>
          <span className="current">Contact · Free Quote</span>
        </div>
      </div>

      <section className="contact-hero">
        <div className="inner">
          <div className="mono" style={{fontSize:11, letterSpacing:'0.15em', color:'var(--red)', fontWeight:700, marginBottom:16, textTransform:'uppercase'}}>Let's talk glass</div>
          <h1>Contact<br /><span className="serif">OhMy</span>Glass.</h1>
          <p className="sub">
            Have a question or need to get in touch? Fill out the form below and we'll get back to you quickly. You can also reach us by phone or email — emergencies are answered 24/7.
          </p>
        </div>
      </section>

      <div className="contact-grid">
        {/* Left: contact info */}
        <div>
          <div className="contact-info-block">
            <div className="item">
              <div className="k">Main · 24/7</div>
              <div className="v">
                <a href="tel:6478032730">647-803-2730</a>
                <span className="sub">Primary dispatch line — always answered</span>
              </div>
            </div>
            <div className="item">
              <div className="k">After hours</div>
              <div className="v">
                <a href="tel:4375251255">437-525-1255</a>
                <span className="sub">Backup line if main is busy</span>
              </div>
            </div>
            <div className="item">
              <div className="k">Email</div>
              <div className="v">
                <a href="mailto:ohmy.glass.to@gmail.com">ohmy.glass.to@gmail.com</a>
                <span className="sub">Replies within 2 business hours</span>
              </div>
            </div>
            <div className="item">
              <div className="k">Shop</div>
              <div className="v">
                7 Benjamin Boake Trail
                <span className="sub">North York, ON, Canada</span>
              </div>
            </div>
            <div className="item">
              <div className="k">Hours</div>
              <div className="v">
                24 / 7 / 365
                <span className="sub">Emergency dispatch never closes</span>
              </div>
            </div>
            <div className="item">
              <div className="k">Area</div>
              <div className="v">
                Full GTA
                <span className="sub"><a onClick={() => { go('services'); setTimeout(() => document.getElementById('areas')?.scrollIntoView({behavior:'smooth'}), 100); }} style={{cursor:'pointer', color:'var(--red)'}}>View service areas →</a></span>
              </div>
            </div>
          </div>

          {/* Fake map */}
          <div className="map-embed">
            <div className="overlay">
              <svg className="bg" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F5F2EC" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)"/>
                <path d="M 0 100 Q 100 80 200 110 T 400 90" fill="none" stroke="#F5F2EC" strokeWidth="1.5" opacity="0.4"/>
                <path d="M 0 140 Q 100 120 200 150 T 400 130" fill="none" stroke="#F5F2EC" strokeWidth="1" opacity="0.3"/>
                <path d="M 50 0 L 70 225" fill="none" stroke="#F5F2EC" strokeWidth="1" opacity="0.4"/>
                <path d="M 150 0 L 170 225" fill="none" stroke="#F5F2EC" strokeWidth="1" opacity="0.4"/>
                <path d="M 280 0 L 300 225" fill="none" stroke="#F5F2EC" strokeWidth="1" opacity="0.3"/>
              </svg>
              <div className="pin"></div>
              <div className="pin-label">7 Benjamin Boake Trail · North York</div>
            </div>
            <a href="https://maps.app.goo.gl/asTcvrbx57PsitbD9" target="_blank" className="open-maps">Open in Maps →</a>
          </div>
        </div>

        {/* Right: form */}
        <div>
          <QuoteForm />
        </div>
      </div>

      {/* Final CTA */}
      <section className="cta-final">
        <div className="inner">
          <h2>Glass <span className="serif">doesn't</span> wait. Neither do we.</h2>
          <p>Pick up the phone or send the form. Whichever's faster for you — we'll be on the way.</p>
          <div className="ctas">
            <a href="tel:6478032730" className="btn btn-white btn-xl"><Icon.Phone /> Call 647-803-2730</a>
            <a href="mailto:ohmy.glass.to@gmail.com" className="btn btn-bone-out btn-xl">Email us</a>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ContactPage });
