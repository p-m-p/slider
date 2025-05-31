---
title: Usage
---

## React

Each slide effect has a matching React component. Import the component for the effect you want to use
and pass the desired options for the slider and effect as props. Slider events can be handled by
passing event handlers with the naming convention `on<EventName>`. See the [React guide](/docs/guides/react)
for more information. Use the `SliderControls` component to add navigation controls to the slider, see the
[slider controls](/docs/guides/slider-controls) guide for more information.

```jsx
import { FadeSlider } from '@boxslider/react'

export function MyComponent() {
  const slideDimensions = { width: '100%', height: '100%' }

  return (
    <SliderControls>
      <FadeSlider
        style={{ width: '600px', height: '400px' }}
        onBefore={(ev) => {
          console.log(`About to show slide ${ev.nextIndex}`)
        }}
        speed={300}
        timingFunction="ease-in-out"
        autoScroll>
        <div style={slideDimensions}>Slide one</div>
        <div style={slideDimensions}>Slide two</div>
        <div style={slideDimensions}>Slide three</div>
      </FadeSlider>
    </SliderControls>
  )
}
```

## Web Components

Each slide effect has a matching web component. Import the component for the effect you want to use
and pass the desired options for the slider and effect as attributes. Slider events can be handled
by adding event listeners to the component element. See the [Web Components guide](/docs/guides/web-components)
for more information. Use the `bs-slider-controls` component to add navigation controls to the slider, see the
[slider controls](/docs/guides/slider-controls) guide for more information.

```html
<script defer type="module" src="https://esm.sh/npm/@boxslider/components">
  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider')

    slider?.addEventListener('before', (ev) => {
      console.log(`About to show slide ${ev.detail.nextIndex}`)
    })
  })
</script>

<bs-slider-controls>
  <bs-carousel id="slider" speed="300" timing-function="ease-in-out">
    <img src="slide-one.jpg" />
    <img src="slide-two.jpg" />
    <img src="slide-three.jpg" />
  </bs-carousel>
</bs-slider-controls>
```

## JavaScript

The core slider package can also be used standalone. To create a slider select the slider element and create
a new `BoxSlider` instance with the desired effect and options. See the [JavaScript guide](/docs/guides/javascript)
for more information.

```javascript
import { createFadeSlider } from '@boxslider/slider'

// Creates a slider with fading slide transition that moves
// to the next slide every 5 seconds (5000ms)
const slider = createFadeSlider('#slider', {
  autoScroll: true,
  timeout: 5000,
  timingFunction: 'ease-in-out',
}
```
