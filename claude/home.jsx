// Home page for OhMyGlass
const { useState: useStateH, useRef: useRefH } = React;

function WorkFilmCard({ w, filmNum }) {
  const [playing, setPlaying] = useStateH(false);
  const vidRef = useRefH(null);

  const startPlay = () => {
    if (typeof window.OMG_trackEvent === 'function') {
      window.OMG_trackEvent('video_play', { film: w.brand, filmNum });
    }
    setPlaying(true);
    requestAnimationFrame(() => {
      const el = vidRef.current;
      if (el) el.play().catch(() => {});
    });
  };

  const onPlayOverlayClick = (e) => {
    e.preventDefault();
    startPlay();
  };

  const onPlayOverlayKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startPlay();
    }
  };

  const onVideoEnded = () => {
    setPlaying(false);
    const el = vidRef.current;
    if (el) el.currentTime = 0;
  };

  return (
    <div className="work-item">
      <div className="work-frame">
        <video
          ref={vidRef}
          className={playing ? 'is-playing' : ''}
          src={encodeURI(w.video)}
          playsInline
          preload="metadata"
          controls={playing}
          onEnded={onVideoEnded}
        />
        {!playing && (
          <div
            className="play"
            onClick={onPlayOverlayClick}
            onKeyDown={onPlayOverlayKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`Play film: ${w.brand}`}
          >
            <div className="play-btn"><Icon.Play size={28} /></div>
          </div>
        )}
      </div>
      <div className="meta">
        <span className="idx">FILM {String(filmNum).padStart(2, '0')}</span>
        <span className="loc">{w.loc}</span>
      </div>
      <h3>{w.brand}</h3>
      <div className="cat">{w.cat}</div>
      <p>{w.desc}</p>
    </div>
  );
}

