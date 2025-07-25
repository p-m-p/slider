# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project structure

BoxSlider is a monorepo containing a modern content slider library with multiple distribution formats:

- `packages/slider/` - Core TypeScript slider library with zero dependencies
- `packages/react/` - React component wrappers
- `packages/components/` - Web Components implementation
- `packages/docs/` - Docusaurus documentation site

The library provides multiple slide transition effects (carousel, fade, cube, tile) and can be used standalone or via React/Web Components.

## Commands

**Build & Development:**

- `pnpm build` - Build all packages
- `pnpm dev` - Start examples development server
- `pnpm clean` - Clean all build artifacts

**Testing:**

- `pnpm test` - Run all tests with Vitest
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm test:ui` - Open Vitest UI

**Storybook:**

- `pnpm storybook` - Start Storybook development server
- `pnpm build-storybook` - Build Storybook for production

**Code Quality:**

- `pnpm lint` - Run Prettier check and ESLint
- `pnpm format` - Format code with Prettier

**Package Management:**

- Uses pnpm workspaces with packages in `packages/*`
- `pnpm run -r <script>` - Run script in all packages
- `pnpm run --filter=<package> <script>` - Run script in specific package

**Running Packages:**

- Use `pnpm exec` to run packages installed in the workspace
- Use `pnpx` to run packages not installed in the workspace

## Architecture

**Core Library (`packages/slider/`):**

- `box-slider.ts` - Main slider class with state management
- `effects/` - Different transition effects (carousel, cube, fade, tile)
- `state-store.ts` - Central state management
- `transition-queue.ts` - Animation queue management
- `responder.ts` - Event handling and responsiveness

**Build System:**

- Each package uses custom `build.js` script with esbuild
- Outputs ESM, CJS, and minified browser bundles
- TypeScript declarations generated separately with `tsc`

**Testing:**

- Vitest workspace configuration across all packages
- Testing Library for DOM testing
- Tests located in `__tests__/` directories within packages
- Storybook tests with play functions in `stories/` directory
- Storybook test runner for automated component testing in CI

**Storybook:**

- Comprehensive React component stories with visual examples
- Interactive testing with play functions for component validation
- Tests cover all slider types and configurations
- Automated testing in CI via test runner
- Commands:
  - `pnpm run storybook` - Start development server
  - `pnpm run build-storybook` - Build static files
  - `pnpm run test-storybook` - Run tests (requires running Storybook)

## Working with code

**General Guidelines:**

- Only add comments in code if they provide significant value

**Git workflow:**

- Never commit changes to the branch `main`
- For each plan, create a new branch with an appropriate prefix (e.g. `feat/`, `fix/`, `chore/`)
- Commit changes with conventional commit messages
- Push changes to the remote branch and create a pull request if one does not already exist
- Only set Github pull requests to auto merge when explicitly told to do so
