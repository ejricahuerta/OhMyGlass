<svelte:head>
  <title>{data.page.title}</title>
  <meta name="description" content={data.page.seo?.meta_description ?? data.page.title} />
  <meta name="keywords" content={Array.isArray(data.page.seo?.keywords) ? data.page.seo.keywords.join(', ') : ''} />
  <meta property="og:title" content={data.page.title} />
  <meta property="og:description" content={data.page.seo?.meta_description ?? data.page.title} />
  <meta property="og:image" content={ogImage} />
  <meta property="fb:app_id" content="966242223397117" />
  <meta property="og:site_name" content="OhMyGlass" />
  <meta property="og:url" content={siteUrl + '/services'} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Expert Glass Repair Services Toronto & GTA" />
  <meta name="twitter:description" content={data.page.seo?.meta_description ?? data.page.title} />
  <meta name="twitter:image" content={ogImage} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_CA" />
  <link rel="canonical" href={siteUrl + '/services'} />
</svelte:head>

<script>
  import Footer from '$lib/components/Footer.svelte';
  import ActiveContact from '$lib/components/ActiveContact.svelte';
  import { getServicesByCategory } from '$lib/service-cards.js';
  import { withInternalUtm, siteUrl, ogImage } from '$lib/site-data.js';

  /** @type {{ page: { title: string; seo?: { meta_description?: string; keywords?: string[] } }; serviceAreaLocations: Array<{ name: string; slug: string }> }} */
  export let data;

  const locations = data.serviceAreaLocations ?? [];
  const serviceGroups = getServicesByCategory();
</script>

<main class="min-h-screen">
  <!-- Hero -->
  <section class="relative bg-gradient-to-b from-neutral-800 to-neutral-900 text-white pt-20 pb-16 md:pt-24 md:pb-20 px-4 overflow-hidden">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d32f2f]/30 to-transparent"></div>
    </div>
    <div class="container mx-auto relative z-10 max-w-4xl">
      <p class="text-sm uppercase tracking-widest text-neutral-300 mb-3">Our services</p>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
        Expert Glass Repair<br class="hidden sm:inline" /> Toronto & GTA
      </h1>
      <p class="text-lg md:text-xl text-neutral-200 max-w-2xl">
        Professional glass repair specialists. We repair cracked, broken, and foggy glass – saving you 60–80% vs replacement. 24/7 emergency service available.
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <ActiveContact let:phoneHref>
          <a
            href={phoneHref}
            class="inline-flex items-center gap-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-semibold px-6 py-3 rounded-2xl transition-colors"
          >
            <i class="fa-solid fa-phone"></i>
            Call 24/7
          </a>
        </ActiveContact>
        <a
          href="/free-quote"
          class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-2xl border border-white/20 transition-colors"
        >
          Get a free quote
        </a>
      </div>
    </div>
  </section>

  <!-- Services by category -->
  <section class="py-14 md:py-20 bg-[#f5f7fa]">
    <div class="container mx-auto px-4">
      {#each serviceGroups as { key, label, cards }}
        <div class="mb-16 last:mb-0">
          <h2 class="text-xl font-semibold uppercase tracking-wider text-neutral-600 mb-6 pl-1">
            {label}
          </h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 list-none p-0 m-0">
            {#each cards as card}
              <li class="flex">
                <a
                  href={card.href}
                  class="group flex flex-col h-full w-full bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/80 hover:border-[#d32f2f]/30 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d32f2f]/50 focus:ring-offset-2"
                >
                  <div class="flex-1 min-h-0">
                    <div class="flex items-center gap-3 mb-3">
                      <span
                        class="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg {key === 'emergency'
                          ? 'bg-[#d32f2f]/10 text-[#d32f2f]'
                          : 'bg-neutral-100 text-neutral-600 group-hover:bg-[#d32f2f]/10 group-hover:text-[#d32f2f] transition-colors'}"
                        aria-hidden="true"
                      >
                        {#if card.icon}
                          <i class="fa-solid {card.icon}"></i>
                        {:else}
                          <i class="fa-solid fa-screwdriver-wrench"></i>
                        {/if}
                      </span>
                      <div class="min-w-0 flex-1 flex flex-wrap items-center gap-2">
                        {#if card.badge}
                          <span
                            class="text-xs font-semibold px-2 py-0.5 rounded-full {key === 'emergency'
                              ? 'bg-[#d32f2f] text-white'
                              : 'bg-neutral-200 text-neutral-700'}">{card.badge}</span>
                        {/if}
                        <h3 class="text-lg font-bold text-neutral-900 group-hover:text-[#d32f2f] transition-colors">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                    <p class="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                      {card.description}
                    </p>
                  </div>
                  <span class="inline-flex items-center gap-1 mt-auto pt-4 text-sm font-semibold text-[#d32f2f] group-hover:gap-2 transition-all">
                    Learn more
                    <i class="fa-solid fa-arrow-right text-xs"></i>
                  </span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <!-- Services by area -->
  {#if locations.length > 0}
    <section class="py-14 md:py-20 bg-white border-t border-neutral-200">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">Services by area</h2>
        <p class="text-neutral-600 max-w-xl mx-auto mb-8">
          We serve the Greater Toronto Area. Select your area for local emergency glass repair and more.
        </p>
        <nav class="flex flex-wrap gap-3 justify-center" aria-label="Service areas">
          {#each locations as loc}
            <a
              href={withInternalUtm(`/${loc.slug}`, 'services')}
              class="inline-flex items-center px-5 py-2.5 bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#d32f2f]/50 focus:ring-offset-2"
            >
              {loc.name}
            </a>
          {/each}
        </nav>
      </div>
    </section>
  {/if}

  <!-- CTA strip -->
  <section class="py-10 md:py-12 bg-neutral-800 text-white">
    <div class="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
      <p class="text-lg font-semibold m-0">
        Need help now? We're available 24/7 for emergency glass repair.
      </p>
      <ActiveContact let:phone let:phoneHref>
        <a
          href={phoneHref}
          class="inline-flex items-center gap-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold px-6 py-3 rounded-2xl transition-colors whitespace-nowrap"
        >
          <i class="fa-solid fa-phone"></i>
          {phone}
        </a>
      </ActiveContact>
    </div>
  </section>
</main>

<Footer serviceLinksOrder="index" />
