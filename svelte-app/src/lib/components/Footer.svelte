<script>
  import { footerServicesIndexOrder, footerServicesDefaultOrder, contact } from '$lib/site-data.js';
  import ActiveContact from '$lib/components/ActiveContact.svelte';

  /** @type {'index' | 'default'} - index = home page order, default = contact/free-quote order */
  export let serviceLinksOrder = 'index';

  const year = new Date().getFullYear();
  const footerLinks =
    serviceLinksOrder === 'index' ? footerServicesIndexOrder : footerServicesDefaultOrder;

  const linkClass =
    'transition-colors duration-200 hover:text-[#d32f2f] focus-visible:text-[#d32f2f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded';
  const headingClass = 'font-bold text-sm uppercase tracking-wide mb-4 text-center text-white/90';
</script>

<footer class="bg-gradient-to-r from-[#3a3a3a] to-[#1a1a1a] text-white pt-16 pb-12">
  <div class="container mx-auto px-4 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
    <!-- Brand -->
    <div class="flex flex-col items-center text-center md:items-center">
      <picture>
        <source srcset="/images/logo.webp" type="image/webp" />
        <img
          src="/images/logo.png"
          alt="OhMyGlass"
          class="h-24 w-auto mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          width="432"
          height="96"
        />
      </picture>
      <p class="text-sm text-white/80">&copy; <span id="year">{year}</span> OhMyGlass. All rights reserved.</p>
    </div>

    <!-- Services -->
    <nav class="text-center" aria-label="Footer services">
      <h3 class={headingClass}>Our Services</h3>
      <ul class="space-y-2">
        {#each footerLinks as link}
          <li>
            <a href={link.href} class={linkClass}>{link.label}</a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Contact -->
    <div class="text-center">
      <h3 class={headingClass}>Contact Us</h3>
      <ul class="space-y-2">
        <li>
          <ActiveContact let:phone let:phoneHref let:afterHoursPhone let:afterHoursPhoneHref>
            <a href={phoneHref} class={linkClass}>{phone}</a>
            <span class="block text-white/60 text-xs mt-1">After hours</span>
            <a href={afterHoursPhoneHref} class="{linkClass} text-sm">{afterHoursPhone}</a>
          </ActiveContact>
        </li>
        <li><a href={contact.emailHref} class={linkClass}>{contact.email}</a></li>
        <li>
          <a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" class={linkClass}>Find Us on Map</a>
        </li>
        <li><a href={contact.serviceAreasHref} class={linkClass}>Service Areas</a></li>
      </ul>
    </div>

    <!-- Social -->
    <div class="text-center">
      <h3 class={headingClass}>Connect With Us</h3>
      <ul class="flex gap-4 justify-center" role="list">
        <li>
          <a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" class="{linkClass} inline-flex items-center justify-center w-10 h-10" aria-label="Google Maps">
            <i class="fab fa-google" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href={contact.facebook} target="_blank" rel="noopener noreferrer" class="{linkClass} inline-flex items-center justify-center w-10 h-10" aria-label="Facebook">
            <i class="fab fa-facebook-f" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" class="{linkClass} inline-flex items-center justify-center w-10 h-10" aria-label="Instagram">
            <i class="fab fa-instagram" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>
