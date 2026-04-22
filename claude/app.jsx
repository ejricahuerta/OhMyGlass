// Main app shell: pathname routing + pages.json content
const { useState: useStateApp, useEffect: useEffectApp, useCallback: useCallbackApp, useRef: useRefApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  urgencyIntensity: 3,
}/*EDITMODE-END*/;

function computeRoute() {
  var raw = window.location.pathname || '/';
  var path = raw.replace(/\/$/, '') || '/';
  var slug = path === '/' ? '' : path.replace(/^\//, '');

  if (slug && window.OMG_PAGES && window.OMG_PAGES.length && typeof window.OMG_getCanonicalSlugIfLocationFirst === 'function') {
    var can = window.OMG_getCanonicalSlugIfLocationFirst(slug);
    if (can) {
      window.history.replaceState({}, '', '/' + can);
      path = '/' + can;
      slug = can;
    }
  }

  if (path === '/') return { view: 'home', path };
  if (path === '/services') return { view: 'services', path };
  if (path === '/contact' || path === '/free-quote') return { view: 'contact', path };
  if (path === '/resources') return { view: 'resources', path };
  if (path === '/emergency-glass-repair') return { view: 'emergency', path };

  if (!window.OMG_PAGES || !window.OMG_PAGES.length) {
    return { view: 'loading', path, slug };
  }
  var page = typeof window.OMG_getPageBySlug === 'function' ? window.OMG_getPageBySlug(slug) : null;
  if (page) return { view: 'content', slug: window.OMG_urlToSlug(page.url), path };
  return { view: '404', slug, path };
}

function NotFoundPage({ navigate }) {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>We couldn’t find that page. Try the home page or our window and door glass services.</p>
      <button type="button" className="btn btn-red btn-lg" onClick={() => navigate('/')}>
        Back to home <Icon.Arrow />
      </button>
    </div>
  );
}

function App() {
  const [route, setRoute] = useStateApp(computeRoute);
  const [tweaks, setTweaks] = useStateApp(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useStateApp(false);
  const setRouteRef = useRefApp(setRoute);

  setRouteRef.current = setRoute;

  const navigate = useCallbackApp(function (to) {
    var url = new URL(to, window.location.origin);
    window.history.pushState({}, '', url.pathname + url.search + url.hash);
    setRouteRef.current(computeRoute());
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffectApp(function () {
    var apply = function () {
      setRouteRef.current(computeRoute());
    };
    var onReady = function () {
      apply();
    };
    var onPop = function () {
      apply();
    };
    if (window.OMG_PAGES && window.OMG_PAGES.length) apply();
    else window.addEventListener('omg-pages-ready', onReady);
    window.addEventListener('popstate', onPop);
    var t = window.setTimeout(apply, 0);
    return function () {
      window.clearTimeout(t);
      window.removeEventListener('omg-pages-ready', onReady);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  useEffectApp(function () {
    window.OMG_navigate = function (to, opts) {
      var url = new URL(to, window.location.origin);
      if (opts && opts.replace) window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      else window.history.pushState({}, '', url.pathname + url.search + url.hash);
      setRouteRef.current(computeRoute());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    return function () {
      delete window.OMG_navigate;
    };
  }, []);

  useEffectApp(function () {
    try {
      window.localStorage.setItem('omg_path', route.path);
    } catch (e) {}
  }, [route.path]);

  useEffectApp(function () {
    if (route.view !== 'home') return;
    var h = window.location.hash;
    if (h === '#reviews') {
      var t = window.setTimeout(function () {
        document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
      return function () {
        window.clearTimeout(t);
      };
    }
    return undefined;
  }, [route.view, route.path]);

  useEffectApp(function () {
    const onDocClick = function (e) {
      var sms = e.target.closest('a[href^="sms:"][data-cta-location]');
      if (sms && typeof window.OMG_trackEvent === 'function') {
        window.OMG_trackEvent('sms_click', { location: sms.getAttribute('data-cta-location') || '' });
        return;
      }
      var tel = e.target.closest('a[href^="tel:"][data-cta-location]');
      if (tel && typeof window.OMG_trackEvent === 'function') {
        window.OMG_trackEvent('phone_click', { location: tel.getAttribute('data-cta-location') || '' });
      }
    };
    document.addEventListener('click', onDocClick);
    return function () {
      document.removeEventListener('click', onDocClick);
    };
  }, []);

  useEffectApp(function () {
    document.documentElement.style.setProperty('--urgency', String(tweaks.urgencyIntensity));
  }, [tweaks.urgencyIntensity]);

  useEffectApp(function () {
    var handler = function (ev) {
      if (!ev.data) return;
      if (ev.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (ev.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return function () {
      window.removeEventListener('message', handler);
    };
  }, []);

  var updateTweak = function (k, v) {
    setTweaks(function (t) {
      var next = { ...t, [k]: v };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
      return next;
    });
  };

  var PageComp;
  var pageLabel = route.path;
  if (route.view === 'loading') {
    PageComp = function LoadingScreen() {
      return <div className="app-loading">Loading site…</div>;
    };
    pageLabel = 'loading';
  } else if (route.view === 'home') {
    PageComp = HomePage;
  } else if (route.view === 'services') {
    PageComp = ServicesPage;
  } else if (route.view === 'contact') {
    PageComp = ContactPage;
  } else if (route.view === 'resources') {
    PageComp = ResourcesPage;
  } else if (route.view === 'emergency') {
    PageComp = EmergencyPage;
    pageLabel = 'emergency';
  } else if (route.view === 'content') {
    PageComp = function ContentPageWrap() {
      return <ContentPage slug={route.slug} navigate={navigate} />;
    };
    pageLabel = route.slug || route.path;
  } else {
    PageComp = function NotFoundWrap() {
      return <NotFoundPage navigate={navigate} />;
    };
    pageLabel = '404';
  }

  return (
    <div data-screen-label={'OhMyGlass · ' + pageLabel}>
      <Nav route={route} navigate={navigate} urgency={tweaks.urgencyIntensity} />
      <PageComp navigate={navigate} route={route} />
      <Footer navigate={navigate} />
      <FloatCall route={route} />
      <TweaksPanel open={tweaksOpen} tweaks={tweaks} update={updateTweak} onClose={() => setTweaksOpen(false)} />
    </div>
  );
}

function TweaksPanel({ open, tweaks, update, onClose }) {
  if (!open) return null;
  var level = tweaks.urgencyIntensity;
  var labels = ['', 'Subtle', 'Reserved', 'Balanced', 'Assertive', 'Loud'];
  return (
    <div className="tweaks-panel open">
      <div className="tweaks-head">
        <h4>Tweaks</h4>
        <button type="button" className="close" onClick={onClose}>
          <Icon.X size={16} />
        </button>
      </div>
      <div className="tweaks-body">
        <div className="tweak-row">
          <label>
            <span>Urgency intensity</span>
            <span className="val">
              {level} · {labels[level]}
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={level}
            className="slider"
            onChange={function (e) {
              update('urgencyIntensity', Number(e.target.value));
            }}
          />
          <div className="ticks">
            <span>SUBTLE</span>
            <span />
            <span />
            <span />
            <span>LOUD</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            lineHeight: 1.5,
            opacity: 0.55,
            fontFamily: 'JetBrains Mono, monospace',
            marginTop: 12,
            paddingTop: 12,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          Controls the presence of the 24/7 emergency bar, red accents, and urgency messaging across the whole site.
        </div>
      </div>
    </div>
  );
}

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