function HomePage({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0 }); };
  const T = window.OMG_DATA.trust;
  const S = window.OMG_DATA.site;

  const serviceFeatures = [
    { t: 'Window Repairs', desc: 'Cracked, broken, or foggy panes — repaired in under 2 hours on most jobs.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', badge: 'WINDOWS' },
    { t: 'Aluminum Storefront', desc: 'Commercial frames, tempered glass, and full storefront installs across the GTA.', img: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800', badge: 'STOREFRONTS' },
    { t: 'Door Repairs', desc: 'Patio, entry, sliding. Glass panels, hardware, tracks, rollers — residential and commercial.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', badge: 'DOORS' },
    { t: 'Custom Mirror', desc: 'Cut to size for bathrooms, closets, retail. Delivered and installed professionally.', img: 'https://images.unsplash.com/photo-1595514535415-dae8970c381a?w=800', badge: 'MIRRORS' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-kicker">
              <span className="line"></span>
              <span className="hero-kicker-full">Est. 2015 · North York, ON · 5,000+ jobs across 2,000+ GTA properties</span>
              <span className="hero-kicker-short">Est. 2015 · North York · GTA</span>
            </div>
            <h1>
              Glass breaks.<br/>
              <span className="accent">We</span> <span className="red">fix it</span><br/>
              fast.
            </h1>
            <p className="hero-sub">
              Professional glass repair and replacement across Toronto, North York, Vaughan, Richmond Hill, Markham, Mississauga and the full GTA. We repair cracked, broken, and foggy glass — saving you 60–80% vs full replacement.
            </p>
            <div className="hero-ctas hero-ctas--stack">
              <div className="hero-contact-rail" role="group" aria-label="Call or text OhMyGlass">
                <span className="hero-contact-seg hero-contact-seg--num">{S.phoneDisplay}</span>
                <a
                  href={`tel:${S.phoneE164}`}
                  data-cta-location="home-hero"
                  className="hero-contact-seg hero-contact-seg--action"
                  aria-label={`Call ${S.phoneDisplay}`}
                >
                  <Icon.Phone size={20} />
                </a>
                <a
                  href={window.OMG_smsHref()}
                  data-cta-location="home-hero"
                  className="hero-contact-seg hero-contact-seg--action"
                  aria-label={`Text ${S.phoneDisplay} a photo for a quote`}
                >
                  <Icon.Message size={20} />
                </a>
              </div>
              <p className="sms-quote-helper hero-contact-helper">{S.smsHelper}</p>
            </div>
          </div>
          <div className="hero-visual hero-visual--form">
            <div className="hero-form-stack">
              <QuoteForm submitLocation="home-hero" />
            </div>
          </div>
        </div>
        <div className="hero-marquee hero-marquee-spacer hero-marquee--subtle">
          <div className="track">
            {Array(3).fill(0).map((_, i) => (
              <span key={i}>
                <span>Toronto</span><span className="star">✦</span>
                <span>North York</span><span className="star">✦</span>
                <span>Vaughan</span><span className="star">✦</span>
                <span>Richmond Hill</span><span className="star">✦</span>
                <span>Markham</span><span className="star">✦</span>
                <span>Mississauga</span><span className="star">✦</span>
                <span>Scarborough</span><span className="star">✦</span>
                <span>Etobicoke</span><span className="star">✦</span>
                <span>Newmarket</span><span className="star">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — trust metrics (after hero) */}
      <section className="stats" aria-label="OhMyGlass by the numbers">
        <div className="stats-inner">
          <div className="stat">
            <div className="big">2<sup>K+</sup></div>
            <div className="k">GTA properties</div>
            <div className="v">Homes, condos, storefronts, and commercial sites we have repaired or replaced glass for across the Greater Toronto Area.</div>
          </div>
          <div className="stat">
            <div className="big">10<sup>YRS</sup></div>
            <div className="k">Years of experience</div>
            <div className="v">In the glass business for over a decade. Same local crew, same repair-first approach.</div>
          </div>
          <div className="stat">
            <div className="big">5<sup>K+</sup></div>
            <div className="k">Glass jobs</div>
            <div className="v">Completed successfully across the GTA, saving customers 60–80% vs full replacement where repair was possible.</div>
          </div>
        </div>
      </section>

      {/* OUR WORK — elevated (PRD) */}
      <section className="section work" id="work">
        <div className="section-inner">
          <div className="section-eye">
            <span className="num">01</span>
            <span>Our work</span>
            <span className="line"></span>
          </div>
          <h2 className="section-h">On-site. <span className="serif">On camera.</span><br/>No stock photos.</h2>
          <p className="section-lede">
            Three recent commercial installs filmed end to end. Watch how we approach measuring, board-up, and final installation.
          </p>
          <div className="work-grid">
            {window.OMG_DATA.work.map((w, i) => (
              <WorkFilmCard key={w.brand} w={w} filmNum={i + 1} />
            ))}
          </div>
          <div style={{textAlign:'center', marginTop: 48}}>
            <a href="https://www.instagram.com/ohmy.glass/" target="_blank" rel="noreferrer" className="btn btn-bone-out btn-lg">
              <Icon.IG /> View all work on Instagram <Icon.Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section why">
        <div className="section-inner">
          <div className="section-eye">
            <span className="num">02</span>
            <span>Why OhMyGlass</span>
            <span className="line"></span>
          </div>
          <div className="why-grid">
            <div className="why-left">
              <h2>Expert repairs. <span className="quote">Not</span> expensive replacements.</h2>
              <div className="motto">
                We repair when possible, <strong>replace only when necessary.</strong>
              </div>
              <p className="why-warranty-note">{T.warrantyLine}</p>
            </div>
            <div className="why-right">
              {[
                ['10+ yrs', 'A decade of GTA glass work', 'Specialists — not generalists. Glass is all we do.', 'EXPERIENCE'],
                ['24/7', 'Emergency dispatch', 'Nights, weekends, and holidays. Real humans answer.', 'AVAILABILITY'],
                ['60–80%', 'Typical customer savings', 'We repair glass instead of replacing whole windows.', 'COST'],
                ['FREE', 'Board-up included', 'No extra charge when booking the permanent repair with us.', 'VALUE'],
                ['5.0★', 'Google & Facebook rating', 'Hundreds of reviews from homeowners and business owners.', 'TRUST'],
                ['GTA', 'Full coverage', 'Toronto, North York, Vaughan, Markham, Mississauga + more.', 'REACH'],
              ].map((row, i) => (
                <div className="why-item" key={i}>
                  <div className="n">0{i + 1}</div>
                  <div className="t">{row[1]}</div>
                  <div className="k">{row[3]}</div>
                  <div className="d">{row[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE PREVIEWS */}
      <section className="section services-preview">
        <div className="section-inner">
          <div className="section-eye">
            <span className="num">03</span>
            <span>What we fix</span>
            <span className="line"></span>
          </div>
          <h2 className="section-h">Four core services,<br /><span className="serif">countless</span> glass problems solved.</h2>
          <p className="section-lede">
            Residential, commercial, emergency. We handle every kind of glass job from a single cracked pane to a full storefront.
          </p>
          <p className="services-warranty-lede">{T.warrantyLine}</p>
          <div className="svc-grid">
            {serviceFeatures.map((s, i) => (
              <div className="svc-card" key={i} onClick={() => go('services')}>
                <img src={s.img} alt={s.t} />
                <div className="overlay" />
                <div className="body">
                  <div className="num">{`0${i + 1}`} · {s.badge}</div>
                  <div className="info">
                    <h3>{s.t}</h3>
                    <div className="desc">{s.desc}</div>
                    <div className="arrow">View service <Icon.Arrow size={14} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center'}}>
            <button type="button" className="btn btn-outline btn-lg" onClick={() => go('services')}>See all 21 services <Icon.Arrow /></button>
          </div>
        </div>
      </section>

      {/* SEO CLUSTER */}
      <section className="seo-cluster">
        <div className="inner">
          <div>
            <div className="label">Popular in the GTA</div>
            <h3>High-demand<br/>local pages.</h3>
          </div>
          <div className="seo-chips">
            {[
              'Window Repair Toronto',
              'Window Repair North York',
              'Glass Replacement Toronto',
              'Window Repair Cost Guide',
              'Emergency Repair Vaughan',
              'Storefront Glass Toronto',
              'Foggy Window Repair GTA',
              'Double Pane Replacement',
            ].map(c => (
              <button type="button" className="seo-chip" key={c} onClick={() => go('services')}>
                <span className="seo-chip-label">{c}</span>
                <span className="arrow" aria-hidden><Icon.Arrow size={12} /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section reviews" id="reviews">
        <div className="section-inner">
          <div className="section-eye">
            <span className="num">04</span>
            <span>What customers say</span>
            <span className="line"></span>
          </div>
          <h2 className="section-h">Five stars, <span className="serif">five thousand</span> repairs.</h2>
          <div className="reviews-summary reviews-summary--hero">
            <div className="reviews-summary-main">
              <div className="rating-big">5.0<sub>/5</sub></div>
              <div className="reviews-stars-row">
                <span className="reviews-star-burst" aria-hidden>★★★★★</span>
                <span className="reviews-count-label">340+ verified reviews</span>
              </div>
            </div>
            <div className="platforms platforms--large">
              <div className="platform platform--google">
                <div className="platform-logo platform-logo--g" aria-hidden>
                  <Icon.Google size={28} />
                </div>
                <div className="platform-body">
                  <div className="name">Google</div>
                  <div className="val">5.0 <span className="red">★★★★★</span></div>
                </div>
              </div>
              <div className="platform platform--facebook">
                <div className="platform-logo platform-logo--f" aria-hidden>
                  <Icon.FB size={22} />
                </div>
                <div className="platform-body">
                  <div className="name">Facebook</div>
                  <div className="val">5.0 <span className="red">★★★★★</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="reviews-grid">
            {window.OMG_DATA.reviews.map((r, i) => (
              <div className="review" key={i}>
                <div className="stars">{'★'.repeat(r.stars)}</div>
                <div className="text">“{r.text}”</div>
                <div className="who">
                  <div className="avatar">{r.initials}</div>
                  <div>
                    <div className="name">{r.name}</div>
                    <div className="meta">{r.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-final" data-float-underlay="red">
        <div className="inner">
          <h2>Ready to <span className="serif">repair</span><br/>or replace your glass?</h2>
          <p>Request a free quote or call us for 24/7 emergency glass repair across Toronto and the GTA. {T.responseTimeLine}</p>
          <div className="ctas">
            <button type="button" className="btn btn-white btn-xl" onClick={() => go('contact')}>Free quote <Icon.Arrow /></button>
            <a href="tel:6478032730" data-cta-location="home-cta-final" className="btn btn-bone-out btn-xl"><Icon.Phone /> 647-803-2730</a>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { HomePage });
