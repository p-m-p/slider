---
'@boxslider/components': minor
---

Add global HTMLElementTagNameMap declarations for BoxSlider web components

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
