# Change Log

## 2.14.1

### Patch Changes

- d8733e3: Change minified browser build export name to browser.min.js

## 2.14.0

### Minor Changes

- b6d8541: Add minified browser builds for slider and components

## 2.13.1

### Patch Changes

- 9858e59: Make options optional in create slider helper functions

## 2.13.0

### Minor Changes

- 3ce2a2c: Add shorthand methods for creating sliders

## 2.12.1

### Patch Changes

- e35ae04: Make element event listeners passive

## 2.12.0

### Minor Changes

- 5407aa4: Use touch events for horizontal swipe detection

### Patch Changes

- 7e5a75c: Only default pause on hover setting if using fine pointer like a mouse

## 2.11.5

### Patch Changes

- c408391: Remove console logs from slider packages

## 2.11.4

### Patch Changes

- e422cab: Update transition queue to only honour the last transition request during an active transition

## 2.11.3

### Patch Changes

- 3316a16: Resolve issuw with tile flip effect in Safari

## 2.11.2

### Patch Changes

- d91662e: fix flip tile transition in safari

## 2.11.1

### Patch Changes

- 743016f: Handle aborted animation when slide content changes during transition

## 2.11.0

### Minor Changes

- a9f9511: Core slider no longer throws error if initialized without slides and calling any transition method will not update the state or attempt to transition. Invalid calls to next or prev etc will return an immediately resolved promise.

## 2.10.0

### Minor Changes

- 536b842: Add init and reset events to core slider and update components when mutations to slides are observed

## 2.9.0

### Minor Changes

- 1da6a38: Use web animations api for effect transitions

## 2.8.3

### Patch Changes

- 80870d3: Update tile transition so that original slide content is no obscured by the tile transition wrapper

## 2.8.2

### Patch Changes

- 4d9e14d: Pass slides as second option to effect destroy method

## 2.8.1

### Patch Changes

- 483388e: Apply default slider control styles via component with attribute to disable

## 2.8.0

### Minor Changes

- 633b8eb: Add loop option so slider rotation can be disabled

## 2.7.0

### Minor Changes

- a4ba04d: Add property setters for slider component attributes

## 2.6.6

### Patch Changes

- 25488c2: Fix repo url and add homepage

## 2.6.5

### Patch Changes

- cfc56b8: Fix repository urls in package.json

## 2.6.4

### Patch Changes

- 262a029: Set default configuration value for autoScroll to false if user prefers reduced motion

## 2.6.3

### Patch Changes

- 5cd3ca4: Fix ARIA attributes inline with WAI carousel pattern
- 778af1a: Only apply aria attributes if not already present

## 2.6.2

### Patch Changes

- 15c4bb4: Remove fixed dimensions from fade and tile slider

## 2.6.1

### Patch Changes

- cda78bc: Apply computed style before offset dimensions in effects and simplify the style caching with attribute

## 2.6.0

### Minor Changes

- 120b33c: Add play/pause button to slider controls and create SliderControls component in react package

## 2.5.3

### Patch Changes

- bd41ae9: Fix for destroyed slide transitions with pending timers

## 2.5.2

### Patch Changes

- d009e44: Fix perspective overflow for tile flip transition

## 2.5.1

### Patch Changes

- 5dc061a: Reduce node count for tile flip and resolve tile sizing bug

## 2.5.0

### Minor Changes

- 09fdef5: Tile effect now supports standard HTML content

## 2.4.0

### Minor Changes

- bfe8ef7: Fix package exports and build scripts

## 2.3.13 (2024-02-17)

### Bug Fixes

