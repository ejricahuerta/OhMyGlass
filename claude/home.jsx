// Home page for OhMyGlass
const { useState: useStateH, useRef: useRefH, useEffect: useEffectH } = React;

/** Default document title when the home route is active. */
var HOME_PAGE_TITLE = 'OhMyGlass | Window & Door Glass Repair | Toronto & GTA · 24/7 · Free Quote';

function kpiEaseOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/** Animates the main KPI integer from 0 to `end`; superscript suffix (e.g. K+, YRS) stays fixed. */
function KpiCountUp({ end, suffixSup, durationMs = 1650, delayMs = 0 }) {
  const [value, setValue] = useStateH(0);
  const [inView, setInView] = useStateH(false);
  const ref = useRefH(null);

  useEffectH(function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return undefined;
    }
    var el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting) continue;
          setInView(true);
          obs.disconnect();
          return;
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );
    obs.observe(el);
    return function () {
      obs.disconnect();
    };
  }, [end]);

  useEffectH(
    function () {
      if (!inView) return undefined;
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setValue(end);
        return undefined;
      }
      setValue(0);
      var rafId = 0;
      var startTs = null;
      function tick(ts) {
        if (startTs === null) startTs = ts;
        var elapsed = ts - startTs;
        if (elapsed < delayMs) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        var u = (elapsed - delayMs) / durationMs;
        if (u >= 1) {
          setValue(end);
          return;
        }
        setValue(Math.round(kpiEaseOutCubic(u) * end));
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
      return function () {
        cancelAnimationFrame(rafId);
      };
    },
    [inView, end, durationMs, delayMs]
  );

  return (
    <div className="big" ref={ref} aria-label={String(end) + (suffixSup ? ' ' + suffixSup : '')}>
      {value}
      <sup>{suffixSup}</sup>
    </div>
  );
}

function WorkFilmCard({ w, filmNum }) {
  const [playing, setPlaying] = useStateH(false);
  const vidRef = useRefH(null);

  const startPlay = () => {
    if (typeof window.OMG_trackEvent === 'function') {
      window.OMG_trackEvent('video_play', { film: w.brand, filmNum });
    }
    const el = vidRef.current;
    if (el) {
      // Call play() in the same turn as the user click so the browser keeps
      // "user activation" and allows unmuted playback (rAF can lose that).
      el.muted = false;
      el.volume = 1;
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(function () {});
    }
    setPlaying(true);
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
    <Reveal variant="card" delayMs={(filmNum - 1) * 70} className="work-item">
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
    </Reveal>
  );
}

