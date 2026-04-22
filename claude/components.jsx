// Shared UI components for OhMyGlass
const { useState, useEffect, useLayoutEffect, useRef, useId } = React;

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
  Google: ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  ),
  FB: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.602 21.5v-7.234h2.426l.364-2.815h-2.79V9.396c0-.814.225-1.369 1.395-1.369h1.488v-2.52c-.26-.035-1.154-.112-2.196-.112-2.174 0-3.662 1.326-3.662 3.755v2.085H8.5v2.815h2.203V21.5h2.899z"
      />
    </svg>
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
  if (variant === 'contact-link') {
    return (
      <div className="sms-quote-block sms-quote-block--contact-link">
        <a href={href} data-cta-location={location}>
          {S.phoneDisplay}
        </a>
        <span className="sub">{S.smsHelper}</span>
      </div>
    );
  }
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
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Emergency', path: '/emergency-glass-repair' },
  { label: 'Service Areas', path: '/service-areas' },
  { label: 'Reviews', path: '/', hash: '#reviews' },
  { label: 'Contact', path: '/contact' },
];

function navItemIsActive(route, item) {
  if (item.hash) return false;
  if (item.path === '/') return route.view === 'home';
  return route.path === item.path;
}

function Nav({ route, navigate, urgency }) {
  const onHome = route.view === 'home';
  const [pastHero, setPastHero] = useState(() => !onHome);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuCloseRef = useRef(null);
  const hamburgerRef = useRef(null);
  const hadMenuOpenRef = useRef(false);
  const atHero = onHome && !pastHero;
  useEffect(() => {
    if (!onHome) {
      setPastHero(true);
      setScrolled(window.scrollY > 20);
      const onScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const readPastHero = () => {
      const hero = document.getElementById('omg-hero');
      const navEl = navRef.current;
      if (!hero || !navEl) {
        setPastHero(false);
        return;
      }
      const heroBottom = hero.getBoundingClientRect().bottom;
      const navBottom = navEl.getBoundingClientRect().bottom;
      setPastHero(heroBottom <= navBottom + 0.5);
    };
    const onScrollOrResize = () => {
      readPastHero();
      setScrolled(window.scrollY > 20);
    };
    const raf = requestAnimationFrame(() => {
      readPastHero();
      onScrollOrResize();
    });
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [onHome, route.path]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
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
  const navTo = (item) => {
    setMenuOpen(false);
    if (item.hash) {
      navigate(item.path + item.hash);
      window.setTimeout(() => {
        document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } else {
      navigate(item.path);
    }
  };
  const C = window.OMG_DATA.contact;
  return (
    <>
      <EmergencyBar urgency={urgency} />
      <nav ref={navRef} className={`nav${atHero ? ' nav--hero' : ''}${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a
            className="brand"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navTo(NAV_ITEMS[0]);
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src={atHero ? 'assets/logo-on-dark.png' : 'assets/logo.png'} alt="OhMyGlass" />
          </a>
          <div className="nav-links">
            {NAV_ITEMS.map((it, i) => (
              <button type="button" key={i} className={navItemIsActive(route, it) ? 'active' : ''} onClick={() => navTo(it)}>
                {it.label}
              </button>
            ))}
          </div>
          <div className="nav-cta">
            <a
              href={C.phoneHref}
              className="nav-phone"
              data-cta-location="nav-desktop"
              aria-label={`Call ${C.phone} · 24/7 dispatch`}
            >
              <Icon.Phone size={22} />
              <span className="nav-phone-num">{C.phone}</span>
            </a>
            <button type="button" className="btn btn-red" onClick={() => navigate('/contact')}>
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
          <img src="assets/logo-on-dark.png" alt="OhMyGlass" />
          <button type="button" ref={mobileMenuCloseRef} className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <Icon.X size={24} />
          </button>
        </div>
        <div className="mobile-menu-links">
          {NAV_ITEMS.map((it, i) => (
            <button type="button" key={i} className={navItemIsActive(route, it) ? 'active' : ''} onClick={() => navTo(it)}>
              <span>{it.label}</span>
              <span className="arr">
                <Icon.Arrow size={16} />
              </span>
            </button>
          ))}
        </div>
        <div className="mobile-menu-cta">
          <a href={C.phoneHref} className="btn btn-red" data-cta-location="nav-mobile-menu">
            <Icon.Phone /> 24/7 · {C.phone}
          </a>
          <button type="button" className="btn btn-bone-out" onClick={() => navigate('/contact')}>
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
      <a href={window.OMG_DATA.contact.phoneHref} data-cta-location="emergency-bar">
        {window.OMG_DATA.contact.phone}
      </a>
      {level >= 3 && (
        <>
          <span className="sep">·</span>
          <a href={window.OMG_DATA.contact.afterHoursPhoneHref} data-cta-location="emergency-bar-alt" aria-label={'After hours, ' + window.OMG_DATA.contact.afterHoursPhone}>
            {window.OMG_DATA.contact.afterHoursPhone}
          </a>
        </>
      )}
    </div>
  );
}

// ============== FOOTER ==============
function Footer({ navigate }) {
  const C = window.OMG_DATA.contact;
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="brand-col footer-col footer-col--brand">
            <img className="footer-logo" src="assets/logo-on-dark.png" alt="OhMyGlass" />
            <div className="footer-trust-badge" aria-label="Credentials">
              {window.OMG_DATA.trust.licensedBadge}
            </div>
            <p>Window and door glass repair and replacement across Toronto and the GTA. 10+ years, 5,000+ jobs, 24/7 emergency. We repair glass when possible, replace only when necessary.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={C.instagram} style={{ width: 36, height: 36, border: '1px solid rgba(245,242,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                <Icon.IG />
              </a>
              <a href={C.facebook} style={{ width: 36, height: 36, border: '1px solid rgba(245,242,236,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                <Icon.FB />
              </a>
            </div>
          </div>
          <div className="footer-col footer-col--services">
            <h4>Services</h4>
            <ul>
              {window.OMG_DATA.servicesForFooter.map((s, i) => (
                <li key={i}>
                  <a
                    href={s[1]}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(s[1]);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {s[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col footer-col--areas">
            <h4>Service areas</h4>
            <p className="footer-areas-lede">
              <a
                href="/service-areas"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/service-areas');
                }}
                style={{ cursor: 'pointer' }}
              >
                GTA coverage map & dispatch →
              </a>
            </p>
            <ul className="footer-area-list">
              {(window.OMG_DATA.serviceAreaCitiesList || []).map((name, i) => (
                <li key={i}>
                  <a
                    href="/service-areas"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/service-areas');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col footer-col--contact">
            <h4>Contact</h4>
            <div className="contact-info">
              <div className="item">
                <strong>Main · 24/7</strong>
                <a href={C.phoneHref} data-cta-location="footer">
                  {C.phone}
                </a>
              </div>
              <div className="item">
                <strong>After hours</strong>
                <a href={C.afterHoursPhoneHref} data-cta-location="footer-alt">
                  {C.afterHoursPhone}
                </a>
              </div>
              <div className="item">
                <strong>Email</strong>
                <a href={C.emailHref}>{C.email}</a>
                {C.secondaryEmail ? (
                  <>
                    <br />
                    <a href={C.secondaryEmailHref}>{C.secondaryEmail}</a>
                    <span style={{ display: 'block', fontSize: '0.85em', opacity: 0.85 }}>Secondary</span>
                  </>
                ) : null}
              </div>
              <div className="item">
                <strong>Shop</strong>
                {C.streetLines[0]}
                <br />
                {C.streetLines[1]}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 OHMYGLASS. ALL RIGHTS RESERVED</div>
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
function FloatCall({ route = { path: '' } }) {
  const [visible, setVisible] = useState(false);
  const [onRedBg, setOnRedBg] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('omg-float-call-visible', visible);
    return () => document.documentElement.classList.remove('omg-float-call-visible');
  }, [visible]);

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
  }, [visible, route.path]);

  const C = window.OMG_DATA.contact;
  return (
    <a
      ref={ref}
      href={C.phoneHref}
      data-cta-location="float-call"
      className={`float-call${visible ? ' visible' : ''}${onRedBg ? ' on-red-bg' : ''}`}
      aria-label="Call 24/7"
    >
      <span className="dot"></span>
      <Icon.Phone size={16} />
      <span className="fc-label">Call 24/7</span>
    </a>
  );
}

// ============== REVEAL (scroll / mount) ==============
function Reveal({
  as: Tag = 'div',
  variant = 'text',
  className = '',
  delayMs = 0,
  showOnMount = false,
  once = true,
  children,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const mergedStyle = {
    ...(style || {}),
    ...(delayMs ? { '--reveal-delay': delayMs + 'ms' } : {}),
  };
  const vClass =
    'reveal reveal--' +
    variant +
    (visible ? ' is-visible' : '') +
    (className ? ' ' + className : '');

  useEffect(
    function () {
      if (showOnMount) {
        var id = requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            setVisible(true);
          });
        });
        return function () {
          cancelAnimationFrame(id);
        };
      }
      var el = ref.current;
      if (!el) return undefined;
      if (typeof IntersectionObserver === 'undefined') {
        setVisible(true);
        return undefined;
      }
      var obs = new IntersectionObserver(
        function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            setVisible(true);
            if (once) {
              obs.disconnect();
              return;
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      obs.observe(el);
      return function () {
        obs.disconnect();
      };
    },
    [showOnMount, once]
  );

  return (
    <Tag ref={ref} className={vClass} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}

// ============== QUOTE FORM ==============
var QUOTE_MAX_PHOTOS = 6;
var QUOTE_MAX_PHOTO_BYTES = 12 * 1024 * 1024;

function QuoteForm({ compact = false, submitLocation, revealOnMount = false, revealDelayMs = 0 }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', postalCode: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [humanModalOpen, setHumanModalOpen] = useState(false);
  const [humanConfirmed, setHumanConfirmed] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoErr, setPhotoErr] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const fileInputRef = useRef(null);
  const honeypotId = useId();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(
    function () {
      if (!humanModalOpen) return undefined;
      document.body.style.overflow = 'hidden';
      const onKey = function (ev) {
        if (ev.key === 'Escape') {
          setHumanModalOpen(false);
          setHumanConfirmed(false);
        }
      };
      window.addEventListener('keydown', onKey);
      return function () {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    },
    [humanModalOpen]
  );

  function revokePhotoUrls(list) {
    list.forEach(function (p) {
      if (p.url) try { URL.revokeObjectURL(p.url); } catch (e) { /* ignore */ }
    });
  }

  function onPhotoChange(ev) {
    var files = Array.from(ev.target.files || []);
    ev.target.value = '';
    var err = '';
    setPhotos(function (prev) {
      var next = prev.slice();
      for (var i = 0; i < files.length; i++) {
        if (next.length >= QUOTE_MAX_PHOTOS) {
          err = 'Maximum ' + QUOTE_MAX_PHOTOS + ' photos.';
          break;
        }
        var f = files[i];
        if (!/^image\//.test(f.type)) {
          err = 'Only image files (JPG, PNG, WebP, HEIC, etc.).';
          continue;
        }
        if (f.size > QUOTE_MAX_PHOTO_BYTES) {
          err = 'Each photo must be 12 MB or smaller.';
          continue;
        }
        var id = 'p-' + Date.now() + '-' + i + '-' + Math.random().toString(36).slice(2, 9);
        next.push({ id: id, file: f, url: URL.createObjectURL(f) });
      }
      queueMicrotask(function () {
        setPhotoErr(err);
      });
      return next;
    });
  }

  function removePhoto(id) {
    setPhotos(function (prev) {
      var out = [];
      for (var i = 0; i < prev.length; i++) {
        if (prev[i].id === id) {
          if (prev[i].url) try { URL.revokeObjectURL(prev[i].url); } catch (e) { /* ignore */ }
        } else out.push(prev[i]);
      }
      return out;
    });
    setPhotoErr('');
  }

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (!/^[\d\s\-\(\)\+]{7,}$/.test(form.phone)) e.phone = 'Invalid phone';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.postalCode.trim()) e.postalCode = 'Required';
    else {
      var pc = form.postalCode.replace(/\s+/g, '').toUpperCase();
      if (!/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\d[ABCEGHJ-NPRSTV-Z]\d$/.test(pc)) {
        e.postalCode = 'Enter a valid Canadian postal code (e.g. M5V 2T6)';
      }
    }
    if (!form.service) e.service = 'Pick one';
    return e;
  };

  function finalizeQuoteSubmit() {
    if (typeof window.OMG_trackEvent === 'function') {
      var bytes = 0;
      for (var j = 0; j < photos.length; j++) bytes += photos[j].file.size;
      window.OMG_trackEvent('quote_form_submit', {
        location: submitLocation || (compact ? 'compact' : 'contact'),
        photoCount: photos.length,
        photoTotalBytes: bytes,
        humanModalConfirmed: true,
        hasPostalCode: !!String(form.postalCode || '').trim(),
      });
    }
    revokePhotoUrls(photos);
    setPhotos([]);
    setHumanModalOpen(false);
    setHumanConfirmed(false);
    setSubmitted(true);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (honeypot.trim()) {
      setSubmitted(true);
      return;
    }
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setHumanConfirmed(false);
    setHumanModalOpen(true);
  };
  const field = (k) => ({
    value: form[k],
    onChange: (ev) => setForm(f => ({ ...f, [k]: ev.target.value })),
  });

  if (loading) return (
    <Reveal variant="form" showOnMount={revealOnMount} delayMs={revealDelayMs}>
      <div className="form-wrap" style={{minHeight: 480, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{display:'flex', flexDirection:'column', gap:16, alignItems:'center'}}>
          <div style={{width:32, height:32, border:'3px solid #ECE8E0', borderTop:'3px solid #E5322D', borderRadius:'50%', animation:'spin 1s linear infinite'}}></div>
          <div className="mono" style={{fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#6b7280'}}>Loading form…</div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Reveal>
  );

  if (submitted) return (
    <Reveal variant="form" showOnMount={revealOnMount} delayMs={revealDelayMs}>
      <div className="form-success">
        <div className="check"><Icon.Check size={28}/></div>
        <h3>Quote request received.</h3>
        <p>Thanks {form.name.split(' ')[0] || 'friend'}. We've got it. For emergencies, our dispatch team prioritizes your message and reaches out as soon as possible. Otherwise expect a text or email within 2 business hours.</p>
          <div style={{display:'flex', gap:12, marginTop: 8}}>
          <a href={window.OMG_DATA.contact.phoneHref} className="btn btn-red" data-cta-location="form-success">
            Or call now · {window.OMG_DATA.contact.phone}
          </a>
        </div>
      </div>
    </Reveal>
  );

  return (
    <Reveal variant="form" showOnMount={revealOnMount} delayMs={revealDelayMs}>
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
        <div className="form-row">
          <div className={`field${errors.email ? ' error' : ''}`}>
            <label>Email <span className="req">*</span></label>
            <input type="email" {...field('email')} placeholder="you@example.com" />
            {errors.email && <span className="err-msg">{errors.email}</span>}
          </div>
          <div className={`field${errors.postalCode ? ' error' : ''}`}>
            <label>Postal code <span className="req">*</span></label>
            <input
              type="text"
              inputMode="text"
              autoComplete="postal-code"
              spellCheck={false}
              maxLength={7}
              {...field('postalCode')}
              placeholder="M5V 2T6"
            />
            {errors.postalCode && <span className="err-msg">{errors.postalCode}</span>}
          </div>
        </div>
        <div className={`field${errors.service ? ' error' : ''}`} style={{ marginBottom: 12 }}>
          <label>Service needed <span className="req">*</span></label>
          <select {...field('service')}>
            <option value="">Select…</option>
            <option>Emergency window or door glass (24/7)</option>
            <option>Window glass repair</option>
            <option>Window glass replacement</option>
            <option>Foggy / sealed unit (window)</option>
            <option>Storefront or commercial door/window glass</option>
            <option>Shower glass (non-door specialty)</option>
            <option>Patio / sliding door glass</option>
            <option>Custom mirror</option>
            <option>Other</option>
          </select>
          {errors.service && <span className="err-msg">{errors.service}</span>}
        </div>
        <div className="field" style={{marginBottom: 16}}>
          <label>What happened? (optional)</label>
          <textarea {...field('message')} placeholder="e.g. 'Double-pane kitchen window cracked overnight, about 36×48 inches, second floor.'" />
        </div>
        <div className="field field-photos" style={{ marginBottom: 16 }}>
          <label>
            Photos of the damage <span className="field-opt">(optional · up to {QUOTE_MAX_PHOTOS} · 12 MB each)</span>
          </label>
          <div className="photo-upload-actions">
            <button type="button" className="btn btn-outline photo-choose-btn" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
              Choose photos…
            </button>
            <span className="photo-upload-hint mono">JPG, PNG, WebP, HEIC</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            className="field-file-input"
            onChange={onPhotoChange}
            aria-label="Upload photos of the damage"
          />
          {photoErr ? <span className="err-msg">{photoErr}</span> : null}
          {photos.length > 0 ? (
            <ul className="photo-preview-list" aria-live="polite">
              {photos.map(function (p) {
                return (
                  <li key={p.id} className="photo-preview-item">
                    <img src={p.url} alt="" />
                    <button type="button" className="photo-preview-remove" onClick={() => removePhoto(p.id)} aria-label="Remove photo">
                      <Icon.X size={14} />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        <div className="field-honeypot" aria-hidden="true">
          <label htmlFor={honeypotId}>Business reference</label>
          <input
            id={honeypotId}
            name="biz_ref"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(ev) => setHoneypot(ev.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-red btn-lg form-submit">
          Get my free quote <Icon.Arrow />
        </button>
      </form>
      {humanModalOpen ? (
        <div
          className="human-verify-backdrop"
          role="presentation"
          onClick={function () {
            setHumanModalOpen(false);
            setHumanConfirmed(false);
          }}
        />
      ) : null}
      {humanModalOpen ? (
        <div
          className="human-verify-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="human-verify-title"
        >
          <button
            type="button"
            className="human-verify-close"
            aria-label="Close"
            onClick={function () {
              setHumanModalOpen(false);
              setHumanConfirmed(false);
            }}
          >
            <Icon.X size={22} />
          </button>
          <h4 id="human-verify-title" className="human-verify-title">
            One quick step
          </h4>
          <p className="human-verify-copy">
            Help us keep spam out. Confirm you are a real person before we send your quote.
          </p>
          <label className="human-verify-check">
            <input
              type="checkbox"
              checked={humanConfirmed}
              onChange={function (ev) {
                setHumanConfirmed(ev.target.checked);
              }}
            />
            <span>I am human and want to submit this quote request.</span>
          </label>
          <div className="human-verify-actions">
            <button
              type="button"
              className="btn btn-bone-out"
              onClick={function () {
                setHumanModalOpen(false);
                setHumanConfirmed(false);
              }}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-red" disabled={!humanConfirmed} onClick={finalizeQuoteSubmit}>
              Send my quote <Icon.Arrow />
            </button>
          </div>
        </div>
      ) : null}
    </div>
    </Reveal>
  );
}

function splitDisplayTitleForPageHero(displayTitle) {
  var t = String(displayTitle || '');
  var seps = [' | ', ' · ', ' – '];
  for (var i = 0; i < seps.length; i++) {
    var ix = t.indexOf(seps[i]);
    if (ix !== -1) {
      return {
        primary: t.slice(0, ix).trim(),
        secondary: t.slice(ix + seps[i].length).trim(),
      };
    }
  }
  return { primary: t, secondary: null };
}

function PageHeroPhones({ ctaMain, ctaAlt }) {
  var C = window.OMG_DATA.contact;
  var mainLoc = ctaMain || 'page-hero';
  var altLoc = ctaAlt || 'page-hero-alt';
  return (
    <div className="phones">
      <div className="phone-grp">
        <div className="k">24/7 Main line</div>
        <a href={C.phoneHref} data-cta-location={mainLoc} className="v">
          {(() => {
            var p = C.phone.split('-');
            return (
              <>
                <span className="red">{p[0]}-</span>
                {p.slice(1).join('-')}
              </>
            );
          })()}
        </a>
      </div>
      <div className="phone-grp">
        <div className="k">After hours</div>
        <a href={C.afterHoursPhoneHref} data-cta-location={altLoc} className="v">
          {C.afterHoursPhone}
        </a>
      </div>
    </div>
  );
}

/** Services / content / resources: bone page-hero with quote form on the right (home-style grid). */
function PageHeroWithQuoteForm({
  eye,
  displayTitle,
  titleContent,
  sub,
  submitLocation,
  phonesCtaMain,
  phonesCtaAlt,
  revealOnMount = true,
  heroRevealDelayMs = 0,
  quoteFormRevealDelayMs = 120,
}) {
  var T = window.OMG_DATA.trust;
  var parts = titleContent ? null : splitDisplayTitleForPageHero(displayTitle);
  var h1El = titleContent ? (
    <h1>{titleContent}</h1>
  ) : parts.secondary ? (
    <h1>
      {parts.primary}
      <br />
      <span className="serif">{parts.secondary}</span>
    </h1>
  ) : (
    <h1>{parts.primary}</h1>
  );

  var trustText = [String(T.warrantyLine || '').trim(), String(T.insuranceLine || '').trim()]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <section className="page-hero">
      <div className="inner page-hero-inner--with-form">
        <Reveal
          variant="text"
          showOnMount={revealOnMount}
          delayMs={heroRevealDelayMs}
          className="page-hero-main"
        >
          <div className="eye">{eye}</div>
          {h1El}
          <p className="sub">{sub}</p>
          {trustText ? <p className="page-hero-trust">{trustText}</p> : null}
          <PageHeroPhones ctaMain={phonesCtaMain} ctaAlt={phonesCtaAlt} />
        </Reveal>
        <div className="hero-visual hero-visual--form page-hero-form-col">
          <div className="hero-form-stack">
            <QuoteForm
              submitLocation={submitLocation}
              revealOnMount={revealOnMount}
              revealDelayMs={quoteFormRevealDelayMs}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Detail panel for “Services by area” (services page + service content pages). */
function ServicesAreaDetailBody({ area: a, navigate, dispatchCtaLocation }) {
  var C = window.OMG_DATA.contact;
  var ctaLoc = dispatchCtaLocation || 'services-area';
  return (
    <>
      <div className="k">Now viewing · {a.name}</div>
      <h3>Emergency window &amp; door glass repair in {a.name}</h3>
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
        <a href={C.phoneHref} data-cta-location={ctaLoc} className="btn btn-red">
          Dispatch to {a.name} · {C.phone}
        </a>
        <button type="button" className="btn btn-bone-out" onClick={() => navigate('/contact')}>
          Free quote for {a.name}
        </button>
      </div>
    </>
  );
}

/** Safety steps after a break; reused on the emergency page and service content pages. */
function BrokenGlassSafetyChecklistSection() {
  var D = window.OMG_DATA;
  var items = D.checklist || [];
  return (
    <section className="section-plain">
      <Reveal variant="section" className="inner">
        <div className="em-section-head">
          <div>
            <div className="num">SAFETY · FIRST STEPS</div>
            <h2>
              What to do <span className="serif">while</span> you wait.
            </h2>
          </div>
          <div className="sub">
            The first few minutes after a window or door glass break are critical for safety. Follow these steps while you wait for our team to arrive.
          </div>
        </div>
        <div className="checklist">
          {items.map(function (c, i) {
            return (
              <div className="item" key={i}>
                <div className="n">STEP · {c.n}</div>
                <div className="c">
                  <strong>{c.t}</strong>
                  <p>{c.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

/** Same block as /services “Services by area” (section.areas + picker + detail). */
function ServicesByAreaSection({ navigate, dispatchCtaLocation, sectionEyeNum }) {
  var selectedState = useState(0);
  var selectedArea = selectedState[0];
  var setSelectedArea = selectedState[1];
  var D = window.OMG_DATA;
  var area = D.areas[selectedArea];
  var eyeNum = sectionEyeNum != null ? sectionEyeNum : '05';

  return (
    <section className="areas" id="areas">
      <Reveal variant="section" className="inner">
        <div className="section-eye">
          <span className="num" style={{ color: 'var(--red)' }}>
            {eyeNum}
          </span>
          <span>Services by area</span>
          <span className="line" style={{ background: 'rgba(245,242,236,0.2)' }}></span>
        </div>
        <div className="lead">
          <h2>
            We serve the
            <br />
            <span className="serif">full</span> GTA.
          </h2>
          <p className="areas-lede-copy">Choose a city for local stats and dispatch. On smaller screens, details open directly under each location.</p>
        </div>

        <div className="area-mobile-list" aria-label="Service areas, mobile list">
          {D.areas.map(function (a, i) {
            return (
              <div key={a.name} className="area-chip-wrap">
                <button
                  type="button"
                  className={'area-chip area-chip--mobile' + (selectedArea === i ? ' active' : '')}
                  id={'area-chip-m-' + i}
                  aria-expanded={selectedArea === i}
                  aria-controls={'area-detail-m-' + i}
                  onClick={() => {
                    setSelectedArea(i);
                    requestAnimationFrame(function () {
                      document.getElementById('area-detail-m-' + i)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    });
                  }}
                >
                  <div className="area-chip-main">
                    <div className="num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="name">{a.name}</div>
                    <div className="sub">
                      {a.eta} · {a.jobs} jobs
                    </div>
                  </div>
                  <span className="area-chip-expand-icon" aria-hidden>
                    <Icon.ChevronDown size={18} />
                  </span>
                </button>
                {selectedArea === i ? (
                  <div
                    id={'area-detail-m-' + i}
                    className="area-detail area-detail--under-chip"
                    role="region"
                    aria-labelledby={'area-chip-m-' + i}
                  >
                    <ServicesAreaDetailBody area={a} navigate={navigate} dispatchCtaLocation={dispatchCtaLocation} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="area-desktop-picker">
          <div className="area-chip-grid">
            {D.areas.map(function (a, i) {
              return (
                <button
                  type="button"
                  key={a.name}
                  className={'area-chip area-chip--desktop' + (selectedArea === i ? ' active' : '')}
                  onClick={() => setSelectedArea(i)}
                  aria-pressed={selectedArea === i}
                >
                  <div className="num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="name">{a.name}</div>
                  <div className="sub">
                    {a.eta} · {a.jobs} jobs
                  </div>
                </button>
              );
            })}
          </div>
          <div className="area-detail" aria-live="polite">
            <ServicesAreaDetailBody area={area} navigate={navigate} dispatchCtaLocation={dispatchCtaLocation} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, {
  Icon,
  Nav,
  Footer,
  FloatCall,
  Reveal,
  QuoteForm,
  EmergencyBar,
  SmsQuoteCta,
  splitDisplayTitleForPageHero,
  PageHeroPhones,
  PageHeroWithQuoteForm,
  BrokenGlassSafetyChecklistSection,
  ServicesByAreaSection,
});
