<svelte:head>
  <title>OhMyGlass | Replacement Windows & Glass Repair Toronto & GTA - Free Quote, 24/7</title>
  <meta name="description" content="Replacement windows Toronto & GTA. Glass repair saves 60-80% vs full replacement. Free quote, 24/7 emergency. Window repair, foggy & cracked glass. Call now." />
  <meta name="keywords" content="glass repair, window repair, broken glass repair, cracked window repair, foggy window repair, emergency glass repair, glass repair toronto, glass repair GTA, window repair toronto, storefront glass repair, residential glass repair, commercial glass repair, glass repair vs replacement" />
  <link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high" />
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://ohmyglass.ca/" />
  <meta property="og:title" content="OhMyGlass | Replacement Windows & Glass Repair Toronto & GTA - Free Quote, 24/7" />
  <meta property="og:description" content="Replacement windows Toronto & GTA. Glass repair saves 60-80% vs full replacement. Free quote, 24/7 emergency. Window repair, foggy & cracked glass." />
  <meta property="og:image" content="https://ohmyglass.ca/images/og-image.jpg" />
  <meta property="fb:app_id" content="966242223397117" />
  <meta property="og:site_name" content="OhMyGlass" />
  <meta property="og:locale" content="en_CA" />
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://ohmyglass.ca/" />
  <meta name="twitter:title" content="OhMyGlass | Replacement Windows & Glass Repair Toronto & GTA" />
  <meta name="twitter:description" content="Replacement windows Toronto & GTA. Glass repair saves 60-80% vs full replacement. Free quote, 24/7 emergency. Window repair, foggy & cracked glass." />
  <meta name="twitter:image" content="https://ohmyglass.ca/images/og-image.jpg" />
  <link rel="canonical" href="https://ohmyglass.ca" />
  <!-- Schema: LocalBusiness + Service list -->
  <script type="application/ld+json">
    {JSON.stringify(getLocalBusinessSchema())}
  </script>
  <script type="application/ld+json">
    {JSON.stringify(homeServiceSchemas)}
  </script>
</svelte:head>

<script>
  import CtaFormSection from '$lib/components/CtaFormSection.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { contact } from '$lib/site-data.js';
  import { getLocalBusinessSchema } from '$lib/schema.js';

  const homeServiceSchemas = [
    { '@context': 'https://schema.org', '@type': 'Service', name: 'Emergency Glass Repair', description: '24/7 emergency glass repair for broken or shattered windows and doors across Toronto & GTA. Fast response, board-up, and permanent replacement.', url: 'https://ohmyglass.ca/emergency-glass-repair', provider: { '@type': 'LocalBusiness', name: 'OhMyGlass', url: 'https://ohmyglass.ca' }, areaServed: 'Greater Toronto Area' },
    { '@context': 'https://schema.org', '@type': 'Service', name: 'Window Glass Replacement', description: 'Window glass replacement for residential and commercial properties in Toronto & GTA. Cracked, foggy, or broken panes – repair or replace.', url: 'https://ohmyglass.ca/window-glass-replacement', provider: { '@type': 'LocalBusiness', name: 'OhMyGlass', url: 'https://ohmyglass.ca' }, areaServed: 'Greater Toronto Area' },
    { '@context': 'https://schema.org', '@type': 'Service', name: 'Residential Window Repair', description: 'Residential window repair across Toronto & GTA. Save 60-80% vs full replacement. Cracked, foggy, and broken window repair.', url: 'https://ohmyglass.ca/residential-window-repair', provider: { '@type': 'LocalBusiness', name: 'OhMyGlass', url: 'https://ohmyglass.ca' }, areaServed: 'Greater Toronto Area' },
    { '@context': 'https://schema.org', '@type': 'Service', name: 'Commercial Glass Repair', description: 'Commercial and storefront glass repair in Toronto & GTA. Storefronts, offices, safety glass. Fast, professional service.', url: 'https://ohmyglass.ca/commercial-glass-repair', provider: { '@type': 'LocalBusiness', name: 'OhMyGlass', url: 'https://ohmyglass.ca' }, areaServed: 'Greater Toronto Area' }
  ];
