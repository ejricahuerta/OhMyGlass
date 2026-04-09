<script>
  import { getContext } from 'svelte';
  import { PHONE_STORE_KEY } from '$lib/phone-context.js';
  import { contact } from '$lib/site-data.js';

  const phoneStore = getContext(PHONE_STORE_KEY);
  const staticContact = { phone: contact.phone, phoneHref: contact.phoneHref };
  $: fromStore = phoneStore ? $phoneStore : null;
  $: active =
    fromStore?.phone != null && fromStore?.phoneHref != null ? fromStore : staticContact;
</script>

<slot phone={active.phone} phoneHref={active.phoneHref} />
