// Main app shell for OhMyGlass
const { useState: useStateApp, useEffect: useEffectApp } = React;

// TWEAK DEFAULTS — edit-mode persisted
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "urgencyIntensity": 3
}/*EDITMODE-END*/;

function App() {
  const [page, setPage] = useStateApp(() => {
    try { return localStorage.getItem('omg_page') || 'home'; } catch { return 'home'; }
  });
  const [tweaks, setTweaks] = useStateApp(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useStateApp(false);

  useEffectApp(() => {
    try { localStorage.setItem('omg_page', page); } catch {}
  }, [page]);

  // Apply urgency as CSS var
  useEffectApp(() => {
    document.documentElement.style.setProperty('--urgency', String(tweaks.urgencyIntensity));
  }, [tweaks.urgencyIntensity]);

  // Edit-mode protocol
  useEffectApp(() => {
    const handler = (ev) => {
      if (!ev.data) return;
      if (ev.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (ev.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const updateTweak = (k, v) => {
    setTweaks(t => {
      const next = { ...t, [k]: v };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
      return next;
    });
  };

  let PageComp;
  if (page === 'services') PageComp = ServicesPage;
  else if (page === 'emergency') PageComp = EmergencyPage;
  else if (page === 'contact') PageComp = ContactPage;
  else PageComp = HomePage;

  return (
    <div data-screen-label={`OhMyGlass · ${page}`}>
      <Nav page={page} setPage={setPage} urgency={tweaks.urgencyIntensity} />
      <PageComp setPage={setPage} />
      <Footer setPage={setPage} />
      <FloatCall />
      <TweaksPanel open={tweaksOpen} tweaks={tweaks} update={updateTweak} onClose={() => setTweaksOpen(false)} />
    </div>
  );
}

function TweaksPanel({ open, tweaks, update, onClose }) {
  if (!open) return null;
  const level = tweaks.urgencyIntensity;
  const labels = ['', 'Subtle', 'Reserved', 'Balanced', 'Assertive', 'Loud'];
  return (
    <div className="tweaks-panel open">
      <div className="tweaks-head">
        <h4>Tweaks</h4>
        <button className="close" onClick={onClose}><Icon.X size={16}/></button>
      </div>
      <div className="tweaks-body">
        <div className="tweak-row">
          <label>
            <span>Urgency intensity</span>
            <span className="val">{level} · {labels[level]}</span>
          </label>
          <input type="range" min="1" max="5" step="1" value={level}
                 className="slider"
                 onChange={(e) => update('urgencyIntensity', Number(e.target.value))} />
          <div className="ticks"><span>SUBTLE</span><span></span><span></span><span></span><span>LOUD</span></div>
        </div>
        <div style={{fontSize:11, lineHeight:1.5, opacity:0.55, fontFamily:'JetBrains Mono, monospace', marginTop:12, paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          Controls the presence of the 24/7 emergency bar, red accents, and urgency messaging across the whole site.
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
