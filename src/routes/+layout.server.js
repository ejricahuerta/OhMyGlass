import { getActivePhone } from '$lib/phone-schedule.js';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async () => {
  return {
    activePhone: getActivePhone(new Date())
  };
};
