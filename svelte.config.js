import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'public',
      assets: 'public',
      fallback: '404.html' // serve SPA for unknown URLs so we can redirect 404s to home
    }),
    prerender: {
      handleHttpError: ({ status }) => (status === 404 ? 'ignore' : undefined),
      handleMissingId: () => {} // allow pages (e.g. /services) to link to #contact-form without having the section
    }
  }
};

export default config;
