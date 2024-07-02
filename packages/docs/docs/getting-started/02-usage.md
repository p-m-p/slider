---
title: Usage
---

## React

Each slide effect has a matching React component. Import the component for the effect you want to use
and pass the desired options for the slider and effect as props. Slider events can be handled by
passing event handlers with the naming convention `on<EventName>`. See the [React guide](/docs/guides/react)
for more information.

```jsx
import { FadeSlider } from '@boxslider/react'

export function MyComponent() {
  const slideDimensions = { width: '100%', height: '100%' }

  return (
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
  )
}
```

## Web Components

Each slide effect has a matching web component. Import the component for the effect you want to use
and pass the desired options for the slider and effect as attributes. Slider events can be handled
by adding event listeners to the component element. See the [Web Components guide](/docs/guides/web-components)
for more information.

```html
<script
  defer
  type="module"
  src="https://cdn.jsdelivr.net/npm/@boxslider/components/Carousel/+esm">
  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider')

    slider?.addEventListener('before', (ev) => {
      console.log(`About to show slide ${ev.detail.nextIndex}`)
    })
  })
</script>

<bs-carousel id="slider" speed="300" timing-function="ease-in-out">
  <img src="slide-one.jpg" />
  <img src="slide-two.jpg" />
  <img src="slide-three.jpg" />
</bs-carousel>
```

The web components do not have any styles applied by default so you will need to add your
own styles for the desired dimensions and appearance.

```css
#slider {
  display: block;
  height: 400px;
  width: 600px;
}

#slider img {
  height: 100%;
  width: 100%;
}
```

## JavaScript

Create the HTML structure for your slider. A basic example is shown below but this can be
customized to suit your needs.

```html
<div id="slider">
  <img src="slide-one.jpg" />
  <img src="slide-two.jpg" />
  <img src="slide-three.jpg" />
</div>
```

The slider element can contain any number of slides. Slides should have equal dimensions and this
needs to be applied with a width and height or with CSS.

```css
#slider {
  height: 400px;
  width: 600px;
}

#slider img {
  height: 100%;
  width: 100%;
}
```

To initialize the slider from JavaScript select the slider element and pass it the
`BoxSlider` constructor with the desired effect and options. See the [JavaScript guide](/docs/guides/javascript)
for more information.

```javascript
import { BoxSlider, FadeSlider } from '@boxslider/slider'

// Create a slider with fading slide transition that moves
// to the next slide every 5 seconds (5000ms)
const sliderOptions = {
  autoScroll: true,
  timeout: 5000,
}
const effectOptions = {
  timingFunction: 'ease-in-out',
}
const slider = new BoxSlider(
  document.getElementById('slider'),
  new FadeSlider(effectOptions),
  sliderOptions,
)
```
