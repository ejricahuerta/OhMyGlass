// Shared UI components for OhMyGlass
const { useState, useEffect, useLayoutEffect, useRef } = React;

// ============== ICONS ==============
const Icon = {
  Arrow: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  Phone: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Play: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  ),
  Check: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Menu: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  ),
  X: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  IG: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  ),
  FB: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  Star: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>
  ),
  ChevronDown: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="square">
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  Message: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
};

function SmsQuoteCta({ location, variant = 'outline' }) {
  const S = window.OMG_DATA.site;
  const href = window.OMG_smsHref();
  const btnClass =
    variant === 'on-red'
      ? 'btn sms-btn sms-btn--on-red btn-xl'
      : variant === 'solid-red'
        ? 'btn btn-red btn-xl sms-btn'
        : 'btn btn-bone-out btn-xl sms-btn';
  return (
    <div className="sms-quote-block">
      <a href={href} data-cta-location={location} className={btnClass}>
        <Icon.Message size={18} /> Text us: {S.phoneDisplay}
      </a>
      <p className="sms-quote-helper">{S.smsHelper}</p>
    </div>
  );
}

// ============== NAV ==============
function Nav({ page, setPage, urgency, onOpenTweaks }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuCloseRef = useRef(null);
  const hamburgerRef = useRef(null);
  const hadMenuOpenRef = useRef(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  useEffect(() => {
    if (menuOpen) {
      hadMenuOpenRef.current = true;
      const onKey = (e) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', onKey);
      const t = requestAnimationFrame(() => mobileMenuCloseRef.current?.focus());
      return () => {
        cancelAnimationFrame(t);
        window.removeEventListener('keydown', onKey);
      };
    }
    if (hadMenuOpenRef.current) {
      hadMenuOpenRef.current = false;
      requestAnimationFrame(() => hamburgerRef.current?.focus());
    }
    return undefined;
  }, [menuOpen]);
  const go = (p, anchor) => {
    setPage(p); setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (anchor) setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };
  const navItems = [
    ['Home', 'home'],
    ['Services', 'services'],
    ['Emergency', 'emergency'],
    ['Service Areas', 'services', 'areas'],
    ['Reviews', 'home', 'reviews'],
    ['Contact', 'contact'],
  ];
  return (
    <>
      <EmergencyBar urgency={urgency} />
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="brand" onClick={() => go('home')} style={{cursor:'pointer'}}>
            <img src="assets/logo.png" alt="OhMyGlass" />
          </a>
          <div className="nav-links">
            {navItems.map((it, i) => (
              <button type="button" key={i} className={page === it[1] && !it[2] ? 'active' : ''} onClick={() => go(it[1], it[2])}>{it[0]}</button>
            ))}
          </div>
          <div className="nav-cta">
            <a href="tel:6478032730" className="nav-phone" data-cta-location="nav-desktop">
              <div>
                <div className="phone-label">24/7 dispatch</div>
                <div className="phone-num">647-803-2730</div>
              </div>
            </a>
            <button type="button" className="btn btn-red" onClick={() => go('contact')}>
              <span>Free Quote</span> <Icon.Arrow />
            </button>
            <button
              type="button"
              ref={hamburgerRef}
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="omg-mobile-nav"
            >
              <Icon.Menu size={22} />
            </button>
          </div>
        </div>
      </nav>
      <div
        id="omg-mobile-nav"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-top">
          <img src="assets/logo-dark.png" alt="OhMyGlass" />
          <button
            type="button"
            ref={mobileMenuCloseRef}
            className="mobile-menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <Icon.X size={24}/>
          </button>
        </div>
        <div className="mobile-menu-links">
          {navItems.map((it, i) => (
            <button key={i} type="button" className={page === it[1] && !it[2] ? 'active' : ''} onClick={() => go(it[1], it[2])}>
              <span>{it[0]}</span>
              <span className="arr"><Icon.Arrow size={16}/></span>
            </button>
          ))}
        </div>
        <div className="mobile-menu-cta">
          <a href="tel:6478032730" className="btn btn-red" data-cta-location="nav-mobile-menu">
            <Icon.Phone /> 24/7 · 647-803-2730
          </a>
          <button type="button" className="btn btn-bone-out" onClick={() => go('contact')}>
            Free quote <Icon.Arrow />
          </button>
        </div>
      </div>
    </>
  );
}

function EmergencyBar({ urgency }) {
  const level = Math.max(1, Math.min(5, urgency));
  if (level === 1) return null;
  const T = window.OMG_DATA.trust;
  const msg = level >= 4
    ? <>24/7 EMERGENCY · RAPID DISPATCH · BOARD-UP FREE</>
    : <>{T.responseTimeBar}</>;
  return (
    <div className={`e-bar level-${level}`}>
      <span className="dot" />
      <span>{msg}</span>
      <span className="sep">·</span>
      <a href="tel:6478032730" data-cta-location="emergency-bar">647-803-2730</a>
      {level >= 3 && (
        <>
          <span className="sep">·</span>
          <a href="tel:4375251255" data-cta-location="emergency-bar-alt" aria-label="After hours, 437-525-1255">437-525-1255</a>
        </>
      )}
    </div>
  );
}

// ============== FOOTER ==============
function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo({ top: 0 }); };
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="brand-col">
            <img className="footer-logo" src="assets/logo-dark.png" alt="OhMyGlass" />
            <div className="footer-trust-badge" aria-label="Credentials">
              {window.OMG_DATA.trust.licensedBadge}
            </div>
            <p>Expert glass repair and replacement across Toronto and the GTA. 10+ years, 5,000+ repairs, 24/7 emergency. We repair when possible, replace only when necessary.</p>
            <div style={{display:'flex', gap:'10px'}}>
              <a href="https://www.instagram.com/ohmy.glass/" style={{width:36, height:36, border:'1px solid rgba(245,242,236,0.2)', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:2}}><Icon.IG /></a>
              <a href="https://www.facebook.com/ohmy.glass.to" style={{width:36, height:36, border:'1px solid rgba(245,242,236,0.2)', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:2}}><Icon.FB /></a>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {window.OMG_DATA.servicesForFooter.slice(0, 8).map((s, i) => (
                <li key={i}><a onClick={() => go('services')} style={{cursor:'pointer'}}>{s[0]}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>More</h4>
            <ul>
              {window.OMG_DATA.servicesForFooter.slice(8).map((s, i) => (
                <li key={i}><a onClick={() => go('services')} style={{cursor:'pointer'}}>{s[0]}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div className="contact-info">
              <div className="item">
                <strong>Main · 24/7</strong>
                <a href="tel:6478032730" data-cta-location="footer">647-803-2730</a>
              </div>
              <div className="item">
                <strong>After hours</strong>
                <a href="tel:4375251255" data-cta-location="footer-alt">437-525-1255</a>
              </div>
              <div className="item">
                <strong>Email</strong>
                <a href="mailto:ohmy.glass.to@gmail.com">ohmy.glass.to@gmail.com</a>
              </div>
              <div className="item">
                <strong>Shop</strong>
                7 Benjamin Boake Trail<br />North York, ON
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 OHMYGLASS — ALL RIGHTS RESERVED</div>
          <div className="footer-bottom-trust">{window.OMG_DATA.trust.footerTrustLine}</div>
        </div>
      </div>
    </footer>
  );
}

function floatCallOverlapsRedUnderlay(floatRect) {
  const markers = document.querySelectorAll('[data-float-underlay="red"]');
  for (const el of markers) {
    const r = el.getBoundingClientRect();
    if (r.bottom <= floatRect.top || r.top >= floatRect.bottom || r.right <= floatRect.left || r.left >= floatRect.right) continue;
    return true;
  }
  return false;
}

// ============== FLOAT CALL BUTTON ==============
function FloatCall({ page = '' }) {
  const [visible, setVisible] = useState(false);
  const [onRedBg, setOnRedBg] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    const tick = () => {
      const el = ref.current;
      if (!el || !visible) {
        setOnRedBg(false);
        return;
      }
      setOnRedBg(floatCallOverlapsRedUnderlay(el.getBoundingClientRect()));
    };
    tick();
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    return () => {
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
    };
  }, [visible, page]);

  return (
    <a
      ref={ref}
      href="tel:6478032730"
      data-cta-location="float-call"
      className={`float-call${visible ? ' visible' : ''}${onRedBg ? ' on-red-bg' : ''}`}
      aria-label="Call 24/7"
    >
      <span className="dot"></span>
      <Icon.Phone size={16} />
      <span className="fc-label">Call 24/7 · 647-803-2730</span>
    </a>
  );
}

// ============== QUOTE FORM ==============
function QuoteForm({ compact = false, submitLocation }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (!/^[\d\s\-\(\)\+]{7,}$/.test(form.phone)) e.phone = 'Invalid phone';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.service) e.service = 'Pick one';
    return e;
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (typeof window.OMG_trackEvent === 'function') {
        window.OMG_trackEvent('quote_form_submit', {
          location: submitLocation || (compact ? 'compact' : 'contact'),
        });
      }
      setSubmitted(true);
    }
  };
  const field = (k) => ({
    value: form[k],
    onChange: (ev) => setForm(f => ({ ...f, [k]: ev.target.value })),
  });

  if (loading) return (
    <div className="form-wrap" style={{minHeight: 480, display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{display:'flex', flexDirection:'column', gap:16, alignItems:'center'}}>
        <div style={{width:32, height:32, border:'3px solid #ECE8E0', borderTop:'3px solid #E5322D', borderRadius:'50%', animation:'spin 1s linear infinite'}}></div>
        <div className="mono" style={{fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#6b7280'}}>Loading secure form…</div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (submitted) return (
    <div className="form-success">
      <div className="check"><Icon.Check size={28}/></div>
      <h3>Quote request received.</h3>
      <p>Thanks {form.name.split(' ')[0] || 'friend'} — we've got it. For emergencies, our dispatch team prioritizes your message and reaches out as soon as possible. Otherwise expect a text or email within 2 business hours.</p>
        <div style={{display:'flex', gap:12, marginTop: 8}}>
        <a href="tel:6478032730" className="btn btn-red" data-cta-location="form-success">Or call now · 647-803-2730</a>
      </div>
    </div>
  );

  return (
    <div className="form-wrap">
      <div className="tag">Free quote · no obligation</div>
      <h3>Tell us what broke.</h3>
      <form onSubmit={onSubmit} noValidate>
        <div className="form-row">
          <div className={`field${errors.name ? ' error' : ''}`}>
            <label>Full name <span className="req">*</span></label>
            <input type="text" {...field('name')} placeholder="Jane Doe" />
            {errors.name && <span className="err-msg">{errors.name}</span>}
          </div>
          <div className={`field${errors.phone ? ' error' : ''}`}>
            <label>Phone <span className="req">*</span></label>
            <input type="tel" {...field('phone')} placeholder="(416) 555-0199" />
            {errors.phone && <span className="err-msg">{errors.phone}</span>}
          </div>
        </div>
        <div className={`field${errors.email ? ' error' : ''}`} style={{marginBottom: 12}}>
          <label>Email <span className="req">*</span></label>
          <input type="email" {...field('email')} placeholder="you@example.com" />
          {errors.email && <span className="err-msg">{errors.email}</span>}
        </div>
        <div className={`field${errors.service ? ' error' : ''}`} style={{ marginBottom: 12 }}>
          <label>Service needed <span className="req">*</span></label>
          <select {...field('service')}>
            <option value="">— Select —</option>
            <option>Emergency glass repair (24/7)</option>
            <option>Window repair</option>
            <option>Window replacement</option>
            <option>Foggy / sealed unit</option>
            <option>Storefront / commercial</option>
            <option>Shower glass</option>
            <option>Patio / sliding door</option>
            <option>Custom mirror</option>
            <option>Other</option>
          </select>
          {errors.service && <span className="err-msg">{errors.service}</span>}
        </div>
        <div className="field" style={{marginBottom: 16}}>
          <label>What happened? (optional)</label>
          <textarea {...field('message')} placeholder="e.g. 'Double-pane kitchen window cracked overnight, about 36×48 inches, second floor.'" />
        </div>
        <button type="submit" className="btn btn-red btn-lg form-submit">
          Get my free quote <Icon.Arrow />
        </button>
        <div className="form-note">
          24/7 <a href="tel:6478032730" data-cta-location="quote-form-note" style={{color:'#E5322D', fontWeight:700}}>647-803-2730</a>
          {' · '}
          <a href="tel:4375251255" data-cta-location="quote-form-note-alt" style={{color:'#E5322D', fontWeight:700}}>437-525-1255</a> if busy.
        </div>
      </form>
    </div>
  );
}

Object.assign(window, { Icon, Nav, Footer, FloatCall, QuoteForm, EmergencyBar, SmsQuoteCta });
