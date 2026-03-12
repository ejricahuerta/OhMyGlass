<svelte:head>
  <title>{data.page.title}</title>
  <meta name="description" content={data.page.seo?.meta_description ?? data.page.title} />
  <meta name="keywords" content={Array.isArray(data.page.seo?.keywords) ? data.page.seo.keywords.join(', ') : ''} />
  <meta property="og:title" content={data.page.title} />
  <meta property="og:description" content={data.page.seo?.meta_description ?? data.page.title} />
  <meta property="og:image" content="https://ohmyglass.ca/images/og-image.jpg" />
  <meta property="fb:app_id" content="966242223397117" />
  <meta property="og:site_name" content="OhMyGlass" />
  <meta property="og:url" content="https://ohmyglass.ca/resources" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.page.title} />
  <meta name="twitter:description" content={data.page.seo?.meta_description ?? data.page.title} />
  <meta name="twitter:image" content="https://ohmyglass.ca/images/og-image.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_CA" />
  <link rel="canonical" href="https://ohmyglass.ca/resources" />
</svelte:head>

<script>
  import Footer from '$lib/components/Footer.svelte';
  import { withInternalUtm, contact } from '$lib/site-data.js';

  /** @type {{ page: { title: string; seo?: { meta_description?: string; keywords?: string[] } }; resources: Array<{ url: string; title: string; seo: { meta_description: string } }> }} */
  export let data;

  function cleanTitle(title) {
    return title
      .replace(/\s*[-–|]\s*OhMyGlass\.ca$/i, '')
      .replace(/\s*[-–|]\s*OhMyGlass$/i, '')
      .trim();
  }

  const resources = data.resources ?? [];
</script>

<main class="min-h-screen">
  <!-- Hero -->
  <section class="relative bg-gradient-to-b from-neutral-800 to-neutral-900 text-white pt-20 pb-16 md:pt-24 md:pb-20 px-4 overflow-hidden">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d32f2f]/30 to-transparent"></div>
    </div>
    <div class="container mx-auto relative z-10 max-w-4xl">
      <p class="text-sm uppercase tracking-widest text-neutral-300 mb-3">Learn</p>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
        Resources
      </h1>
      <p class="text-lg md:text-xl text-neutral-200 max-w-2xl">
        Helpful guides and information for glass repair and replacement in the Greater Toronto Area.
      </p>
      <div class="mt-8">
        <a
          href="/#contact-form"
          class="inline-flex items-center gap-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-semibold px-6 py-3 rounded-2xl transition-colors"
        >
          Get a free quote
        </a>
      </div>
    </div>
  </section>

  <!-- Resource list -->
  <section class="py-14 md:py-20 bg-[#f5f7fa]">
    <div class="container mx-auto px-4">
      {#if resources.length > 0}
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 list-none p-0 m-0 max-w-5xl">
          {#each resources as resource}
            <li class="flex">
              <a
                href={withInternalUtm(`/${resource.url}`, 'resources')}
                class="group flex flex-col h-full w-full bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/80 hover:border-[#d32f2f]/30 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d32f2f]/50 focus:ring-offset-2"
              >
                <div class="flex-1 min-h-0">
                  <span
                    class="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg bg-neutral-100 text-neutral-600 group-hover:bg-[#d32f2f]/10 group-hover:text-[#d32f2f] transition-colors mb-4"
                    aria-hidden="true"
                  >
                    <i class="fa-solid fa-file-lines"></i>
                  </span>
                  <h2 class="text-lg font-bold text-neutral-900 group-hover:text-[#d32f2f] transition-colors mb-2">
                    {cleanTitle(resource.title)}
                  </h2>
                  <p class="text-neutral-600 text-sm leading-relaxed">
                    {resource.seo?.meta_description ?? resource.title}
                  </p>
                </div>
                <span class="inline-flex items-center gap-1 mt-auto pt-4 text-sm font-semibold text-[#d32f2f] group-hover:gap-2 transition-all">
                  Read more
                  <i class="fa-solid fa-arrow-right text-xs"></i>
                </span>
              </a>
            </li>
          {/each}
        </ul>
      {:else}
        <div class="max-w-xl mx-auto text-center py-12">
          <span class="inline-flex w-14 h-14 rounded-2xl bg-neutral-200 text-neutral-500 items-center justify-center mb-4">
            <i class="fa-solid fa-folder-open text-xl"></i>
          </span>
          <p class="text-neutral-600 text-lg">More guides and articles will be added here soon.</p>
          <a
            href="/#contact-form"
            class="inline-flex items-center gap-2 mt-6 text-[#d32f2f] font-semibold hover:underline"
          >
            Get a free quote
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div>
      {/if}
    </div>
  </section>

  <!-- CTA strip -->
  <section class="py-10 md:py-12 bg-neutral-800 text-white">
    <div class="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
      <p class="text-lg font-semibold m-0">
        Need glass repair or replacement? We serve the GTA with 24/7 emergency service.
      </p>
      <a
        href={contact.phoneHref}
        class="inline-flex items-center gap-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold px-6 py-3 rounded-2xl transition-colors whitespace-nowrap"
      >
        <i class="fa-solid fa-phone"></i>
        {contact.phone}
      </a>
    </div>
  </section>
</main>

<Footer serviceLinksOrder="index" />
