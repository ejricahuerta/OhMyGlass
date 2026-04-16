<script>
  import { navLinks, withInternalUtm } from '$lib/site-data.js';
  import ActiveContact from '$lib/components/ActiveContact.svelte';
  import { showQuoteInNav } from '$lib/nav-state.js';

  /** @type {string} - "Free Quote" or "Get a Free Quote" */
  export let ctaLabel = 'Free Quote';

  let showQuote = true;
  const unsub = showQuoteInNav.subscribe((v) => (showQuote = v));

  import { onMount } from 'svelte';
  onMount(() => () => unsub());

  function closeMenu() {
    const menu = document.getElementById('navbar-menu');
    const body = document.body;
    if (menu) menu.classList.remove('is-active');
    if (body) body.classList.remove('menu-is-active');
  }

  function openMenu() {
    const menu = document.getElementById('navbar-menu');
    const body = document.body;
    if (menu) menu.classList.add('is-active');
    if (body) body.classList.add('menu-is-active');
  }
</script>

<header class="sticky top-0 w-full z-50 bg-white/50 backdrop-blur-md shadow-none">
  <nav class="container mx-auto flex justify-between items-center py-4 px-6">
    <a href={withInternalUtm('/', 'nav')}>
      <picture>
        <source srcset="/images/logo.webp" type="image/webp" />
        <img
          src="/images/logo.png"
          alt="OhMyGlass Logo"
          class="h-16 w-auto drop-shadow"
          width="288"
          height="64"
        />
      </picture>
    </a>
    <div class="flex items-center gap-8">
      <div
        id="navbar-menu"
        class="gap-8 text-[#1a1a1a] font-semibold md:static top-full left-0 w-full md:w-auto bg-[#f5f7fa] md:bg-transparent shadow md:shadow-none md:flex md:flex-row items-center md:items-center transition-all duration-300 z-40 flex flex-col md:flex-row"
      >
        <button
          id="close-menu-button"
          class="md:hidden self-end p-4"
          type="button"
          onclick={closeMenu}
          aria-label="Close menu"
        >
          <i class="fas fa-times"></i>
        </button>
        <ul class="flex flex-col md:flex-row gap-0 md:gap-8 w-full md:w-auto py-4 md:py-0">
          {#each navLinks as link}
            <li>
              <a
                href={link.href}
                class="hover:text-[#d32f2f] block py-4 md:py-0"
                onclick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      {#if showQuote}
        <a
          href="#contact-form"
          class="inline-block bg-[#d32f2f]/90 backdrop-blur-md text-white px-4 md:px-8 py-2 md:py-3 font-bold text-sm md:text-base shadow-lg hover:bg-[#b71c1c]/90 transition-all duration-300 border border-white/20 rounded-3xl"
        >
          {ctaLabel}
        </a>
      {:else}
        <ActiveContact let:phone let:phoneHref let:afterHoursPhone let:afterHoursPhoneHref>
          <div class="flex flex-col items-end gap-0.5 text-right">
            <a
              href={phoneHref}
              class="inline-block text-[#1a1a1a] font-semibold text-sm md:text-base hover:text-[#d32f2f] transition-colors duration-300"
            >
              {phone}
            </a>
            <a
              href={afterHoursPhoneHref}
              class="inline-block text-[#1a1a1a]/80 font-medium text-xs md:text-sm hover:text-[#d32f2f] transition-colors duration-300"
            >
              After hours: {afterHoursPhone}
            </a>
          </div>
        </ActiveContact>
      {/if}
      <button
        id="mobile-menu-button"
        class="md:hidden text-2xl text-[#1a1a1a]"
        type="button"
        onclick={openMenu}
        aria-label="Open menu"
      >
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </nav>
</header>
