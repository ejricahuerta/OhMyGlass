<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { inject } from '@vercel/analytics';
  import { page } from '$app/stores';
  import Header from '$lib/components/Header.svelte';
  import FloatingCallButton from '$lib/components/FloatingCallButton.svelte';
  import { showQuoteInNav, showFloatingCallButton } from '$lib/nav-state.js';

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
  });

  onMount(() => {
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
      inject();
    } catch (_) {
      // Analytics may fail in validators, ad-blockers, or strict environments
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
