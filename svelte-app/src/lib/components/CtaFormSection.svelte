<script>
  import { tallyFormSrc, contact } from '$lib/site-data.js';
  import ActiveContact from '$lib/components/ActiveContact.svelte';

  /** @type {string} */
  export let title = 'Free Quote';
  /** @type {string} */
  export let description =
    "We're here to help with all your glass needs. Fill out the form below and we'll get back to you quickly.";
  /** @type {boolean} */
  export let showContactStrip = false;
  /** @type {string} - iframe title */
  export let formTitle = 'OhMyGlass Free Quote';

  function onIframeLoad(e) {
    const iframe = e.currentTarget;
    if (iframe && iframe.previousElementSibling) {
      iframe.style.display = 'block';
      iframe.previousElementSibling.style.display = 'none';
    }
  }
</script>

<section id="contact-form" class="relative w-full bg-cover bg-center">
  <div class="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/95 to-[#1a1a1a]/80"></div>
  <div class="relative z-10 flex flex-col items-center justify-center text-center py-24 px-4">
    <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{title}</h2>
    <p class="text-lg text-white/90 mb-8 max-w-2xl">{description}</p>
    <div
      class="backdrop-blur-md shadow-2xl p-4 md:p-6 border border-white/20 max-w-2xl w-full"
    >
      <div class="tally-loader text-center p-8">
        <p class="text-gray-600 font-semibold">Loading form...</p>
      </div>
      <iframe
        data-tally-src={tallyFormSrc}
        loading="lazy"
        width="100%"
        height="720"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title={formTitle}
        style="display:none;"
        onload={onIframeLoad}
      ></iframe>
    </div>
    {#if showContactStrip}
      <div class="text-white text-lg mt-8">
        <p class="mb-2">
          <i class="fas fa-phone-alt mr-2"></i>
          <ActiveContact let:phone let:phoneHref let:afterHoursPhone let:afterHoursPhoneHref>
            <a href={phoneHref} class="hover:text-[#d32f2f]">{phone}</a>
            <span class="block text-white/80 text-base mt-1 pl-7">
              After hours:
              <a href={afterHoursPhoneHref} class="hover:text-[#d32f2f]">{afterHoursPhone}</a>
            </span>
          </ActiveContact>
        </p>
        <p class="mb-2">
          <i class="fas fa-envelope mr-2"></i>
          <a href={contact.emailHref} class="hover:text-[#d32f2f]">{contact.email}</a>
          {#if contact.secondaryEmail}
            <span class="block text-white/80 text-base mt-1 pl-7">
              Secondary:
              <a href={contact.secondaryEmailHref} class="hover:text-[#d32f2f]">{contact.secondaryEmail}</a>
            </span>
          {/if}
        </p>
        <p class="mb-2">
          <i class="fas fa-map-marker-alt mr-2"></i>
          <span class="text-white/90">{contact.addressDisplay}</span>
        </p>
        <p>
          <a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" class="hover:text-[#d32f2f]">Find us on map</a>
        </p>
      </div>
    {/if}
  </div>
</section>
