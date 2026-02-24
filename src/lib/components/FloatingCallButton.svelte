<script>
  import { onMount } from 'svelte';
  import { showFloatingCallButton } from '$lib/nav-state.js';
  import { contact } from '$lib/site-data.js';

  let visible = false;

  const unsubscribe = showFloatingCallButton.subscribe((v) => {
    visible = v;
  });

  onMount(() => {
    return () => unsubscribe();
  });
</script>

{#if visible}
  <a
    id="floating-call-button"
    href={contact.phoneHref}
    aria-label="Call Us"
    class="fixed bottom-5 right-5 bg-[#d32f2f] text-white w-16 h-16 rounded-full shadow-lg hover:bg-[#b71c1c] transition z-40 flex items-center justify-center"
  >
    <i class="fas fa-phone-alt text-2xl"></i>
  </a>
{/if}
