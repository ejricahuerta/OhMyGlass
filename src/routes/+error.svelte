<script>
  import { page } from '$app/stores';
  import NotFoundPage from '$lib/components/NotFoundPage.svelte';

  $: status = $page.status ?? 404;
</script>

<NotFoundPage {status} />
