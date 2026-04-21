import { writable } from 'svelte/store';

/** On mobile: show quote button in nav when hero visible, else show phone + floating button. On desktop: always quote in nav + floating button. */
export const showQuoteInNav = writable(true);
export const showFloatingCallButton = writable(false);
