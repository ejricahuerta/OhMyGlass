import { nap } from './site-data.js';

/** E.164 for after-hours line (7pm–5am America/Toronto) */
const AFTER_HOURS_SCHEMA = '+14375251255';

/**
 * Primary business line (5am–7pm Eastern). After 7pm until 5am, use the after-hours line.
 * Uses America/Toronto so DST (EDT/EST) is handled correctly.
 * @param {Date} [now]
 * @returns {{ phone: string; phoneHref: string }}
 */
export function getActivePhone(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    hour: 'numeric',
    hour12: false,
    minute: 'numeric'
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  const minutesSinceMidnight = hour * 60 + minute;
  const fromSevenPm = minutesSinceMidnight >= 19 * 60;
  const beforeFiveAm = minutesSinceMidnight < 5 * 60;
  if (fromSevenPm || beforeFiveAm) {
    return {
      phone: '437-525-1255',
      phoneHref: `tel:${AFTER_HOURS_SCHEMA}`
    };
  }
  return {
    phone: nap.telephone,
    phoneHref: nap.telephoneHref
  };
}