function HomePage({ navigate }) {
  const go = (path) => {
    navigate(path);
  };
  const T = window.OMG_DATA.trust;
  const S = window.OMG_DATA.site;

  useEffectH(function () {
    document.title = HOME_PAGE_TITLE;
    var m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', S.homeHeroSub);
  }, []);

  const serviceFeatures = [
    { t: 'Window glass repair', desc: 'Cracked, broken, or foggy window panes—repaired fast, often in a single visit across the GTA.', img: 'images/glass-window.jpg', badge: 'WINDOWS' },
    { t: 'Door glass repair', desc: 'Patio, entry, and sliding doors: glass, seals, hardware, tracks, and rollers for homes and businesses.', img: 'images/glass-door.jpg', badge: 'DOORS' },
    { t: 'Storefront & commercial', desc: 'Tempered and safety glass for entrances, facades, and high-traffic door openings—same repair-first mindset.', img: 'images/local-commercial-storefront.jpg', badge: 'COMMERCIAL' },
    { t: 'Custom mirror', desc: 'Cut-to-size mirrors for bath and closet—installed with the same care as our window and door work.', img: 'images/mirror-wall.jpg', badge: 'MIRRORS' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero" id="omg-hero" aria-label="Hero">
        <div className="hero-inner">
          <div>
            <Reveal variant="text" showOnMount delayMs={0}>
              <div className="hero-kicker">
                <span className="line"></span>
                <span className="hero-kicker-full">Est. 2015 · North York, ON · 5,000+ jobs across 2,000+ GTA properties</span>
                <span className="hero-kicker-short">Est. 2015 · North York · GTA</span>
              </div>
            </Reveal>
            <Reveal variant="text" showOnMount delayMs={60}>
              <h1>
                Window &amp; door glass<br/>
                <span className="accent">We</span> <span className="red">fix it</span><br/>
                fast.
              </h1>
            </Reveal>
            <Reveal variant="text" showOnMount delayMs={120}>
              <p className="hero-sub">{S.homeHeroSub}</p>
            </Reveal>
            <Reveal variant="text" showOnMount delayMs={180}>
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
            </Reveal>
          </div>
          <div className="hero-visual hero-visual--form">
            <div className="hero-form-stack">
              <QuoteForm submitLocation="home-hero" revealOnMount revealDelayMs={140} />
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

      {/* STATS: trust metrics (after hero) */}
      <section className="stats" aria-label="OhMyGlass by the numbers">
        <div className="stats-inner">
          <Reveal variant="card" delayMs={0} className="stat">
            <KpiCountUp end={2} suffixSup="K+" delayMs={0} />
            <div className="k">GTA properties</div>
            <div className="v">Homes, condos, storefronts, and commercial sites where we have repaired or replaced window and door glass across the Greater Toronto Area.</div>
          </Reveal>
          <Reveal variant="card" delayMs={80} className="stat">
            <KpiCountUp end={10} suffixSup="YRS" delayMs={120} />
            <div className="k">Years of experience</div>
            <div className="v">Over a decade focused on window and door glass. Same local crew, same repair-first approach.</div>
          </Reveal>
          <Reveal variant="card" delayMs={160} className="stat">
            <KpiCountUp end={5} suffixSup="K+" delayMs={240} />
            <div className="k">Window &amp; door jobs</div>
            <div className="v">Completed successfully across the GTA—mostly window and door glass—saving customers 60–80% vs full replacement where repair was possible.</div>
          </Reveal>
        </div>
      </section>

      {/* OUR WORK (elevated, PRD) */}
      <section className="section work" id="work">
        <Reveal variant="section" className="section-inner">
          <div className="section-eye">
            <span className="num">01</span>
            <span>Our work</span>
            <span className="line"></span>
          </div>
          <h2 className="section-h">On-site. <span className="serif">On camera.</span></h2>
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
        </Reveal>
      </section>

      {/* WHY US */}
      <section className="section why">
        <Reveal variant="section" className="section-inner">
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
              {T.warrantyLine && String(T.warrantyLine).trim() ? <p className="why-warranty-note">{T.warrantyLine}</p> : null}
            </div>
            <div className="why-right">
              {[
                ['10+ yrs', 'A decade of GTA window & door glass', 'Specialists in window and door glass—not a general handyman shop.', 'EXPERIENCE'],
                ['24/7', 'Emergency dispatch', 'Nights, weekends, and holidays. Real humans answer.', 'AVAILABILITY'],
                ['60–80%', 'Typical customer savings', 'We repair the glass instead of selling you a whole new window or door when it makes sense.', 'COST'],
                ['FREE', 'Board-up included', 'No extra charge when booking the permanent repair with us.', 'VALUE'],
                ['5.0★', 'Google & Facebook rating', 'Hundreds of reviews from homeowners and business owners.', 'TRUST'],
                ['GTA', 'Full coverage', 'Toronto, North York, Vaughan, Markham, Mississauga + more.', 'REACH'],
              ].map((row, i) => (
                <Reveal variant="card" delayMs={i * 55} className="why-item" key={i}>
                  <div className="n">0{i + 1}</div>
                  <div className="t">{row[1]}</div>
                  <div className="k">{row[3]}</div>
                  <div className="d">{row[2]}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* SERVICE PREVIEWS */}
      <section className="section services-preview">
        <Reveal variant="section" className="section-inner">
          <div className="section-eye">
            <span className="num">03</span>
            <span>What we fix</span>
            <span className="line"></span>
          </div>
          <h2 className="section-h">Window &amp; door glass,<br /><span className="serif">done</span> right across the GTA.</h2>
          <p className="section-lede">
            Residential, commercial, and emergency. From a single cracked pane to a full storefront opening—if it is window or door glass, that is our focus.
          </p>
          {T.warrantyLine && String(T.warrantyLine).trim() ? <p className="services-warranty-lede">{T.warrantyLine}</p> : null}
          <div className="svc-grid">
            {serviceFeatures.map((s, i) => (
              <Reveal variant="card" delayMs={i * 65} className="svc-card" key={i} onClick={() => go('/services')}>
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
              </Reveal>
            ))}
          </div>
          <div style={{textAlign:'center'}}>
            <button type="button" className="btn btn-outline btn-lg" onClick={() => go('/services')}>
              See all services <Icon.Arrow />
            </button>
          </div>
        </Reveal>
      </section>

      {/* SEO CLUSTER */}
      <section className="seo-cluster">
        <Reveal variant="section" className="inner">
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
              <button type="button" className="seo-chip" key={c} onClick={() => go('/services')}>
                <span className="seo-chip-label">{c}</span>
                <span className="arrow" aria-hidden><Icon.Arrow size={12} /></span>
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* REVIEWS */}
      <section className="section reviews" id="reviews">
        <Reveal variant="section" className="section-inner">
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
              <Reveal variant="card" delayMs={i * 50} className="review" key={i}>
                <div className="stars">{'★'.repeat(r.stars)}</div>
                <div className="text">“{r.text}”</div>
                <div className="who">
                  <div className="avatar">{r.initials}</div>
                  <div>
                    <div className="name">{r.name}</div>
                    <div className="meta">{r.meta}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="cta-final" data-float-underlay="red">
        <Reveal variant="section" className="inner">
          <h2>Ready to <span className="serif">repair</span><br/>your window or door glass?</h2>
          <p>Request a free quote or call us for 24/7 emergency window and door glass repair across Toronto and the GTA. {T.responseTimeLine}</p>
          <div className="ctas">
            <button type="button" className="btn btn-white btn-xl" onClick={() => go('/contact')}>
              Free quote <Icon.Arrow />
            </button>
            <a href={window.OMG_DATA.contact.phoneHref} data-cta-location="home-cta-final" className="btn btn-bone-out btn-xl">
              <Icon.Phone /> {window.OMG_DATA.contact.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

Object.assign(window, { HomePage });
