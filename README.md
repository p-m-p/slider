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

## Installation

Install from NPM

```sh
npm install --save @boxslider/slider
```

Use from CDN

```html
<script type="module">
  import { createCarouselSlider } from 'https://esm.sh/@boxslider/slider'

  createCarouselSlider('#slider')
</script>
```

### React

Install via NPM

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

View the [React guide](https://philparsons.co.uk/slider/docs/guides/react) for full details

### Web Components

Install via NPM

```sh
npm install --save @boxslider/components
```

Use from CDN

```html
<script type="module" src="https://esm.sh/@boxslider/components"></script>

<bx-slider-controls>
  <bs-carousel>
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </bs-carousel>
</bx-slider-controls
```

View the [web components guide](https://philparsons.co.uk/slider/docs/guides/web-components) for full details.