- **examples:** viewport dimensions ([31b59b1](https://github.com/boxslider/slider/packages/slider/commit/31b59b1a1760d66577c5a454fff58c0403a5d51f))

## 2.3.12 (2024-02-14)

### Bug Fixes

- **react:** add missing attributes back ([de949f9](https://github.com/boxslider/slider/packages/slider/commit/de949f93a5c9becbb392431639a18eeaf33e6a3c))

## 2.3.11 (2024-02-10)

**Note:** Version bump only for package @boxslider/slider

## 2.3.10 (2024-01-13)

**Note:** Version bump only for package @boxslider/slider

## 2.3.9 (2023-12-31)

**Note:** Version bump only for package @boxslider/slider

## 2.3.8 (2023-12-06)

**Note:** Version bump only for package @boxslider/slider

## 2.3.7 (2023-11-16)

**Note:** Version bump only for package @boxslider/slider

## 2.3.6 (2023-11-11)

**Note:** Version bump only for package @boxslider/slider

## 2.3.5 (2023-10-24)

**Note:** Version bump only for package @boxslider/slider

## 2.3.4 (2023-10-20)

**Note:** Version bump only for package @boxslider/slider

## 2.3.3 (2023-10-19)

**Note:** Version bump only for package @boxslider/slider

## 2.3.2 (2023-10-16)

**Note:** Version bump only for package @boxslider/slider

## 2.3.1 (2023-10-07)

**Note:** Version bump only for package @boxslider/slider

# 2.3.0 (2023-10-06)

### Features

- **slider:** use resize observer for slider reset ([cc175a2](https://github.com/boxslider/slider/packages/slider/commit/cc175a2730ae9907e6b6d0d36ce5b117142d2bd2))

## 2.2.12 (2023-09-24)

**Note:** Version bump only for package @boxslider/slider

## 2.2.11 (2023-09-07)

**Note:** Version bump only for package @boxslider/slider

## 2.2.10 (2023-08-25)

**Note:** Version bump only for package @boxslider/slider

## 2.2.9 (2023-07-21)

**Note:** Version bump only for package @boxslider/slider

## 2.2.8 (2023-06-19)

### Bug Fixes

- **slider:** remove use of display property ([1448d1c](https://github.com/boxslider/slider/packages/slider/commit/1448d1c5bc5dc0abae1f15d0b487e8ec655c58de))

## 2.2.7 (2023-06-12)

**Note:** Version bump only for package @boxslider/slider

## 2.2.6 (2023-04-23)

**Note:** Version bump only for package @boxslider/slider

## 2.2.5 (2023-03-22)

**Note:** Version bump only for package @boxslider/slider

## 2.2.4 (2023-03-21)

**Note:** Version bump only for package @boxslider/slider

## 2.2.3 (2023-03-01)

### Bug Fixes

- module exports ([ebc845b](https://github.com/boxslider/slider/packages/slider/commit/ebc845be9cf81f4cbe44b2492027fa4731e1e91f))

## 2.2.2 (2023-01-14)

**Note:** Version bump only for package @boxslider/slider

## 2.2.1 (2023-01-14)

**Note:** Version bump only for package @boxslider/slider

# 2.2.0 (2023-01-10)

### Features

- **react:** add sliderRef prop ([a66e8a9](https://github.com/boxslider/slider/packages/slider/commit/a66e8a96ab0386fe4b3a35db665443492858d6ea))

## 2.1.10 (2023-01-07)

### Bug Fixes

- **slider:** ensure carousel maintains slide dimensions ([f317fd0](https://github.com/boxslider/slider/packages/slider/commit/f317fd0ec9b0530ff0f4b77e4df444359bd8f219))

## 2.1.9 (2023-01-06)

**Note:** Version bump only for package @boxslider/slider

## 2.1.8 (2023-01-05)

**Note:** Version bump only for package @boxslider/slider

## 2.1.7 (2023-01-05)

**Note:** Version bump only for package @boxslider/slider

## 2.1.6 (2023-01-05)

**Note:** Version bump only for package @boxslider/slider

## 2.1.5 (2023-01-04)

**Note:** Version bump only for package @boxslider/slider

## 2.1.4 (2022-12-27)

**Note:** Version bump only for package @boxslider/slider

## 2.1.3 (2022-12-22)

**Note:** Version bump only for package @boxslider/slider

## 2.1.2 (2022-12-08)

**Note:** Version bump only for package @boxslider/slider

## 2.1.1 (2022-12-03)

**Note:** Version bump only for package @boxslider/slider

# 2.1.0 (2022-11-22)

### Features

- **slider:** add cover effect for carousel ([84e5235](https://github.com/boxslider/slider/packages/slider/commit/84e523555ff9c03e591f71417115b837a9147c57))

## 2.0.10 (2022-11-19)

**Note:** Version bump only for package @boxslider/slider

## 2.0.9 (2022-11-18)

**Note:** Version bump only for package @boxslider/slider

## 2.0.8 (2022-11-04)

**Note:** Version bump only for package @boxslider/slider

## 2.0.7 (2022-10-16)

### Bug Fixes

- **examples:** rename app to home ([4277a0c](https://github.com/boxslider/slider/packages/slider/commit/4277a0c909b439884c9ef10e7652e46112d27cc6))

## 2.0.6 (2022-10-11)

**Note:** Version bump only for package @boxslider/slider

## 2.0.5 (2022-10-11)

**Note:** Version bump only for package @boxslider/slider

## 2.0.4 (2022-10-04)

### Bug Fixes

- **examples:** add media query to size for small screens ([#148](https://github.com/boxslider/slider/packages/slider/issues/148)) ([acbd446](https://github.com/boxslider/slider/packages/slider/commit/acbd446404fdc1f4a71fba75c2bdc3f1850f561e))

## 2.0.3 (2022-10-03)

**Note:** Version bump only for package @boxslider/slider

## [2.0.2](https://github.com/boxslider/slider/packages/slider/compare/v2.0.1...v2.0.2) (2022-10-03)

### Bug Fixes

- support ssr ([e158516](https://github.com/boxslider/slider/packages/slider/commit/e15851650b72ed6db4a5657e9ef11384af898b66))

## [2.0.1](https://github.com/boxslider/slider/packages/slider/compare/v2.0.0...v2.0.1) (2022-10-03)

### Bug Fixes

- add build script with bundling ([#147](https://github.com/boxslider/slider/packages/slider/issues/147)) ([dd4dcba](https://github.com/boxslider/slider/packages/slider/commit/dd4dcbaf2d4828574902731ad011863683553952))

# [2.0.0](https://github.com/boxslider/slider/packages/slider/compare/v1.2.0...v2.0.0) (2022-09-28)

### Features

- rework packages and demo site ([#133](https://github.com/boxslider/slider/packages/slider/issues/133)) ([8c8b57e](https://github.com/boxslider/slider/packages/slider/commit/8c8b57e8b3bc4538249ca2a09a0d6045701712b5))

### BREAKING CHANGES

- box event handler data is now passed to all event types but only before event has nextIndex set

# [1.2.0](https://github.com/boxslider/slider/packages/slider/compare/v1.1.6...v1.2.0) (2022-03-13)

### Features

- **slider:** aria attributes for accessibility ([#65](https://github.com/boxslider/slider/packages/slider/issues/65)) ([e64260f](https://github.com/boxslider/slider/packages/slider/commit/e64260f83e6b2cbb8a1cb76979cd4d52b146cf56)), closes [#8](https://github.com/boxslider/slider/packages/slider/issues/8)

## [1.1.5](https://github.com/boxslider/slider/packages/slider/compare/v1.1.4...v1.1.5) (2021-12-07)

**Note:** Version bump only for package @boxslider/slider

## [1.1.3](https://github.com/boxslider/slider/packages/slider/compare/v1.1.2...v1.1.3) (2021-12-06)

**Note:** Version bump only for package @boxslider/slider
