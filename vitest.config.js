import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Include all files ending with *.test.js or *.spec.js in the test suite
    match: ['**/+(*.)@(test|spec).+(js|ts)', '!**/node_modules/**'],
    // Configure the testing environment (replace with 'jsdom' for browser-like testing)
    environment: 'node',
    coverage: {
      reporter: [ 'text','json','html'],
      provider: "v8",
    },
  },
});
