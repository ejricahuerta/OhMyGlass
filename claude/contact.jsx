// Contact page for OhMyGlass
function ContactPage({ navigate }) {
  const C = window.OMG_DATA.contact;

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
          <span className="current">Contact · Free Quote</span>
        </div>
      </div>

      <PageHeroWithQuoteForm
        eye="Contact · Window &amp; door glass"
        titleContent={
          <>
            Contact
            <br />
            <span className="serif">OhMy</span>Glass.
          </>
        }
        sub="Have a question or need to get in touch? Send the form and we'll get back to you quickly. You can also call, text, or email; emergencies are answered 24/7."
        submitLocation="contact-hero"
        phonesCtaMain="contact-hero"
        phonesCtaAlt="contact-hero-alt"
      />

      <div className="contact-grid">
        <div className="contact-info-block">
            <div className="item">
              <div className="k">Main · 24/7</div>
              <div className="v">
                <a href={C.phoneHref} data-cta-location="contact-sidebar">
                  {C.phone}
                </a>
                <span className="sub">Primary dispatch line, always answered</span>
              </div>
            </div>
            <div className="item">
              <div className="k">Text a photo</div>
              <div className="v contact-sms-wrap">
                <SmsQuoteCta location="contact-sidebar" variant="contact-link" />
              </div>
            </div>
            <div className="item">
              <div className="k">After hours</div>
              <div className="v">
                <a href={C.afterHoursPhoneHref} data-cta-location="contact-sidebar-alt">
                  {C.afterHoursPhone}
                </a>
                <span className="sub">Backup line if main is busy</span>
              </div>
            </div>
            <div className="item">
              <div className="k">Email</div>
              <div className="v">
                <a href={C.emailHref}>{C.email}</a>
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
                <span className="sub">
                  <a
                    href="/service-areas"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/service-areas');
                    }}
                    style={{ cursor: 'pointer', color: 'var(--red)' }}
                  >
                    View service areas →
                  </a>
                </span>
              </div>
            </div>
          </div>

        <div className="contact-map-col">
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
            <a href={C.googleMaps} target="_blank" rel="noopener noreferrer" className="open-maps">
              Open in Maps →
            </a>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <section className="cta-final" data-float-underlay="red">
        <div className="inner">
          <h2>Glass <span className="serif">doesn't</span> wait. Neither do we.</h2>
          <p>Pick up the phone or send the form. Whichever is faster for you, we will be on the way.</p>
          <div className="ctas">
            <a href={C.phoneHref} data-cta-location="contact-cta-final" className="btn btn-white btn-xl">
              <Icon.Phone /> Call {C.phone}
            </a>
            <a href={C.emailHref} className="btn btn-bone-out btn-xl">
              Email us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ContactPage });
