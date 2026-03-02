<script>
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Footer from '$lib/components/Footer.svelte';

  $: status = $page.status ?? 404;
  $: message = $page.error?.message ?? 'Page Not Found';

  // Redirect 404s (deleted/unknown pages) to home
  if (browser && status === 404) {
    goto('/', { replaceState: true });
  }
</script>

<svelte:head>
  <title>{status} Page Not Found | OhMyGlass</title>
  <meta name="description" content="The page you are looking for does not exist." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if status !== 404}
  <main class="flex items-center justify-center min-h-[60vh] text-center px-4">
    <div>
      <h1 class="text-9xl font-black text-gray-200">{status}</h1>
      <h2 class="text-4xl font-bold text-gray-800">Page Not Found</h2>
      <p class="text-lg text-gray-600 mt-4">Sorry, the page you are looking for could not be found.</p>
      <a
        href="/"
        class="mt-8 inline-block bg-[#d32f2f]/90 backdrop-blur-md text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-[#b71c1c]/90 transition text-center"
      >
        Go back to Homepage
      </a>
    </div>
  </main>

  <Footer serviceLinksOrder="default" />
{/if}
