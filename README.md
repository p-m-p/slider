<p align="center">
  <picture>
    <source srcset="assets/logo-medium-dark.webp" media="(prefers-color-scheme: dark)">
    <img src="assets/logo-medium.webp" width="480" alt="Box Slider">
  </picture>
</p>
<p align="center">
    A modern, light weight content slider
</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@boxslider/slider"><img alt="NPM Status" src="https://img.shields.io/npm/v/@boxslider/slider.svg?style=flat"></a>
    <img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/p-m-p/slider/ci-build.yml?branch=main">
</p>

## About

BoxSlider is a small library with zero dependencies that provides a light-weight, responsive content slider with
various slide transition effects for modern browsers.

The library can be used standalone or by using the Web and React components.

## Installation

Install the module from NPM or a CDN.

```sh
npm install --save @boxslider/slider
```

```html
<script type="module">
  import {
    BoxSlider,
    FadeSlider,
  } from 'https://cdn.jsdelivr.net/npm/@boxslider/slider/+esm'

  const slider = new BoxSlider(
    document.getElementById('slider'),
    new FadeSlider(),
  )
</script>
```

### Web Components

```sh
npm install --save @boxslider/components
```

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"></script>
```

iew the [@boxslider/components](https://github.com/p-m-p/slider/tree/main/packages/components/README.md)
package for full details.

### React

```sh
npm install --save @boxslider/react
```

View the [@boxslider/react](https://github.com/p-m-p/slider/tree/main/packages/react/README.md)
package for full details. Eact React component is a thin wrapper around the Web Component for that effect.

### Browser global

The core library can also be imported as a minified script from '@boxslider/slider/dist/boxslider.min.js'
(`https://cdn.jsdelivr.net/npm/@boxslider/slider/dist/boxslider.min.js`) where all exports are available on
the `$bs` global.

```javascript
const boxslider = new $bs.BoxSlider(
  document.querySelector('#slider'),
  new $bs.FadeSlider(),
)
```

## Usage

Create the HTML structure for your content. Some effects require each slide to only
contain an image but others support any form of content. See the documentation for
the desired effect for detailed instructions.

```html
<section id="content-box">
  <!-- the content box -->
  <figure>
    <!-- slide one -->
    <picture>
      <source srcset="one-680.jpg" media="(min-width: 800px)" />
      <img src="one.jpg" />
    </picture>
    <figcaption>This is slide one</figcaption>
  </figure>
  <figure>
    <!-- slide two -->
    <picture>
      <source srcset="two-680.jpg" media="(min-width: 800px)" />
      <img src="two.jpg" />
    </picture>
    <figcaption>This is slide two</figcaption>
  </figure>
  <figure>
    <!-- slide three -->
    <picture>
      <source srcset="three-680.jpg" media="(min-width: 800px)" />
      <img src="three.jpg" />
    </picture>
    <figcaption>This is slide three</figcaption>
  </figure>
</section>
```

To initialize the slider from JavaScript select the box and create a new `BoxSlider` instance with
the desired settings and effect.

```javascript
import { BoxSlider, FadeSlider } from '@boxslider/slider'

const options = {
  autoScroll: true,
  timeout: 5000,
}
const box = document.querySelector('#content-box')

// Create a fading slide transition that moves to the next slide every 5 seconds (5000ms)
const slider = new BoxSlider(box, new FadeSlider(), options)

// Call API methods on the slider to manipulate it see documentation for available actions
slider.next().then(() => {
  // Promise resolves when the box has transitioned to the next slide
})
```

### Options

- `speed: number (default: 800)` The time interval in milliseconds within which the
  slide animation will complete
- `autoScroll: boolean (default: true)` Set true to automatically transition through
  the slides
- `timeout: number (default: 5000)` The time interval between slide transitions. For use
  with autoScroll
- `pauseOnHover: boolean (default: false)` Pause an auto-scrolling slider when the users
  mouse hovers over it. For use with autoScroll or a slider in play mode.
- `swipe: boolean (default: true)` Enable swiping the box to navigate to the next or
  previous slide.
- `swipeTolerance: number (default 30)` The number of pixels between the pointer down
  and pointer up events during the swipe action that will trigger the transition.

### Effect Options

#### CubeSlider

- `direction: 'horizontal' | 'vertical' (default: horizontal)` The direction in which the
  cube should rotate to the next slide.
- `perspective: number (default: 1000)` The perspective to apply to the parent viewport
  element containing the box.

#### FadeSlider

