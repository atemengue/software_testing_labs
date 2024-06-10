import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: [
      {
        global: {},
        module: 'js/basket/basket.test.js',
      },
     /* {
        global: {},
        module: 'js/events/event.test.js',
      },*/
    ],
  },
});