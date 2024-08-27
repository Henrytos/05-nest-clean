import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vitest-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    coverage: {
      provider: 'v8',
      reportsDirectory: './test/unit/coverage',
      exclude: [
        'node_modules',
        'dist',
        'src/infra',
        'create-priavate-and-public-keys-jwt.js',
        'eslintrc.js',
        'test',
      ],
      extension: ['.ts'],
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
