<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={metaDescription} />
  <meta name="keywords" content={Array.isArray(data.page.seo?.keywords) ? data.page.seo.keywords.join(', ') : ''} />
  <meta property="og:title" content={data.page.title} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:image" content={ogImage} />
  <meta property="fb:app_id" content="966242223397117" />
  <meta property="og:site_name" content="OhMyGlass" />
  <meta property="og:url" content={siteUrl + '/' + data.slug} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content={ogImage} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_CA" />
  <link rel="canonical" href={siteUrl + '/' + data.slug} />
  <!-- JSON-LD: single @graph to avoid "Duplicate field FAQPage" in Search Console -->
  {@html jsonLdGraphScriptTag}
</svelte:head>

<script>
  import ServiceArea from '$lib/components/ServiceArea.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ContentPageForm from '$lib/components/ContentPageForm.svelte';
  import { contact, withInternalUtm, siteUrl, ogImage } from '$lib/site-data.js';
  import { getBreadcrumbSchema, getServiceSchema, getFAQPageSchema, getJsonLdGraphScriptTag } from '$lib/schema.js';

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
    url: `${siteUrl}/${data.slug}`,
    author: { '@type': 'Organization', name: 'OhMyGlass', url: siteUrl, telephone: '+16478032730', areaServed: 'Greater Toronto Area' },
    datePublished: '2025-02-24',
    dateModified: '2025-02-24',
    publisher: { '@type': 'Organization', name: 'OhMyGlass', url: siteUrl }
  } : null;

  const serviceSchema = data.page.type === 'service' ? getServiceSchema({
    name: data.page.title,
    description: data.page.seo?.meta_description ?? data.page.title,
    url: `/${data.slug}`
  }) : null;

  const CUSTOM_RESOURCE_FAQ_QUESTIONS = {
    'how-to-tell-if-window-seal-is-broken': [
      {
        '@type': 'Question',
        name: 'What is actually happening when my window looks foggy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Modern windows have two or three layers of glass with a sealed gap between them for insulation. When the seal fails, outside air gets in and moisture settles permanently between the panes, creating a hazy look that cleaning will not fix.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I tell if it is a seal failure or just condensation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If fog wipes away from the inside or outside, it is normal condensation. If it stays after cleaning both surfaces, the seal is broken and the moisture is inside the glass unit.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I fix a broken window seal without replacing the whole window?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. OhMyGlass replaces only the failed glass unit while keeping your existing frame, trim, and hardware. This usually costs much less than a full window replacement.'
        }
      },
      {
        '@type': 'Question',
        name: 'When do I actually need a full window replacement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A full replacement is usually needed only when the frame is damaged, such as severe rot or warping that prevents proper window operation.'
        }
      }
    ],
    'window-glass-replacement-cost-gta': [
      {
        '@type': 'Question',
        name: 'What is the difference between glass repair and full window replacement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A glass repair replaces only the glass unit while keeping your existing frame, trim, and hardware. Full replacement is a full tear-out and is usually needed only when the frame is rotted, warped, or structurally compromised.'
        }
      },
      {
        '@type': 'Question',
        name: 'What affects the cost of window glass repair in Toronto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Main factors include job type and complexity, glass type, floor level and access, frame condition, and whether the work is scheduled or emergency.'
        }
      },
      {
        '@type': 'Question',
        name: 'Why do you not give quotes over the phone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each window is different. Dimensions, glass configuration, frame condition, and access all affect the final quote. We provide free, no-obligation on-site quotes so there are no surprises.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you charge for quotes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. We provide free quotes for glass repair and replacement jobs across Toronto and the GTA.'
        }
      }
    ]
  };

  // FAQPage: sections whose heading is a question (ends with ?)
  const faqQuestions = CUSTOM_RESOURCE_FAQ_QUESTIONS[data.slug] ?? (data.page.sections || [])
    .filter((s) => s.heading && (s.heading.trim().endsWith('?') || s.heading.trim().startsWith('What ') || s.heading.trim().startsWith('How ') || s.heading.trim().startsWith('Why ') || s.heading.trim().startsWith('When ') || s.heading.trim().startsWith('Which ')))
    .slice(0, 10)
    .map((s) => ({
      '@type': 'Question',
      name: s.heading,
      acceptedAnswer: { '@type': 'Answer', text: [s.content, s.list?.join(' ')].filter(Boolean).join(' ') || s.heading }
    }));
  const faqSchema = getFAQPageSchema(faqQuestions);

  // Single JSON-LD @graph (one script tag) to prevent duplicate FAQPage / multiple same-type blocks
  const jsonLdGraph = [
    breadcrumbSchema,
    data.slug === 'glass-repair-vs-replacement' ? articleSchema : null,
    data.page.type === 'service' ? serviceSchema : null,
    faqSchema.mainEntity.length > 0 ? faqSchema : null
  ].filter(Boolean);
  const jsonLdGraphScriptTag = getJsonLdGraphScriptTag(jsonLdGraph);

  // Resource -> relevant service page for internal linking
  const RESOURCE_SERVICE_LINKS = {
    'how-to-tell-if-window-seal-is-broken': { href: withInternalUtm('/foggy-window-repair', 'content'), label: 'Foggy window repair' },
    'foggy-double-pane-windows-repair-vs-replace': { href: withInternalUtm('/foggy-window-repair', 'content'), label: 'Foggy window repair' },
    'emergency-glass-repair-toronto-what-to-expect': { href: withInternalUtm('/emergency-glass-repair', 'content'), label: 'Emergency glass repair' },
    'window-glass-replacement-cost-gta': { href: withInternalUtm('/window-glass-replacement', 'content'), label: 'Window glass replacement' },
    'storefront-glass-repair-toronto-business-owners': { href: withInternalUtm('/storefront-glass-repair', 'content'), label: 'Storefront glass repair' },
    'glass-repair-vs-replacement': { href: withInternalUtm('/window-glass-replacement', 'content'), label: 'Window glass replacement' }
  };
  const resourceServiceLink = isResource ? (RESOURCE_SERVICE_LINKS[data.slug] || null) : null;

  // Location page: slug is {service}-{location}, e.g. emergency-glass-repair-newmarket
  const LOCATION_SUFFIXES = ['newmarket', 'etobicoke', 'markham', 'north-york', 'richmond-hill', 'scarborough', 'toronto', 'vaughan', 'mississauga'];
  const SERVICE_BASES = ['emergency-glass-repair', 'storefront-glass-repair', 'window-glass-replacement'];
  const LOCATION_DISPLAY_NAMES = {
    newmarket: 'Newmarket', etobicoke: 'Etobicoke', markham: 'Markham', 'north-york': 'North York',
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
  const serviceAreaLocations = (data.page.service_area_locations ?? []);
  const serviceAreaSectionSlugs = new Set([
    'broken-window-repair',
    'residential-window-repair',
    'foggy-window-repair',
    'commercial-glass-repair',
    'storefront-glass-repair'
  ]);
  const hasExplicitAreasSection = (data.page.sections || []).some((section) =>
    /areas?\s+we\s+serve|service\s+areas?/i.test(section.heading || '')
  );
  const shouldShowServiceAreaAboveForm =
    data.page.type === 'service' &&
    serviceAreaSectionSlugs.has(data.slug) &&
    !isGenericServiceWithAreas &&
    !hasExplicitAreasSection;

  const RELATED_PAGE_LINKS = {
    'shower-glass-repair': [
      { href: '/patio-door-repair', label: 'Patio Door Repair' },
      { href: '/door-repairs', label: 'Door Repairs' },
      { href: '/broken-window-repair', label: 'Broken Window Repair' }
    ],
    'patio-door-repair': [
      { href: '/sliding-door-repair', label: 'Sliding Door Repair' }
    ],
    'sliding-door-repair': [
      { href: '/patio-door-repair', label: 'Patio Door Repair' }
    ],
    'door-repairs': [
      { href: '/shower-glass-repair', label: 'Shower Glass Repair' },
      { href: '/patio-door-repair', label: 'Patio Door Repair' },
      { href: '/sliding-door-repair', label: 'Sliding Door Repair' }
    ],
    'residential-window-repair': [
      { href: '/window-repair-cost', label: 'Window Repair Cost Guide' }
    ],
    'foggy-window-repair': [
      { href: '/window-repair-cost', label: 'Window Repair Cost Guide' }
    ],
    'broken-window-repair': [
      { href: '/window-repair-cost', label: 'Window Repair Cost Guide' }
    ],
    'how-to-tell-if-window-seal-is-broken': [
      { href: '/foggy-window-repair', label: 'Foggy window repair' },
      { href: '/residential-window-repair', label: 'Residential window repair' },
      { href: '/window-repair-cost', label: 'Window repair cost' }
    ],
    'window-glass-replacement-cost-gta': [
      { href: '/broken-window-repair', label: 'Broken window repair' },
      { href: '/foggy-window-repair', label: 'Foggy window repair' },
      { href: '/emergency-glass-repair', label: 'Emergency glass repair' }
    ]
  };
  const relatedPageLinks = RELATED_PAGE_LINKS[data.slug] ?? [];
</script>

<main class={isServiceAreasPage ? 'min-h-screen' : 'py-16'}>
  {#if isServiceAreasPage}
    <!-- Service Areas hero -->
    <section class="relative bg-gradient-to-b from-neutral-800 to-neutral-900 text-white pt-20 pb-16 md:pt-24 md:pb-20 px-4 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d32f2f]/30 to-transparent"></div>
      </div>
      <div class="container mx-auto relative z-10 max-w-4xl">
        <p class="text-sm uppercase tracking-widest text-neutral-300 mb-3">Coverage</p>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
          Service areas
        </h1>
        <p class="text-lg md:text-xl text-neutral-200 max-w-2xl">
          {serviceAreasIntro} Select your area for local emergency glass repair, window replacement, and more.
        </p>
      </div>
    </section>
  {/if}

  <div class="container mx-auto px-4 {isServiceAreasPage ? 'py-14 md:py-20' : ''}">
    <div class="grid grid-cols-1 {isResource ? '' : 'lg:grid-cols-2'} gap-12">
      <div class="prose prose-lg max-w-none">
        {#if isResource}
          <a href={withInternalUtm('/resources', 'content')} class="inline-block text-[#d32f2f] font-semibold hover:underline mb-6">← Resources</a>
        {/if}
        {#if !isServiceAreasPage}
          <nav class="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
            <a href={withInternalUtm('/', 'content')} class="text-[#d32f2f] font-semibold hover:underline">Home</a>
            <span class="mx-2">/</span>
            {#if isLocationPage}
              <a href={withInternalUtm('/services', 'content')} class="text-[#d32f2f] font-semibold hover:underline">Services</a>
              <span class="mx-2">/</span>
              <a href={withInternalUtm('/service-areas', 'content')} class="text-[#d32f2f] font-semibold hover:underline">Service areas</a>
              <span class="mx-2">/</span>
            {:else if isResource}
              <a href={withInternalUtm('/resources', 'content')} class="text-[#d32f2f] font-semibold hover:underline">Resources</a>
              <span class="mx-2">/</span>
            {/if}
            <span class="text-gray-800">{data.page.title.replace(/\s*[-–|]\s*OhMyGlass[^]*$/i, '').trim()}</span>
          </nav>
        {/if}
        {#if !isServiceAreasPage}
          <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            {data.page.title.replace(' - OhMyGlass.ca', '').replace(' – OhMyGlass.ca', '').replace(' - OhMyGlass', '').replace(' – OhMyGlass', '').replace(' | OhMyGlass', '')}
          </h1>
        {/if}

        {#if isServiceAreasPage}
          <!-- Browse by area -->
          <div class="mb-12">
            <h2 class="text-xl font-semibold text-neutral-800 mb-3">Browse by area</h2>
            <p class="text-neutral-600 mb-6">We serve the GTA. Choose your area for local glass repair and replacement services.</p>
            {#if serviceAreaLocations.length > 0}
              <nav class="flex flex-wrap gap-3" aria-label="Service areas">
                {#each serviceAreaLocations as loc}
                  <a
                    href={withInternalUtm(`/${loc.slug}`, 'content')}
                    class="inline-flex items-center px-5 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-800 font-medium shadow-sm hover:bg-[#d32f2f] hover:text-white hover:border-[#d32f2f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d32f2f]/50 focus:ring-offset-2"
                  >
                    {loc.name}
                  </a>
                {/each}
              </nav>
            {:else}
              <ServiceArea showHeading={false} embed={true} />
            {/if}
          </div>
          <!-- Map -->
          <div class="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div class="p-6 pb-4">
              <h2 class="text-xl font-semibold text-neutral-800 mb-2">Our location & the GTA</h2>
              <p class="text-neutral-600 text-sm">OhMyGlass is based in North York and serves the Greater Toronto Area.</p>
            </div>
            <div class="aspect-[4/3] min-h-[300px]">
              <iframe
                title="OhMyGlass location and Greater Toronto Area"
                src={contact.googleMapsEmbedGtaSrc}
                width="100%"
                height="100%"
                class="w-full h-full min-h-[300px]"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p class="p-4 pt-3 text-sm text-neutral-500 border-t border-neutral-100">
              <a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" class="text-[#d32f2f] font-medium hover:underline">Open in Google Maps</a>
            </p>
          </div>
          <!-- Service Areas CTA -->
          <section class="mt-12 py-8 px-6 bg-neutral-800 text-white rounded-2xl">
            <p class="text-lg font-semibold mb-4 m-0">Need glass repair in your area? We're available 24/7.</p>
            <a
              href={contact.phoneHref}
              class="inline-flex items-center gap-2 bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold px-6 py-3 rounded-2xl transition-colors"
            >
              <i class="fa-solid fa-phone"></i>
              {contact.phone}
            </a>
          </section>
          <!-- Priority SEO landing pages -->
          <section class="mt-8 py-8 px-6 bg-white border border-neutral-200 rounded-2xl">
            <h2 class="text-xl font-semibold text-neutral-800 mb-2">Popular Toronto area pages</h2>
            <p class="text-neutral-600 mb-4">Quick links to our highest-priority local service pages.</p>
            <div class="flex flex-wrap gap-3">
              <a
                href={withInternalUtm('/window-repair-toronto', 'content')}
                class="inline-flex items-center px-4 py-2 rounded-xl bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium transition-colors"
              >
                Window Repair Toronto
              </a>
              <a
                href={withInternalUtm('/window-repair-north-york', 'content')}
                class="inline-flex items-center px-4 py-2 rounded-xl bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium transition-colors"
              >
                Window Repair North York
              </a>
              <a
                href={withInternalUtm('/glass-replacement-toronto', 'content')}
                class="inline-flex items-center px-4 py-2 rounded-xl bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium transition-colors"
              >
                Glass Replacement Toronto
              </a>
            </div>
          </section>
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
                <li><a href={withInternalUtm(`/${link.slug}`, 'content')} class="text-[#d32f2f] font-semibold hover:underline">{link.name}</a></li>
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
            <a href={withInternalUtm('/#contact-form', 'content')} class="text-[#d32f2f] font-semibold hover:underline">Get a free quote</a>
            <span class="text-gray-600"> · </span>
            <a href={withInternalUtm('/resources', 'content')} class="text-[#d32f2f] font-semibold hover:underline">Back to Resources</a>
          </p>
        {/if}
        {#if relatedPageLinks.length > 0}
          <div class="mt-10 pt-8 border-t border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">See also</h2>
            <div class="flex flex-wrap gap-3">
              {#each relatedPageLinks as link}
                <a
                  href={withInternalUtm(link.href, 'content')}
                  class="inline-flex items-center px-4 py-2 rounded-xl bg-neutral-100 hover:bg-[#d32f2f] hover:text-white text-neutral-800 font-medium transition-colors"
                >
                  {link.label}
                </a>
              {/each}
            </div>
          </div>
        {/if}
        {#if isLocationPage && locationPageInfo}
          <p class="mt-10 pt-8 border-t border-gray-200 text-gray-700">
            Other services in {locationPageInfo.cityName}:
            {#each locationPageInfo.otherLinks as link, i}
              <a href={withInternalUtm(`/${link.slug}`, 'content')} class="text-[#d32f2f] font-semibold hover:underline">{link.label}</a>{i < locationPageInfo.otherLinks.length - 1 ? ', ' : ''}
            {/each}
          </p>
        {/if}
      </div>
      {#if !isResource}
        <div>
          {#if shouldShowServiceAreaAboveForm}
            <ServiceArea showHeading={true} embed={true} />
          {/if}
          <ContentPageForm formTitle="OhMyGlass Free Quote" />
        </div>
      {/if}
    </div>
  </div>
</main>

{#if !isServiceAreasPage && !isResource}
  <section class="bg-[#f5f7fa] py-6 text-center">
    <p class="text-gray-600">
      Serving the Greater Toronto Area.
      <a href={withInternalUtm('/service-areas', 'content')} class="text-[#d32f2f] font-semibold hover:underline">View Service Areas</a>
    </p>
  </section>
{/if}
<Footer serviceLinksOrder="default" />
