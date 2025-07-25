# Change Log

## 2.14.0

### Minor Changes

- aede8ef: Add onReset event handler and remove onInit event across all packages
  - Add onReset event to core slider event system
  - Remove onInit event from core slider (breaking change)
  - Update React components to support onReset event handler
  - Remove onInit support from React components
  - Update type definitions for current event coverage
  - Ensure API consistency across all slider implementations

### Patch Changes

- Updated dependencies [aede8ef]
  - @boxslider/slider@2.16.0

## 2.13.3

### Patch Changes

- 6aeb895: Improve code quality by adopting modern number checking methods
  - Replace `parseInt` with `Number.parseInt` for more reliable parsing
  - Replace negated conditions with positive logic for better readability
  - No breaking changes to public APIs

- Updated dependencies [6aeb895]
  - @boxslider/slider@2.15.1

## 2.13.2

### Patch Changes

- Updated dependencies [57432fc]
  - @boxslider/slider@2.15.0

## 2.13.1

### Patch Changes

- cf55c13: Fix slider element types by extending core BoxSliderOptions interface

## 2.13.0

### Minor Changes

- ce5ea6e: Add global HTMLElementTagNameMap declarations for BoxSlider web components

  This update adds global TypeScript declarations that map web component tag names to their corresponding element types, enabling automatic type inference when using `querySelector` and similar DOM methods.

  **Added:**
  - Global `HTMLElementTagNameMap` interface with BoxSlider component mappings:
    - `'bs-carousel'` → `CarouselSliderElement`
    - `'bs-cube'` → `CubeSliderElement`
    - `'bs-fade'` → `FadeSliderElement`
    - `'bs-tile'` → `TileSliderElement`
    - `'bs-slider-controls'` → `SliderControlsElement`

  **Benefits:**
  - Improved TypeScript developer experience
  - Automatic type inference for DOM queries
  - No need for explicit type casting when using `querySelector`
  - Consistent with standard web component typing patterns

  **Example:**

  ```typescript
  // Before: required explicit typing
  const slider = document.querySelector('bs-carousel') as CarouselSliderElement

  // After: automatic type inference
  const slider = document.querySelector('bs-carousel') // typed as CarouselSliderElement | null
  ```

- ce5ea6e: Enhance SliderControls with dynamic property updates and improved React compatibility
  - Add property getters/setters for all label attributes (nextBtnLabel, prevBtnLabel, playBtnLabel, pauseBtnLabel, indexBtnLabel, indexLabel)
  - Implement observedAttributes and attributeChangedCallback for dynamic updates
  - Fix index button labels not updating when properties change
  - Extract shared index button label logic to eliminate code duplication
  - Improve React prop mapping with proper camelCase to kebab-case conversion
  - Ensure all button labels update immediately when properties are modified

## 2.12.1

### Patch Changes

- Updated dependencies [9a742f0]
  - @boxslider/slider@2.14.2

## 2.12.0

### Minor Changes

- c00ff4b: Remove locally stored slider options from the Slider base component class and surface the underlying slider attributes instead

## 2.11.2

### Patch Changes

- 89ba69b: Fix play/pause button state in slider controls when using the pause on hover option

## 2.11.1

### Patch Changes

- d8733e3: Change minified browser build export name to browser.min.js
- Updated dependencies [d8733e3]
  - @boxslider/slider@2.14.1

## 2.11.0

### Minor Changes

- b6d8541: Add minified browser builds for slider and components

### Patch Changes

- Updated dependencies [b6d8541]
  - @boxslider/slider@2.14.0

## 2.10.9

### Patch Changes

- Updated dependencies [9858e59]
  - @boxslider/slider@2.13.1

## 2.10.8

### Patch Changes

- Updated dependencies [3ce2a2c]
  - @boxslider/slider@2.13.0

## 2.10.7

### Patch Changes

- Updated dependencies [e35ae04]
  - @boxslider/slider@2.12.1

## 2.10.6

### Patch Changes

- Updated dependencies [5407aa4]
- Updated dependencies [7e5a75c]
  - @boxslider/slider@2.12.0

## 2.10.5

### Patch Changes

- Updated dependencies [c408391]
  - @boxslider/slider@2.11.5

## 2.10.4

### Patch Changes

- Updated dependencies [e422cab]
  - @boxslider/slider@2.11.4

## 2.10.3

### Patch Changes

- Updated dependencies [3316a16]
  - @boxslider/slider@2.11.3

## 2.10.2

### Patch Changes

- Updated dependencies [d91662e]
  - @boxslider/slider@2.11.2

## 2.10.1

### Patch Changes

- Updated dependencies [743016f]
  - @boxslider/slider@2.11.1

## 2.10.0

### Minor Changes

- a9f9511: Core slider no longer throws error if initialized without slides and calling any transition method will not update the state or attempt to transition. Invalid calls to next or prev etc will return an immediately resolved promise.

