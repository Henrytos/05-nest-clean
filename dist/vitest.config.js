"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unplugin_swc_1 = require("unplugin-swc");
const config_1 = require("vitest/config");
const vitest_tsconfig_paths_1 = require("vitest-tsconfig-paths");
exports.default = (0, config_1.defineConfig)({
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
        (0, vitest_tsconfig_paths_1.default)(),
        unplugin_swc_1.default.vite({
            module: { type: 'es6' },
        }),
    ],
});
//# sourceMappingURL=vitest.config.js.map