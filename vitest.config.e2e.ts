import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vitest-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './test/e2e/coverage',
    },
  },
  plugins: [swc.vite(), tsConfigPaths()],
});