### Patch Changes

- Updated dependencies [a9f9511]
  - @boxslider/slider@2.11.0

## 2.9.0

### Minor Changes

- 536b842: Add init and reset events to core slider and update components when mutations to slides are observed

### Patch Changes

- Updated dependencies [536b842]
  - @boxslider/slider@2.10.0

## 2.8.4

### Patch Changes

- Updated dependencies [1da6a38]
  - @boxslider/slider@2.9.0

## 2.8.3

### Patch Changes

- Updated dependencies [80870d3]
  - @boxslider/slider@2.8.3

## 2.8.2

### Patch Changes

- c288ea3: Allow custom effects to extend base slider element

## 2.8.1

### Patch Changes

- Updated dependencies [4d9e14d]
  - @boxslider/slider@2.8.2

## 2.8.0

### Minor Changes

- 483388e: Apply default slider control styles via component with attribute to disable

### Patch Changes

- Updated dependencies [483388e]
  - @boxslider/slider@2.8.1

## 2.7.3

### Patch Changes

- Updated dependencies [633b8eb]
  - @boxslider/slider@2.8.0

## 2.7.2

### Patch Changes

- bfd3d2e: Fix aria-controls attribute for shadow id

## 2.7.1

### Patch Changes

- a8a722b: Resolve issue with slider props not being honoured in slider elements

## 2.7.0

### Minor Changes

- a4ba04d: Add property setters for slider component attributes

### Patch Changes

- Updated dependencies [a4ba04d]
  - @boxslider/slider@2.7.0

## 2.6.9

### Patch Changes

- 25488c2: Fix repo url and add homepage
- Updated dependencies [25488c2]
  - @boxslider/slider@2.6.6

## 2.6.8

### Patch Changes

- cfc56b8: Fix repository urls in package.json
- Updated dependencies [cfc56b8]
  - @boxslider/slider@2.6.5

## 2.6.7

### Patch Changes

- a4d1e67: Add custom element demo to readme

## 2.6.6

### Patch Changes

- Updated dependencies [262a029]
  - @boxslider/slider@2.6.4

## 2.6.5

### Patch Changes

- ab00052: Only apply button hover states when supported

## 2.6.4

### Patch Changes

- 5cd3ca4: Fix ARIA attributes inline with WAI carousel pattern
- Updated dependencies [5cd3ca4]
- Updated dependencies [778af1a]
  - @boxslider/slider@2.6.3

## 2.6.3

### Patch Changes

- 1919d60: Make slider custom elements safe when added to non browser bundle
- Updated dependencies [15c4bb4]
  - @boxslider/slider@2.6.2

## 2.6.2

### Patch Changes

- 151bc2b: Use grid template areas in controls layout
- Updated dependencies [cda78bc]
  - @boxslider/slider@2.6.1

## 2.6.1

### Patch Changes

- 32f8681: Prevent repeat attempts to define elements

## 2.6.0

### Minor Changes

- 120b33c: Add play/pause button to slider controls and create SliderControls component in react package

### Patch Changes

- Updated dependencies [120b33c]
  - @boxslider/slider@2.6.0

## 2.5.4

### Patch Changes

- Updated dependencies [bd41ae9]
  - @boxslider/slider@2.5.3

## 2.5.3

### Patch Changes

- Updated dependencies [d009e44]
  - @boxslider/slider@2.5.2

## 2.5.2

### Patch Changes

- Updated dependencies [5dc061a]
  - @boxslider/slider@2.5.1

## 2.5.1

### Patch Changes

- Updated dependencies [09fdef5]
  - @boxslider/slider@2.5.0

## 2.5.0

### Minor Changes

- 511f36c: SliderControls component fixes and improvements.
  - ARIA attributes added to navigation buttons
  - Fix custom index button event listeners
  - Don't apply static aria attributes to custom controls
  - Attributes to control default button labels
  - Better test coverage

## 2.4.0

### Minor Changes

- bfe8ef7: Fix package exports and build scripts

### Patch Changes

- Updated dependencies [bfe8ef7]
  - @boxslider/slider@2.4.0

## 2.3.13 (2024-02-17)

### Bug Fixes

- **examples:** viewport dimensions ([31b59b1](https://github.com/boxslider/slider/packages/components/commit/31b59b1a1760d66577c5a454fff58c0403a5d51f))

## 2.3.12 (2024-02-14)

### Bug Fixes

- **react:** add missing attributes back ([de949f9](https://github.com/boxslider/slider/packages/components/commit/de949f93a5c9becbb392431639a18eeaf33e6a3c))

## 2.3.11 (2024-02-10)

**Note:** Version bump only for package @boxslider/components

## 2.3.10 (2024-01-13)

**Note:** Version bump only for package @boxslider/components

## 2.3.9 (2023-12-31)

**Note:** Version bump only for package @boxslider/components