</script>

<!-- Hero Section -->
<section id="hero" class="relative h-screen min-h-[600px] w-full">
  <picture>
    <source srcset="/images/hero.webp" type="image/webp" />
    <img
      src="/images/hero.jpg"
      alt="A modern storefront with large glass windows, repaired by OhMyGlass"
      fetchpriority="high"
      class="absolute inset-0 w-full h-full object-cover"
    />
  </picture>
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
  <div class="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
    <h1 class="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg leading-tight">
      Expert Glass Repair Services
    </h1>
    <p class="text-lg md:text-xl text-white font-normal drop-shadow-lg max-w-3xl mb-8">
      Professional glass repair and replacement windows in Toronto, North York, Vaughan, Richmond Hill, Markham, Mississauga & GTA. We repair cracked, broken, and foggy glass – saving you 60-80% vs full replacement. 24/7 emergency glass repair available.
    </p>
    <a
      href="#contact-form"
      class="inline-block bg-white backdrop-blur-md text-[#d32f2f] border-2 border-[#d32f2f]/80 px-8 md:px-12 py-4 md:py-5 font-bold text-lg md:text-xl shadow-lg hover:bg-[#d32f2f]/90 hover:text-white transition-all duration-300 transform hover:scale-105 rounded-3xl mb-2"
    >
      Free Quote
    </a>
  </div>
</section>

<!-- Trust/Impact Section -->
<section class="relative bg-[#f5f7fa] pt-24 pb-32 text-center overflow-hidden min-h-screen flex items-center justify-center">
  <div class="absolute inset-0"></div>
  <div class="relative container mx-auto px-4 z-10">
    <h2 class="text-4xl md:text-5xl font-serif font-semibold text-gray-800 mb-6">Why Choose Our Glass Repair Services?</h2>
    <p class="text-lg md:text-xl text-gray-700 mb-24 max-w-2xl mx-auto">
      We are expert glass repair specialists with over 10 years of experience. Our repair-first approach saves you 60-80% compared to replacement. Available 24/7 for emergency glass repair situations. We are proud to have a 5-star rating on
      <a href="https://www.google.com/search?q=oh+my+glass" target="_blank" rel="noopener noreferrer" class="text-[#d32f2f]">Google</a>
      and
      <a href="https://www.facebook.com/ohmy.glass.to/reviews" target="_blank" rel="noopener noreferrer" class="text-[#d32f2f]">Facebook</a>.
      We repair when possible, replace only when necessary.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto mb-12">
      <div>
        <div class="text-6xl md:text-7xl font-light text-gray-900 mb-2">1k<span class="align-super text-2xl font-normal">+</span></div>
        <div class="uppercase tracking-widest text-gray-700 text-lg font-semibold mb-4">Happy Customers</div>
        <div class="text-gray-600 text-base md:text-lg max-w-xs mx-auto">We have served thousands of customers across the GTA</div>
      </div>
      <div>
        <div class="text-6xl md:text-7xl font-light text-gray-900 mb-2">10<span class="align-super text-2xl font-normal">+</span></div>
        <div class="uppercase tracking-widest text-gray-700 text-lg font-semibold mb-4">Years of Experience</div>
        <div class="text-gray-600 text-base md:text-lg max-w-xs mx-auto">We have been in the business for over 10 years</div>
      </div>
      <div>
        <div class="text-6xl md:text-7xl font-light text-gray-900 mb-2">5k<span class="align-super text-2xl font-normal">+</span></div>
        <div class="uppercase tracking-widest text-gray-700 text-lg font-semibold mb-4">Glass Repairs</div>
        <div class="text-gray-600 text-base md:text-lg max-w-xs mx-auto">We have completed thousands of successful glass repairs across the GTA, saving customers 60-80% vs replacement</div>
      </div>
    </div>
  </div>
