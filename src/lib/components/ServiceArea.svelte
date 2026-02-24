<script>
  import { serviceAreaCitiesList } from '$lib/site-data.js';

  /** When false, only the area badges are shown (no "Service area in GTA" heading). Use on the Service Areas page to avoid duplicate headings. */
  export let showHeading = true;
  /** When true, section uses minimal padding for use inside a column. */
  export let embed = false;
</script>

<section
  id="service-area"
  class:container={!embed}
  class:mx-auto={!embed}
  class="px-0"
  class:py-10={!embed}
  class:px-4={!embed}
>
  {#if showHeading}
    <div class="flex items-center justify-center mb-6">
      <hr class="flex-grow border-gray-300 mr-4" />
      <h2 class="uppercase tracking-widest text-gray-600 text-sm font-semibold text-center px-2">
        Service area in GTA
      </h2>
      <hr class="flex-grow border-gray-300 ml-4" />
    </div>
  {/if}
  <div class="flex flex-wrap gap-2 justify-center items-center" role="list">
    {#each serviceAreaCitiesList as city}
      <span class="area-badge">{city}</span>
    {/each}
  </div>
</section>

<style>
  .area-badge {
    display: inline-block;
    padding: 0.35rem 0.75rem;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #374151;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    border-radius: 9999px;
    transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  }
  .area-badge:hover {
    border-color: #d32f2f;
    color: #d32f2f;
    background: #fef2f2;
  }
</style>
