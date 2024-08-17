import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vitest-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './src/domain/forum/aplication/use-cases',
      reporter: [
        // Specify reporter using name of the NPM package
        ['@vitest/custom-coverage-reporter', { someOption: true }],

        // Specify reporter using local path
        '/absolute/path/to/custom-reporter.cjs',
      ],
    },
  },
  plugins: [
    // This is required to build the test files with SWC
    tsConfigPaths(),
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
});
