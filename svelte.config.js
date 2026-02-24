import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined
    }),
    prerender: {
      handleHttpError: ({ status }) => (status === 404 ? 'ignore' : undefined),
      handleMissingId: () => {} // allow pages (e.g. /services) to link to #contact-form without having the section
    }
  }
};

export default config;