</section>

<CtaFormSection />

<!-- Services Section -->
<section id="services" class="relative bg-[#f5f7fa] py-20">
  <div class="container mx-auto px-4">
    <h3 class="text-center text-lg md:text-xl font-semibold uppercase tracking-widest text-gray-800 mb-12">Expert glass repair services with 24/7 emergency availability.</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      <a href="/emergency-glass-repair" class="group relative h-72 flex flex-col items-center justify-end overflow-hidden shadow hover:scale-105 transition-transform duration-300">
        <picture>
          <source srcset="/images/window-repairs.webp" type="image/webp" />
          <img src="/images/window-repairs.jpg" alt="Residential window repair and glass replacement service in Toronto and GTA" loading="lazy" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
        </picture>
        <div class="relative z-10 p-6 w-full flex items-center justify-center">
          <div class="bg-[#f5f7fa]/10 backdrop-blur-md rounded-lg px-4 py-2">
            <div class="text-xl font-bold text-white text-shadow">Window Repairs</div>
          </div>
        </div>
      </a>
      <a href="/aluminum-storefront" class="group relative h-72 flex flex-col items-center justify-end overflow-hidden shadow hover:scale-105 transition-transform duration-300">
        <picture>
          <source srcset="/images/aluminum-storefront.webp" type="image/webp" />
          <img src="/images/aluminum-storefront.jpg" alt="Commercial aluminum storefront glass repair and installation" loading="lazy" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
        </picture>
        <div class="relative z-10 p-6 w-full flex items-center justify-center">
          <div class="bg-[#f5f7fa]/10 backdrop-blur-md rounded-lg px-4 py-2">
            <div class="text-xl font-bold text-white text-shadow">Aluminum Storefront</div>
          </div>
        </div>
      </a>
      <a href="/door-repairs" class="group relative h-72 flex flex-col items-center justify-end overflow-hidden shadow hover:scale-105 transition-transform duration-300">
        <picture>
          <source srcset="/images/door-repairs.webp" type="image/webp" />
          <img src="/images/door-repairs.jpg" alt="Door glass repair and patio door repair in Toronto and GTA" loading="lazy" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
        </picture>
        <div class="relative z-10 p-6 w-full flex items-center justify-center">
          <div class="bg-[#f5f7fa]/10 backdrop-blur-md rounded-lg px-4 py-2">
            <div class="text-xl font-bold text-white text-shadow">Door Repairs</div>
          </div>
        </div>
      </a>
      <a href="/custom-mirror" class="group relative h-72 flex flex-col items-center justify-end overflow-hidden shadow hover:scale-105 transition-transform duration-300">
        <picture>
          <source srcset="/images/custom-mirror.webp" type="image/webp" />
          <img src="/images/custom-mirror.jpg" alt="Custom mirror installation and repair for homes and businesses" loading="lazy" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
        </picture>
        <div class="relative z-10 p-6 w-full flex items-center justify-center">
          <div class="bg-[#f5f7fa]/10 backdrop-blur-md rounded-lg px-4 py-2">
            <div class="text-xl font-bold text-white text-shadow">Custom Mirror</div>
          </div>
        </div>
      </a>
    </div>
    <div class="mt-12 text-center">
      <a href="/services" class="inline-block bg-[#d32f2f]/90 backdrop-blur-md text-white font-bold text-lg px-8 py-4 shadow-lg hover:bg-[#b71c1c]/90 transition-all duration-300 transform hover:scale-105 border border-white/20 rounded-3xl">
        See All Services <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

<!-- Divider Section -->
<section class="relative bg-[#f5f7fa] py-16">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-center">
      <hr class="flex-grow border-gray-300 mr-4" />
      <div class="uppercase tracking-widest text-gray-600 text-sm font-semibold text-center px-4">Our Work</div>
      <hr class="flex-grow border-gray-300 ml-4" />
    </div>
  </div>
</section>

