import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_KEY, PUBLIC_POSTHOG_HOST } from '$env/static/public';

export const load = async () => {
	if (browser && PUBLIC_POSTHOG_KEY) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
			person_profiles: 'identified_only',
			capture_pageview: false // we capture manually in +layout.svelte for SPA navigations
		});
	}
	return {};
};
