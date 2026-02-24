<script>
  import { footerServicesIndexOrder, footerServicesDefaultOrder, contact } from '$lib/site-data.js';

  /** @type {'index' | 'default'} - index = home page order, default = contact/free-quote order */
  export let serviceLinksOrder = 'index';

  const year = new Date().getFullYear();
  const footerLinks =
    serviceLinksOrder === 'index' ? footerServicesIndexOrder : footerServicesDefaultOrder;
</script>

<footer class="bg-gradient-to-r from-[#3a3a3a] to-[#1a1a1a] text-white pt-16 pb-12">
  <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
    <div class="md:col-span-1 flex flex-col items-center">
      <picture>
        <source srcset="/images/logo.webp" type="image/webp" />
        <img
          src="/images/logo.png"
          alt="OhMyGlass Logo"
          class="h-24 w-auto drop-shadow-lg mb-4 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          width="432"
          height="96"
        />
      </picture>
      <p class="text-sm">&copy; <span id="year">{year}</span> OhMyGlass. All rights reserved.</p>
    </div>
    <div class="md:col-span-1">
      <h3 class="font-bold mb-4 text-center">Our Services</h3>
      <ul class="space-y-2">
        {#each footerLinks as link}
          <li>
            <a href={link.href} class="hover:text-[#d32f2f]">{link.label}</a>
          </li>
        {/each}
      </ul>
    </div>
    <div class="md:col-span-1">
      <h3 class="font-bold mb-4 text-center">Contact Us</h3>
      <ul class="space-y-2">
        <li><a href={contact.phoneHref} class="hover:text-[#d32f2f]">{contact.phone}</a></li>
        <li><a href={contact.emailHref} class="hover:text-[#d32f2f]">{contact.email}</a></li>
        <li><a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" class="hover:text-[#d32f2f]">Find Us on Map</a></li>
        <li><a href={contact.serviceAreasHref} class="hover:text-[#d32f2f]">Service Areas</a></li>
      </ul>
    </div>
    <div class="md:col-span-1">
      <h3 class="font-bold mb-4 text-center">Connect With Us</h3>
      <ul class="flex gap-4 justify-center">
        <li>
          <a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" class="hover:text-[#d32f2f]" aria-label="Google Maps">
            <i class="fab fa-google"></i>
          </a>
        </li>
        <li>
          <a href={contact.facebook} target="_blank" rel="noopener noreferrer" class="hover:text-[#d32f2f]" aria-label="Facebook">
            <i class="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" class="hover:text-[#d32f2f]" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>
