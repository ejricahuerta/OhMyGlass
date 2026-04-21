import { nap } from './site-data.js';

/**
 * Primary business line for tel links and display.
 * After-hours number is shown separately via `contact` / ActiveContact slot props.
 * @returns {{ phone: string; phoneHref: string }}
 */
export function getActivePhone() {
  return {
    phone: nap.telephone,
    phoneHref: nap.telephoneHref
  };
}
