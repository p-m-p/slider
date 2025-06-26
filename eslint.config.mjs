import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import storybook from 'eslint-plugin-storybook'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/build',
      '**/.docusaurus',
      '**/coverage',
      '**/storybook-static',
    ],
  },

  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintPluginUnicorn.configs.recommended,

  // Main configuration for all files
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    rules: {
      'import/no-unresolved': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-for-each': 'off',
    },
  },

  // Storybook-specific configuration
  {
    files: ['**/*.stories.{ts,tsx}'],
    plugins: {
      storybook,
    },
    rules: {
      ...storybook.configs['flat/recommended'][0].rules,
    },
  },

  // Configuration files - disable strict rules
  {
    files: [
      '*.config.{js,mjs,ts}',
      'vite.config.{js,ts}',
      'vitest.config.{js,ts}',
      'scripts/**/*.js',
      'packages/**/build.js',
      'packages/docs/babel.config.js',
    ],
    rules: {
      'unicorn/prefer-module': 'off',
      'import/no-default-export': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/import-style': 'off',
      'unicorn/prefer-node-protocol': 'off',
    },
  },

  // Prettier integration - must be last to override conflicting rules
  eslintPluginPrettierRecommended,
)
