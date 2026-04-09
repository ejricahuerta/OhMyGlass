<script>
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { afterNavigate } from '$app/navigation';
  import { dev } from '$app/environment';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import posthog from 'posthog-js';
  import { page } from '$app/stores';
  import { PUBLIC_GOOGLE_TAG_MANAGER_ID, PUBLIC_POSTHOG_KEY } from '$env/static/public';
  import Header from '$lib/components/Header.svelte';
  import FloatingCallButton from '$lib/components/FloatingCallButton.svelte';
  import { showQuoteInNav, showFloatingCallButton } from '$lib/nav-state.js';
  import { PHONE_STORE_KEY } from '$lib/phone-context.js';
  import { getActivePhone } from '$lib/phone-schedule.js';

  /** @type {import('./$types').LayoutData} */
  export let data;

  const phoneFallback = () => getActivePhone(new Date());
  const phoneStore = writable(data?.activePhone ?? phoneFallback());
  $: phoneStore.set(data?.activePhone ?? phoneFallback());
  setContext(PHONE_STORE_KEY, phoneStore);

  const FONT_AWESOME_URL =
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';

  $: isHome = $page.url.pathname === '/';
  $: bodyClass = isHome
    ? 'relative min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#f5f7fa] overflow-x-hidden'
    : 'relative min-h-screen bg-[#f5f7fa] overflow-x-hidden';
  $: ctaLabel = isHome ? 'Free Quote' : 'Get a Free Quote';

  function loadTallyEmbeds() {
    if (typeof window === 'undefined') return;
    if (window.Tally) {
      window.Tally.loadEmbeds();
      return;
    }
    document
      .querySelectorAll('iframe[data-tally-src]:not([src])')
      .forEach((iframeEl) => {
        const src = iframeEl.getAttribute('data-tally-src');
        if (src) iframeEl.setAttribute('src', src);
      });
  }

  afterNavigate(() => {
    requestAnimationFrame(() => {
      loadTallyEmbeds();
    });
    if (PUBLIC_POSTHOG_KEY && typeof posthog?.capture === 'function') {
      posthog.capture('$pageview', { $current_url: $page.url.href });
    }
  });

  onMount(() => {
    const syncPhone = () => phoneStore.set(getActivePhone(new Date()));
    syncPhone();
    const phoneInterval = setInterval(syncPhone, 60_000);

    // Load Font Awesome after hydration to avoid head reconciliation issues (fixes hydration removeAttribute error)
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = FONT_AWESOME_URL;
    faLink.media = 'all';
    document.head.appendChild(faLink);

    loadTallyEmbeds();
    const retry = setTimeout(() => {
      loadTallyEmbeds();
    }, 500);
    try {
      injectAnalytics({ mode: dev ? 'development' : 'production' });
    } catch (_) {
      // Analytics may fail in validators, ad-blockers, or strict environments
    }

    if (PUBLIC_GOOGLE_TAG_MANAGER_ID) {
      try {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', PUBLIC_GOOGLE_TAG_MANAGER_ID);
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GOOGLE_TAG_MANAGER_ID}`;
        document.head.appendChild(script);
      } catch (_) {
        // gtag may fail in validators or ad-blockers
      }
    }

    const heroSection = document.getElementById('hero');
    function isMobile() {
      return typeof window !== 'undefined' && window.innerWidth < 768;
    }
    function isHeroVisible() {
      if (!heroSection) return false;
      const rect = heroSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      return rect.top < windowHeight && rect.bottom > 0;
    }
    function updateNav() {
      const heroVisible = isHeroVisible();
      if (isMobile()) {
        showQuoteInNav.set(heroVisible);
        showFloatingCallButton.set(!heroVisible);
      } else {
        showQuoteInNav.set(true);
        showFloatingCallButton.set(true);
      }
    }
    updateNav();
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateNav();
          ticking = false;
        });
        ticking = true;
      }
    });
    window.addEventListener('resize', updateNav);
    return () => {
      clearTimeout(retry);
      clearInterval(phoneInterval);
    };
  });
</script>

<svelte:head>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/style.css" />
  <noscript>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
  </noscript>
  <script src="https://tally.so/widgets/embed.js" defer></script>
</svelte:head>

<div class={bodyClass}>
  <Header ctaLabel={ctaLabel} />
  <slot />
  <FloatingCallButton />
</div>
