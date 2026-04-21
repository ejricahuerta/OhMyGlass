import posthog from 'posthog-js';

/** @type {import('@sveltejs/kit').ClientInit} */
export async function init() {
	// No client bootstrap required yet; keep explicit init to satisfy SvelteKit hook shape.
}

/** @type {import('@sveltejs/kit').HandleClientError} */
export async function handleError({ error, status }) {
	if (status === 404) return;
	if (typeof posthog?.captureException === 'function') {
		posthog.captureException(error);
	} else if (typeof posthog?.capture === 'function') {
		posthog.capture('$exception', {
			$exception_message: error?.message,
			$exception_type: error?.name
		});
	}
}
