---
title: Svelte
---

Svelte applications can easily integrate the BoxSlider [Web Components](/docs/guides/web-components).

## Installation

```sh
npm i --save @boxslider/components
```

## Components

Svelte has first class support for web components and the best way to use BoxSlider is to use the web components directly
in your Svelte components. The options for the slider and the effect are passed as props. View the
[configuration options](/docs/getting-started/configuration) for the available options.

```tsx
<script>
  import '@boxslider/components'
</script>

<bs-carousel class="slider" speed={500} timingFunction="ease-in" cover>
  <!-- Slides go here -->
</bs-carousel>
```

The slider components do not have any controls built in. Use the `<bs-slider-controls` web component to add navigation
controls to the slider. See the [slider controls](/docs/guides/slider-controls) guide for more information.

```tsx
<script>
  import '@boxslider/components'
</script>

<bs-slider-controls>
  <bs-carousel class="slider" speed={500} timingFunction="ease-in" cover>
    <!-- Slides go here -->
  </bs-carousel>
</bs-slider-controls>
```

## Styling

The components do not include any styles by default. The display, width and height style properties need to be set
as a minimum for the slider to work. View the [styling guide](/docs/guides/styling) for more information on how to
effectively style the slider components.

```tsx
<script>
  import '@boxslider/components'
</script>

<bs-carousel class="slider" speed={500} timingFunction="ease-in" cover>
  <div class="slide">Slide one</div>
  <div class="slide">Slide two</div>
  <div class="slide">Slide three</div>
</bs-carousel>

<style>
  .slider {
    display: block;
    height: 400px;
    width: 800px;
  }

  .slide {
    height: 100%;
    width: 100%;
  }
</style>
```

## Events

Handlers for [slider events](/docs/getting-started/api#events) can be added in the same way as DOM events with
`on:eventname` attributes.

```tsx
<script>
  import '@boxslider/components'

  let slideNumber = 1

  function handleAfter(event) {
    slideNumber = event.detail.currentIndex + 1
  }
</script>

<p>Showing slide {slideNumber}</p>

<bs-carousel
  class="slider"
  speed={500}
  timingFunction="ease-in"
  cover
  on:after={handleAfter}>
  <div class="slide">Slide one</div>
  <div class="slide">Slide two</div>
  <div class="slide">Slide three</div>
</bs-carousel>

<style>
  .slider {
    display: block;
    height: 400px;
    width: 800px;
  }

  .slide {
    height: 100%;
    width: 100%;
  }
</style>
```

## Slider binding

To gain access to the BoxSlider instance add a `this` bindiing to the element. Once the component is mounted the
slider instance is initialised and available as a readonly `slider` property. View the
[API reference](/docs/getting-started/api) for more information on the available methods.

```tsx
<script>
  import { onMount } from 'svelte'
  import '@boxslider/components'

  let carousel

  onMount(() => {
    // BoxSlider instance is available as the slider property on the element
    console.log(carousel.slider)
  })
</script>

<bs-carousel class="slider" bind:this={carousel}>
  <div class="slide">Slide one</div>
  <div class="slide">Slide two</div>
  <div class="slide">Slide three</div>
</bs-carousel>

<style>
  .slider {
    display: block;
    height: 400px;
    width: 800px;
  }

  .slide {
    height: 100%;
    width: 100%;
  }
</style>
```