<!-- Our Work Section -->
<section id="our-works" class="bg-[#f5f7fa] py-24">
  <div class="container mx-auto px-4 md:px-0">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
      <div class="flex flex-col items-center">
        <div class="relative w-full aspect-[9/16] max-h-[640px] mb-6 rounded-md overflow-hidden">
          <video src="/videos/ali-babas.mp4" class="w-full h-full object-cover" autoplay muted loop playsinline title="Ali Baba's Storefront Glass Replacement" aria-label="Video showcasing storefront glass replacement at Ali Baba's" preload="auto">
            <track kind="description" src="/videos/ali-babas-description.vtt" label="English description" />
          </video>
        </div>
        <div class="uppercase text-[#1a1a1a] text-xs font-bold tracking-widest mb-2">Ali Baba's</div>
        <div class="text-2xl font-serif font-semibold text-[#1a1a1a] mb-3 text-center">Storefront Glass Replacement</div>
        <div class="text-gray-700 text-base text-center">Replacing glass in a commercial space.</div>
      </div>
      <div class="flex flex-col items-center">
        <div class="relative w-full aspect-[9/16] max-h-[640px] mb-6 rounded-md overflow-hidden">
          <video src="/videos/car-aid-auto collision.mp4" class="w-full h-full object-cover" autoplay muted loop playsinline title="Car Aid Auto Collision Glass Installation" aria-label="Video showcasing glass installation at Car Aid Auto Collision" preload="auto">
            <track kind="description" src="/videos/car-aid-description.vtt" label="English description" />
          </video>
        </div>
        <div class="uppercase text-[#1a1a1a] text-xs font-bold tracking-widest mb-2">Car Aid Auto Collision</div>
        <div class="text-2xl font-serif font-semibold text-[#1a1a1a] mb-3 text-center">Commercial Glass Installation</div>
        <div class="text-gray-700 text-base text-center">Professional storefront glass installation and repair services.</div>
      </div>
      <div class="flex flex-col items-center">
        <div class="relative w-full aspect-[9/16] max-h-[640px] mb-6 rounded-md overflow-hidden">
          <video src="/videos/gracious-living.mp4" class="w-full h-full object-cover" autoplay muted loop playsinline title="Gracious Living Commercial Glass Replacement" aria-label="Video showcasing commercial glass replacement at Gracious Living" preload="auto">
            <track kind="description" src="/videos/gracious-living-description.vtt" label="English description" />
          </video>
        </div>
        <div class="uppercase text-[#2c3a43] text-xs font-bold tracking-widest mb-2">Gracious Living</div>
        <div class="text-2xl font-serif font-semibold text-[#2c3a43] mb-3 text-center">Commercial Glass Replacement</div>
        <div class="text-gray-700 text-base text-center">Replacing glass in a commercial space.</div>
      </div>
    </div>
    <div class="mt-16 text-center">
      <a href={contact.instagram} target="_blank" rel="noopener noreferrer" class="text-xl gap-2 text-gray-700">
        View all work on <br />
        <span class="text-[#d32f2f] font-bold">Instagram <i class="fa-solid fa-arrow-right"></i></span>
      </a>
    </div>
  </div>
</section>

<!-- Reviews Section -->
<section id="reviews" class="relative w-full mx-auto py-20 px-4 md:px-0">
  <div class="p-14 mx-auto text-center">
    <h2 class="text-4xl font-bold text-[#2c3a43] mb-8">What Our Customers Say</h2>
    <script src="https://static.elfsight.com/platform/platform.js" async></script>
    <div class="elfsight-app-377d5892-86fd-4760-96cb-f660a82102ed" data-elfsight-app-lazy></div>
  </div>
</section>

<section class="bg-[#f5f7fa] py-6 text-center">
  <p class="text-gray-600">
    Serving the Greater Toronto Area.
    <a href="/service-areas" class="text-[#d32f2f] font-semibold hover:underline">View Service Areas</a>
  </p>
</section>
<Footer serviceLinksOrder="index" />
