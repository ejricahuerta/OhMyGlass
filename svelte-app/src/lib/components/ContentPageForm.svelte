<script>
  import { tallyFormSrc } from '$lib/site-data.js';

  /** @type {string} */
  export let formTitle = 'OhMyGlass Free Quote';

  function onIframeLoad(e) {
    const iframe = e.currentTarget;
    if (iframe && iframe.previousElementSibling) {
      iframe.style.display = 'block';
      iframe.previousElementSibling.style.display = 'none';
    }
  }
</script>

<div id="contact-form" class="p-4 md:p-6 max-w-2xl w-full">
  <h2 class="text-3xl font-bold font-serif mb-6 text-gray-800 text-center">Free Quote</h2>
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
    style="display:none; border: 1px solid #e5e7eb; border-radius: 0.5rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);"
    onload={onIframeLoad}
  ></iframe>
</div>
