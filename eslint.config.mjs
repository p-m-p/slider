import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import unicorn from 'eslint-plugin-unicorn'
import storybook from 'eslint-plugin-storybook'
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
      // Accessibility adjustments
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',

      // Import rules adjustments - disable problematic ones for now
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/named': 'off',
      'import/no-duplicates': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },

  // Unicorn rules for non-legacy files
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      unicorn,
    },
    rules: {
      ...unicorn.configs['flat/recommended'].rules,
      // Disable overly strict Unicorn rules
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-array-for-each': 'off', // Allow forEach for readability
      'unicorn/no-negated-condition': 'off',
      'unicorn/prefer-number-properties': 'off',
      'unicorn/no-typeof-undefined': 'off',
      'unicorn/import-style': 'off',
      'unicorn/prefer-node-protocol': 'off',
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
      // Allow more flexible patterns in stories
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-array-reduce': 'off',
    },
  },

  // Test files configuration
  {
    files: ['**/*.{test,spec}.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    rules: {
      // Allow more flexible patterns in tests
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-array-reduce': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
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
    ],
    rules: {
      'unicorn/prefer-module': 'off',
      'import/no-default-export': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/import-style': 'off',
      'unicorn/prefer-node-protocol': 'off',
    },
  },
)