- `timingFunction: string (default: ease-in)` The CSS transition timing function to use
  when fading slide opacity.

#### TileSlider

- `tileEffect: 'fade' | 'flip' (default: flip)` The transition effect for animating the tiles during
  slide transitions.
- `rows: number (default: 8)` The number of tile rows into which the slide should
  be split
- `rowOffset: number (default: 50)` The time offset for starting to animate the tiles
  in a row

#### CarouselSlider

- `timingFunction: string (default: ease-in-out)` The CSS transition timing function to use
  when animating slides into position.
- `cover: boolean (default: false)` If true sets the slide effect to cover over the previous slide.

### Methods

#### `skipTo`

Shows a slide at the specified index starting from 0. Returns a promise that resolves
when the transition is complete.

```javascript
slider.skipTo(3).then(() => {
  // show 4th slide
  // transition complete
})
```

#### `play`

Start auto scrolling the slides

```javascript
slider.play()
```

#### `pause`

Pause an already auto scrolling slider

```javascript
slider.pause()
```

#### `destroy`

Destroys the slider and returns the HTML elements to their original state.

```javascript
slider.destroy()
```

#### `next`

Moves the slider to the next slide. Returns a promise that resolves when the transition
is complete.

```javascript
slider.next().then(() => {
  // transition complete
})
```

#### `prev`

Moves the slider to the previous slide. Returns a promise that resolves when the
transition is complete.

```javascript
slider.prev().then(() => {
  // transition complete
})
```

#### `reset`

Re-initialises the slider with updated options. An updated effect may also be
passed as the second parameter.

```javascript
slider.reset(options, effect)
```

#### `addEventListener`

Adds a listener for the specified event. See the event documentation for the available
events.

```javascript
const afterTransitionListener = () => {
  // Take some action when the event occurs
}

slider.addEventListener('after', afterTransitionListener)
```

#### `removeEventListener`

Removes the listener for the specified event.

```javascript
slider.removeEventListener('after', afterTransitionListener)
```

### Events

#### `before`

Fires before each slide transition starts. The current and next indexes are supplied in the
event data as well as the transition speed.

```javascript
slider.addEventListener('before', (data) => {
  // data: {
  //   currentIndex: number
  //   nextIndex: number
  //   speed: number
  // }
})
```

#### `after`

Fires after each slide transition is complete. The active index is supplied in the event
data

```javascript
slider.addEventListener('after', (data) => {
  // data: {
  //   currentIndex: number
  //   speed: number
  // }
})
```

#### `play`

Fires when the slider is put into play mode.

```javascript
slider.addEventListener('play', (data) => {
  // data: {
  //   currentIndex: number
  //   speed: number
  // }
})
```

#### `pause`

Fires when an `autoScroll`'ing slider is paused.

```javascript
slider.addEventListener('pause', (data) => {
  // data: {
  //   currentIndex: number
  //   speed: number
  // }
})
```

#### `destroy`

Fires when a slider is destroyed.

```javascript
slider.addEventListener('destroy', () => {
  // No event data
})
```

## Accessibility

The slider will be applied with the `aria-live="off"` attribute when it is the autoScroll state and `aria-live="polite"`
when slide transitions are being controlled externally. Each slide is given the `aria-roledescription="slide"` attribute
but you will need to add `aria-roledescription="carousel"` to the container housing the slider and it's controls. An
example implementation is shown below.

```html
<section class="carousel" aria-roledescription="carousel">
  <div class="slider-controls">
    <button id="prev-slide" aria-controls="demo-slider">Previous slide</button>
    <button id="next-slide" aria-controls="demo-slider">Next slide</button>
    <button id="play" aria-controls="demo-slider">Play</button>
  </div>

  <div class="slider" id="demo-slider">
    <figure class="slide">
      <picture>
        <source srcset="happy-face-680.jpg" media="(min-width: 800px)" />
        <img src="happy-face.jpg" alt="Young boy with a smile on his face" />
      </picture>
    </figure>
    <figure class="slide">
      <img src="sad-face.jpg" alt="Old lady with a sad look on her face" />
    </figure>
    <figure class="slide">
      <img src="shocked-face.jpg" alt="Lady with a look of shock on her face" />
    </figure>
  </div>
</section>

<script>
  const slider = new BoxSlider(
    document.getElementById('demo-slider'),
    new CarouselSlider(),
    {
      autoScroll: false,
    },
  )

  document
    .getElementById('prev-slide')
    .addEventListener('click', () => slider.prev())
  // ... other button controls
</script>
```
