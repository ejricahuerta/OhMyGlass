<svelte:head>
  <title>Contact Us - OhMyGlass</title>
  <meta name="description" content="Contact OhMyGlass for any inquiries about our glass repair and replacement services in the Greater Toronto Area (GTA). We're here to help." />
  <meta name="keywords" content="contact ohmyglass, glass repair contact, window replacement contact, GTA glass services" />
  <meta property="og:title" content="Contact OhMyGlass" />
  <meta property="og:description" content="Get in touch with OhMyGlass for professional glass services in the Greater Toronto Area. We look forward to hearing from you." />
  <meta property="og:image" content="https://ohmyglass.ca/images/og-image.jpg" />
  <meta property="fb:app_id" content="966242223397117" />
  <meta property="og:site_name" content="OhMyGlass" />
  <meta property="og:url" content="https://ohmyglass.ca/contact" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Contact Us" />
  <meta name="twitter:description" content="Get in touch with OhMyGlass for professional glass services in the Greater Toronto Area. We look forward to hearing from you." />
  <meta name="twitter:image" content="https://ohmyglass.ca/images/og-image.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_CA" />
  <link rel="canonical" href="https://ohmyglass.ca/contact" />
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"WebPage","name":"Contact Us - OhMyGlass","description":"Contact OhMyGlass for professional glass repair and replacement services in the Greater Toronto Area.","url":"https://ohmyglass.ca/contact"}
  </script>
</svelte:head>

<script>
  import CtaFormSection from '$lib/components/CtaFormSection.svelte';
  import ServiceArea from '$lib/components/ServiceArea.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<CtaFormSection
  title="Contact Us"
  description="Have a question or need to get in touch? Fill out the form below and we'll get back to you quickly. You can also reach us by phone or email."
  showContactStrip={true}
  formTitle="OhMyGlass Contact Form"
/>

<ServiceArea />
<Footer serviceLinksOrder="default" />
