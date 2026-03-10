<p align="center">
  <picture>
    <source srcset="assets/logo-medium-dark.webp" media="(prefers-color-scheme: dark)">
    <img src="assets/logo-medium.webp" width="480" alt="Box Slider">
  </picture>
</p>
<p align="center">A modern, light weight content slider</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@boxslider/slider"><img alt="NPM Status" src="https://img.shields.io/npm/v/@boxslider/slider.svg?style=flat"></a>
  <a href="https://www.jsdelivr.com/package/npm/@boxslider/slider"><img alt="jsDelivr hits" src="https://data.jsdelivr.com/v1/package/npm/@boxslider/slider/badge"></a>
  <img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/p-m-p/slider/ci.yml?branch=main">
</p>

## About

BoxSlider is a small library with zero dependencies that provides a light-weight, responsive content slider with
multiple slide transition effects for modern browsers.

The library can be used standalone or via React and web components. View the [website](https://philparsons.co.uk/slider/)
for full details.

## Packages

### [@boxslider/slider](./packages/slider)

The core JavaScript library. Zero runtime dependencies. Provides factory functions and a `BoxSlider`
class for attaching transition effects to any container element.

Install from NPM:

```sh
npm install --save @boxslider/slider
```

Use from CDN:

```html
<script type="module">
  import { createCarouselSlider } from 'https://cdn.jsdelivr.net/npm/@boxslider/slider/+esm'

  createCarouselSlider('#slider')
</script>
```

**Available effects:** `createCarouselSlider` · `createCubeSlider` · `createFadeSlider` · `createTileSlider`

### [@boxslider/react](./packages/react)

React 19 component wrappers. Provides typed props and event handlers for all slider effects plus a
`SliderControls` component that adds navigation controls automatically.

Install via NPM:

```sh
npm install --save @boxslider/react
```

```tsx
import { SliderControls, CarouselSlider } from '@boxslider/react'

function MySlider() {
  return (
    <SliderControls>
      <CarouselSlider>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </CarouselSlider>
    </SliderControls>
  )
}
```

View the [React guide](https://philparsons.co.uk/slider/docs/guides/react) for full details.

**Available components:** `CarouselSlider` · `CubeSlider` · `FadeSlider` · `TileSlider` · `SliderControls`

### [@boxslider/components](./packages/components)

Framework-agnostic web components. Works in any modern browser or JavaScript framework without
additional configuration.

Install via NPM:

```sh
npm install --save @boxslider/components
```

Use from CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"></script>

<bs-slider-controls>
  <bs-carousel>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </bs-carousel>
</bs-slider-controls>
```

View the [web components guide](https://philparsons.co.uk/slider/docs/guides/web-components) for full details.

**Available elements:** `<bs-carousel>` · `<bs-cube>` · `<bs-fade>` · `<bs-tile>` · `<bs-slider-controls>`
