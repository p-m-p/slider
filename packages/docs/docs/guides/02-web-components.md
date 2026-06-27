---
title: Web Components
---

import { CopyPrompt } from '@site/src/components/CopyPrompt'

BoxSlider Web Components provide ready to us slider elements for each slide
effect and the slider controls.

## Installation

The package can be imported as an NPM module or used directly from the package or CDN.

Install via NPM.

```sh
npm i --save @boxslider/components
```

Include the package into the root of your project.

```ts
import '@boxslider/components'
```

Alternatively use from CDN.

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"></script>

<bs-slider-controls>
  <bs-carousel>
    <div>Slide one</div>
    <div>Slide two</div>
    <div>Slide three</div>
  </bs-carousel>
</bs-slider-controls>
```

<CopyPrompt
prompt={`I'm setting up BoxSlider Web Components in my project.

Install: npm i --save @boxslider/components
Then import in your entry file: import '@boxslider/components'

Or use from CDN: <script type="module" src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"></script>

Available web components:

- bs-carousel, bs-cube, bs-fade, bs-tile — slide effects (camelCase options become kebab-case attributes, e.g. autoScroll → auto-scroll)
- bs-slider-controls — navigation buttons, wraps the slider element

Key requirements: The slider element needs display, height, and width set via CSS.

Please provide a complete HTML example with a carousel slider wrapped in bs-slider-controls and the required styles.`}
/>

To import a single component use the individual exports.

```ts
import '@boxslider/components/Carousel'
```

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@boxslider/components/Carousel/+esm"></script>

<bs-carousel>
  <!-- Slides -->
</bs-carousel>
```

## Components

Each slide effect has a matching web component. The options for the slider and the effect are passed as attributes
with hyphens instead of camel case. For example, `autoScroll` becomes `auto-scroll`. View the
[configuration options](/docs/getting-started/configuration) for the available options.

```html
<!-- Example attribute values -->
<bs-carousel speed="500" timing-function="ease-in" cover></bs-carousel>
<bs-cube></bs-cube>
<bs-fade></bs-fade>
<bs-tile></bs-tile>
```

The slider components do not have any controls built in. Use the `bs-slider-controls` component to add navigation
controls to the slider. See the [slider controls](/docs/guides/slider-controls) guide for more information.

```html
<bs-slider-controls>
  <bs-carousel>
    <div>Slide one</div>
    <div>Slide two</div>
    <div>Slide three</div>
  </bs-carousel>
</bs-slider-controls>
```

## Styling

The components do not include any styles by default. The display, width and height style properties need to be set drectly or
with CSS as a minimum for the slider to work. View the [styling guide](/docs/guides/styling) for more information on how to
effectively style the slider components.

```html
<style>
  #slider {
    display: block;
    height: 400px;
    width: 800px;
  }

  .slide {
    height: 100%;
    width: 100%;
  }
</style>

<bs-carousel id="slider">
  <div class="slide">Slide one</div>
  <div class="slide">Slide two</div>
  <div class="slide">Slide three</div>
</bs-carousel>
```

## Properties

Slider effect components have a `slider` attribute that provides access to the BoxSlider instance. Use this property to
control the slider programmatically. Slider options can be accessed as readonly properties on the element.

```ts
// Select the slider element
const component = document.querySelector('bs-fade')

// Control the slider programmatically
component.slider.next()

// Access the slider options as
properties console.log(component.speed)
```

## Events

[Slider events](/docs/getting-started/api#events) can be listened for by adding event handlers to the
slider element.

```ts
// Select the slider element
const component = document.querySelector('bs-fade')

// Add an event listener
component.addEventListener('before', (ev) => {
  console.log(`About to show slide ${ev.detail.nextIndex}`)
})
```
