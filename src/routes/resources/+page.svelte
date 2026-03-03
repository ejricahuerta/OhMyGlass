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
  import { withInternalUtm } from '$lib/site-data.js';

  /** @type {{ page: { title: string; seo?: { meta_description?: string; keywords?: string[] } }; resources: Array<{ url: string; title: string; seo: { meta_description: string } }> }} */
  export let data;
</script>

<main class="py-16">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Resources</h1>
      <p class="text-lg text-gray-700 max-w-2xl mx-auto">
        Helpful information and guides for glass repair and replacement in the Greater Toronto Area.
      </p>
    </div>

    {#if data.resources && data.resources.length > 0}
      <div class="grid grid-cols-1 gap-8 w-full">
        {#each data.resources as resource}
          <a
            href={withInternalUtm(`/${resource.url}`, 'resources')}
            class="block p-6 bg-white/80 backdrop-blur-lg shadow-lg rounded-xl border border-white/20 hover:shadow-xl hover:border-[#d32f2f]/30 transition-all"
          >
            <h2 class="text-xl font-bold text-gray-800 mb-2">
              {resource.title.replace(' - OhMyGlass.ca', '').replace(' – OhMyGlass.ca', '').replace(' - OhMyGlass', '').replace(' – OhMyGlass', '').replace(' | OhMyGlass', '')}
            </h2>
            <p class="text-gray-600 text-sm">
              {resource.seo?.meta_description ?? resource.title}
            </p>
            <span class="inline-block mt-3 text-[#d32f2f] font-semibold">Read more →</span>
          </a>
        {/each}
      </div>
    {:else}
      <div class="prose prose-lg max-w-none text-gray-700 text-center">
        <p>More guides and articles will be added here soon.</p>
      </div>
    {/if}
  </div>
</main>

<Footer serviceLinksOrder="index" />
