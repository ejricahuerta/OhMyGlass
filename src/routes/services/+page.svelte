<svelte:head>
  <title>{data.page.title}</title>
  <meta name="description" content={data.page.seo?.meta_description ?? data.page.title} />
  <meta name="keywords" content={Array.isArray(data.page.seo?.keywords) ? data.page.seo.keywords.join(', ') : ''} />
  <meta property="og:title" content={data.page.title} />
  <meta property="og:description" content={data.page.seo?.meta_description ?? data.page.title} />
  <meta property="og:image" content="https://ohmyglass.ca/images/og-image.jpg" />
  <meta property="fb:app_id" content="966242223397117" />
  <meta property="og:site_name" content="OhMyGlass" />
  <meta property="og:url" content="https://ohmyglass.ca/services" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Expert Glass Repair Services Toronto & GTA" />
  <meta name="twitter:description" content={data.page.seo?.meta_description ?? data.page.title} />
  <meta name="twitter:image" content="https://ohmyglass.ca/images/og-image.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_CA" />
  <link rel="canonical" href="https://ohmyglass.ca/services" />
</svelte:head>

<script>
  import Footer from '$lib/components/Footer.svelte';
  import { serviceCards } from '$lib/service-cards.js';

  /** @type {{ page: { title: string; seo?: { meta_description?: string; keywords?: string[] } }; serviceAreaLocations: Array<{ name: string; slug: string }> }} */
  export let data;

  const locations = data.serviceAreaLocations ?? [];
</script>

<main class="py-16">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Expert Glass Repair Services Toronto & GTA</h1>
      <p class="text-lg text-gray-700 max-w-2xl mx-auto">
        Professional glass repair specialists serving the Greater Toronto Area. We repair cracked, broken, and foggy glass – saving you 60-80% vs replacement. 24/7 emergency glass repair available.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each serviceCards as card}
        <a
          href={card.href}
          class="flex flex-col {card.priority
            ? 'bg-red-600/20 backdrop-blur-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-red-500/30'
            : 'bg-[#f5f7fa]/40 backdrop-blur-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-white/20'}"
        >
          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center mb-2">
              {#if card.badge}
                <span class="bg-red-600 text-white text-xs px-2 py-1 rounded-full mr-2">{card.badge}</span>
              {/if}
              <h3 class="text-2xl font-bold {card.priority ? 'text-gray-800' : 'text-slate-900'} mb-2">{card.title}</h3>
            </div>
            <p class="text-gray-600 mb-4">{card.description}</p>
            <span class="font-semibold {card.priority ? 'text-red-600' : 'text-gray-700'} group-hover:underline mt-auto">Learn More →</span>
          </div>
        </a>
      {/each}
    </div>
    {#if locations.length > 0}
      <section class="mt-16 pt-12 border-t border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Services by area</h2>
        <p class="text-gray-600 text-center mb-6 max-w-xl mx-auto">We serve the Greater Toronto Area. Select your area for local emergency glass repair and more.</p>
        <ul class="flex flex-wrap gap-3 justify-center">
          {#each locations as loc}
            <li><a href="/{loc.slug}" class="inline-block px-4 py-2 bg-white/80 border border-gray-200 rounded-lg text-gray-800 hover:border-[#d32f2f] hover:text-[#d32f2f] transition-colors">{loc.name}</a></li>
          {/each}
        </ul>
      </section>
    {/if}
  </div>
</main>

<Footer serviceLinksOrder="index" />
