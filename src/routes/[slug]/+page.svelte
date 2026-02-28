<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={metaDescription} />
  <meta name="keywords" content={Array.isArray(data.page.seo?.keywords) ? data.page.seo.keywords.join(', ') : ''} />
  <meta property="og:title" content={data.page.title} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:image" content="https://ohmyglass.ca/images/og-image.jpg" />
  <meta property="fb:app_id" content="966242223397117" />
  <meta property="og:site_name" content="OhMyGlass" />
  <meta property="og:url" content="https://ohmyglass.ca/{data.slug}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content="https://ohmyglass.ca/images/og-image.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_CA" />
  <link rel="canonical" href="https://ohmyglass.ca/{data.slug}" />
  <!-- BreadcrumbList on all inner pages -->
  <script type="application/ld+json">
    {JSON.stringify(breadcrumbSchema)}
  </script>
  {#if data.slug === 'glass-repair-vs-replacement'}
    <script type="application/ld+json">
      {JSON.stringify(articleSchema)}
    </script>
  {/if}
  {#if data.page.type === 'service'}
    <script type="application/ld+json">
      {JSON.stringify(serviceSchema)}
    </script>
  {/if}
  {#if faqSchema.mainEntity.length > 0}
    <script type="application/ld+json">
      {JSON.stringify(faqSchema)}
    </script>
  {/if}
</svelte:head>

<script>
  import ServiceArea from '$lib/components/ServiceArea.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ContentPageForm from '$lib/components/ContentPageForm.svelte';
  import { contact } from '$lib/site-data.js';
  import { getBreadcrumbSchema, getServiceSchema, getFAQPageSchema } from '$lib/schema.js';

  /** @type {{ page: { title: string; type?: string; seo?: { meta_description?: string; keywords?: string[] }; pagecontent: string; service_area_locations?: Array<{ name: string; slug: string }>; sections?: Array<{ heading: string; level?: number; content?: string; list?: string[] }> }; slug: string }} */
  export let data;

  const isServiceAreasPage = data.slug === 'service-areas';
  const isResource = data.page.type === 'resource';
  const hasSections = Array.isArray(data.page.sections) && data.page.sections.length > 0;

  // BreadcrumbList: Home > ... > current page
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: data.page.title.replace(/\s*[-–|]\s*OhMyGlass[^]*$/i, '').trim(), url: `/${data.slug}` }
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

  // Title max 60 chars for SERP; meta description max 160
  const rawTitle = data.page.title || '';
  const pageTitle = rawTitle.length > 60 ? rawTitle.slice(0, 57) + '...' : rawTitle;
  const rawMeta = data.page.seo?.meta_description ?? data.page.title ?? '';
  const metaDescription = rawMeta.length > 160 ? rawMeta.slice(0, 157) + '...' : rawMeta;

  const articleSchema = data.slug === 'glass-repair-vs-replacement' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.page.title.replace(/ - OhMyGlass\.ca$| – OhMyGlass\.ca$| - OhMyGlass$| – OhMyGlass$| \| OhMyGlass$/i, '').trim(),
    description: data.page.seo?.meta_description ?? data.page.title,
    url: `https://ohmyglass.ca/${data.slug}`,
    author: { '@type': 'Organization', name: 'OhMyGlass', url: 'https://ohmyglass.ca', telephone: '+16478032730', areaServed: 'Greater Toronto Area' },
    datePublished: '2025-02-24',
    dateModified: '2025-02-24',
    publisher: { '@type': 'Organization', name: 'OhMyGlass', url: 'https://ohmyglass.ca' }
  } : null;

  const serviceSchema = data.page.type === 'service' ? getServiceSchema({
    name: data.page.title,
    description: data.page.seo?.meta_description ?? data.page.title,
    url: `/${data.slug}`
  }) : null;

  // FAQPage: sections whose heading is a question (ends with ?)
  const faqQuestions = (data.page.sections || [])
    .filter((s) => s.heading && (s.heading.trim().endsWith('?') || s.heading.trim().startsWith('What ') || s.heading.trim().startsWith('How ') || s.heading.trim().startsWith('Why ') || s.heading.trim().startsWith('When ') || s.heading.trim().startsWith('Which ')))
    .slice(0, 10)
    .map((s) => ({
      '@type': 'Question',
      name: s.heading,
      acceptedAnswer: { '@type': 'Answer', text: [s.content, s.list?.join(' ')].filter(Boolean).join(' ') || s.heading }
    }));
  const faqSchema = getFAQPageSchema(faqQuestions);

  // Resource -> relevant service page for internal linking
  const RESOURCE_SERVICE_LINKS = {
    'how-to-tell-if-window-seal-is-broken': { href: '/foggy-window-repair', label: 'Foggy window repair' },
    'foggy-double-pane-windows-repair-vs-replace': { href: '/foggy-window-repair', label: 'Foggy window repair' },
    'emergency-glass-repair-toronto-what-to-expect': { href: '/emergency-glass-repair', label: 'Emergency glass repair' },
    'window-glass-replacement-cost-gta': { href: '/window-glass-replacement', label: 'Window glass replacement' },
    'storefront-glass-repair-toronto-business-owners': { href: '/storefront-glass-repair', label: 'Storefront glass repair' },
    'glass-repair-vs-replacement': { href: '/window-glass-replacement', label: 'Window glass replacement' }
  };
  const resourceServiceLink = isResource ? (RESOURCE_SERVICE_LINKS[data.slug] || null) : null;

  // Location page: slug is {service}-{location}, e.g. emergency-glass-repair-brampton
  const LOCATION_SUFFIXES = ['brampton', 'etobicoke', 'markham', 'north-york', 'richmond-hill', 'scarborough', 'toronto', 'vaughan', 'mississauga'];
  const SERVICE_BASES = ['emergency-glass-repair', 'storefront-glass-repair', 'window-glass-replacement'];
  const LOCATION_DISPLAY_NAMES = {
    brampton: 'Brampton', etobicoke: 'Etobicoke', markham: 'Markham', 'north-york': 'North York',
    'richmond-hill': 'Richmond Hill', scarborough: 'Scarborough', toronto: 'Toronto', vaughan: 'Vaughan', mississauga: 'Mississauga'
  };
  const SERVICE_LABELS = {
    'emergency-glass-repair': 'Emergency glass repair',
    'storefront-glass-repair': 'Storefront glass repair',
    'window-glass-replacement': 'Window glass replacement'
  };
  let locationPageInfo = null;
  for (const base of SERVICE_BASES) {
    const prefix = base + '-';
    if (data.slug.startsWith(prefix)) {
      const locationSuffix = data.slug.slice(prefix.length);
      if (LOCATION_SUFFIXES.includes(locationSuffix)) {
        const otherBases = SERVICE_BASES.filter((b) => b !== base);
        locationPageInfo = {
          cityName: LOCATION_DISPLAY_NAMES[locationSuffix] || locationSuffix,
          otherLinks: otherBases.map((b) => ({ slug: b + '-' + locationSuffix, label: SERVICE_LABELS[b] }))
        };
        break;
      }
    }
  }
  const isLocationPage = locationPageInfo !== null;

  // Generic service page (emergency, storefront, window replacement) has location-specific pages – show area links
  const isGenericServiceWithAreas = SERVICE_BASES.includes(data.slug);
  const genericServiceAreaLinks = isGenericServiceWithAreas
    ? LOCATION_SUFFIXES.map((suffix) => ({ name: LOCATION_DISPLAY_NAMES[suffix] || suffix, slug: data.slug + '-' + suffix }))
    : [];

  // For most pages: split pagecontent into paragraphs. For service-areas we use a single intro line instead.
  // When sections exist, we still use pagecontent as intro only (single block or split).
  const paragraphs = isServiceAreasPage
    ? []
    : (data.page.pagecontent ? data.page.pagecontent.split(/\n\n+/).filter((p) => p.trim()) : []);

  const serviceAreasIntro =
    'We provide expert glass repair and replacement across the Greater Toronto Area.';
</script>

<main class="py-16">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 {isResource ? '' : 'lg:grid-cols-2'} gap-12">
      <div class="prose prose-lg max-w-none">
        {#if isResource}
          <a href="/resources" class="inline-block text-[#d32f2f] font-semibold hover:underline mb-6">← Resources</a>
        {/if}
        <nav class="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <a href="/" class="text-[#d32f2f] font-semibold hover:underline">Home</a>
          <span class="mx-2">/</span>
          {#if isLocationPage}
            <a href="/services" class="text-[#d32f2f] font-semibold hover:underline">Services</a>
            <span class="mx-2">/</span>
            <a href="/service-areas" class="text-[#d32f2f] font-semibold hover:underline">Service areas</a>
            <span class="mx-2">/</span>
          {:else if isResource}
            <a href="/resources" class="text-[#d32f2f] font-semibold hover:underline">Resources</a>
            <span class="mx-2">/</span>
          {/if}
          <span class="text-gray-800">{data.page.title.replace(/\s*[-–|]\s*OhMyGlass[^]*$/i, '').trim()}</span>
        </nav>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          {data.page.title.replace(' - OhMyGlass.ca', '').replace(' – OhMyGlass.ca', '').replace(' - OhMyGlass', '').replace(' – OhMyGlass', '').replace(' | OhMyGlass', '')}
        </h1>

        {#if isServiceAreasPage}
          <p class="text-gray-700 text-lg mb-8">{serviceAreasIntro}</p>
          <ServiceArea showHeading={false} embed={true} />
          <div class="mt-10">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Our location & the GTA</h2>
            <p class="text-gray-600 mb-4">OhMyGlass is based in North York and serves the Greater Toronto Area. View our location on the map.</p>
            <div class="rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-white">
              <iframe
                title="OhMyGlass location and Greater Toronto Area"
                src={contact.googleMapsEmbedGtaSrc}
                width="100%"
                height="400"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p class="mt-3 text-sm text-gray-500">
              <a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" class="text-[#d32f2f] hover:underline">Open in Google Maps</a>
            </p>
          </div>
        {:else if hasSections}
          <div class="text-gray-700 space-y-6">
            {#each paragraphs as p}
              <p>{p}</p>
            {/each}
            {#each data.page.sections as section}
              {#if section.heading}
                {#if section.level === 3}
                  <h3 class="text-xl font-semibold text-gray-800 mt-8 mb-2">{section.heading}</h3>
                {:else}
                  <h2 class="text-2xl font-semibold text-gray-800 mt-10 mb-2">{section.heading}</h2>
                {/if}
              {/if}
              {#if section.content}
                <p>{section.content}</p>
              {/if}
              {#if section.list && section.list.length > 0}
                <ul class="list-disc pl-6 space-y-2">
                  {#each section.list as item}
                    <li>{item}</li>
                  {/each}
                </ul>
              {/if}
            {/each}
          </div>
        {:else}
          <div class="text-gray-700 space-y-6">
            {#each paragraphs as p}
              <p>{p}</p>
            {/each}
          </div>
        {/if}

        {#if genericServiceAreaLinks.length > 0}
          <div class="mt-10 pt-8 border-t border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Areas we serve</h2>
            <p class="text-gray-600 mb-3">This service is available in:</p>
            <ul class="flex flex-wrap gap-2">
              {#each genericServiceAreaLinks as link}
                <li><a href="/{link.slug}" class="text-[#d32f2f] font-semibold hover:underline">{link.name}</a></li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if isResource}
          <p class="mt-10 pt-8 border-t border-gray-200">
            {#if resourceServiceLink}
              <a href={resourceServiceLink.href} class="text-[#d32f2f] font-semibold hover:underline">{resourceServiceLink.label}</a>
              <span class="text-gray-600"> · </span>
            {/if}
            <a href="/#contact-form" class="text-[#d32f2f] font-semibold hover:underline">Get a free quote</a>
            <span class="text-gray-600"> · </span>
            <a href="/resources" class="text-[#d32f2f] font-semibold hover:underline">Back to Resources</a>
          </p>
        {/if}
        {#if isLocationPage && locationPageInfo}
          <p class="mt-10 pt-8 border-t border-gray-200 text-gray-700">
            Other services in {locationPageInfo.cityName}:
            {#each locationPageInfo.otherLinks as link, i}
              <a href="/{link.slug}" class="text-[#d32f2f] font-semibold hover:underline">{link.label}</a>{i < locationPageInfo.otherLinks.length - 1 ? ', ' : ''}
            {/each}
          </p>
        {/if}
      </div>
      {#if !isResource}
        <ContentPageForm formTitle="OhMyGlass Free Quote" />
      {/if}
    </div>
  </div>
</main>

{#if !isServiceAreasPage && !isResource}
  <section class="bg-[#f5f7fa] py-6 text-center">
    <p class="text-gray-600">
      Serving the Greater Toronto Area.
      <a href="/service-areas" class="text-[#d32f2f] font-semibold hover:underline">View Service Areas</a>
    </p>
  </section>
{/if}
<Footer serviceLinksOrder="default" />
