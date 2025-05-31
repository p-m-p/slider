---
title: JavaScript
---

More advanced users may want to use the core JavaScript library directly. The core library provides
a simple API for creating a slider and manipulating it programmatically. For ready to use components
view the [React](/docs/guides/react) and [Web Components](/docs/guides/web-components) guides.

## Installation

The package can be imported as an NPM module or used from a CDN.

Install via NPM.

```sh
npm install --save @boxslider/slider
```

Alternatively use from CDN.

```html
<script type="module">
  import { createFadeSlider } from 'https://esm.sh/@boxslider/slider'

  createFadeSlider('#slider', { speed: 300 })
</script>
```

## Usage

Create the HTML structure for your slider content.

```html
<section id="slider">
  <div class="slide">Slide one</div>
  <div class="slide">Slide two</div>
  <div class="slide">Slide three</div>
</section>
```

Create a new `BoxSlider` instance with the desired settings and effect. To do this either
use the create slider helper functions or create a new `BoxSlider` instance directly.

The helper functions are a convenient way to create a new slider with either a reference
to the slider element or a CSS selector.

```javascript
import {
  createCarouselSlider,
  createCubeSlider,
  createFadeSlider,
  createTileSlider,
  BoxSlider,
  FadeSlider,
} from '@boxslider/slider'

// Options for the slider
const options = {
  autoScroll: true,
  timeout: 5000,
}

// Create a slider with the carousel slide transition using the helper function
const slider = createCarouselSlider('#slider', options)
// or
const cubeSlider = createCubeSlider('#slider', options)
// or
const fadeSlider = createFadeSlider('#slider', options)
// or
const tileSlider = createTileSlider('#slider', options)

// Call API methods on the slider to control it
await slider.next()

// Alternatively, create a slider with the fade slide transition from the Slider
// and effect directly.
const fadeSlider = new BoxSlider(
  document.getElementById('slider'),
  new FadeSlider(),
  options,
)
```

Use the API methods to control the slider. View the available [configuration options
](/docs/getting-started/configuration) and the [API reference](/docs/getting-started/api)
for more details.

## Styling

For the effects to work correctly the slider and slide elements must be styled with a `height` and `width`
and the slide elements should have an equal height within the slider element.

```css
#slider {
  height: 400px;
  width: 800px;
}

.slide {
  height: 100%;
  width: 100%;
}
```

## Events

[Slider events](/docs/getting-started/api#events) can be listened for by adding event handlers to the
BoxSlider instance.

```ts
// Add an event listener to the BoxSlider instance
slider.addEventListener('after', (ev) => {
  console.log(`Slide ${ev.currentIndex} is now active`)
})
```
