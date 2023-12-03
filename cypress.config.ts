import { defineConfig } from 'cypress';

export default defineConfig({
  lighthouse: {
    performance: 80,
    accessibility: 90,
    'best-practices': 90,
    seo: 90,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:3000',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any); // trying to suppress TS complaining about lighthouse property
