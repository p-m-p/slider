# `@boxslider/slider`

The [BoxSlider](https://github.com/p-m-p/slider) core JavaScript library. A modern, lightweight
content slider with multiple transition effects and zero dependencies.

View the [JavaScript guide](https://philparsons.co.uk/slider/docs/guides/javascript) for full
documentation.

## Installation

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

## Usage

BoxSlider provides factory functions for each transition effect. Add child elements to your slider
container — each direct child becomes a slide.

```html
<div id="slider">
  <div>Slide one</div>
  <div>Slide two</div>
  <div>Slide three</div>
</div>
```

```js
import { createCarouselSlider } from '@boxslider/slider'

const slider = createCarouselSlider('#slider', {
  autoScroll: true,
  timeout: 5000,
  speed: 800,
})
```

### Slider options

All factory functions accept the following common options as part of their options argument:

| Option | Type | Default | Description |
|---|---|---|---|
| `autoScroll` | `boolean` | `true`* | Automatically scroll through slides |
| `loop` | `boolean` | `true` | Loop from last slide back to first |
| `pauseOnHover` | `boolean` | `true`* | Pause auto scroll when mouse hovers |
| `speed` | `number` | `800` | Transition duration in milliseconds |
| `startIndex` | `number` | `0` | Index of the first slide to show |
| `swipe` | `boolean` | `true` | Enable touch/swipe navigation |
| `swipeTolerance` | `number` | `30` | Minimum drag distance in pixels to initiate a swipe |
| `timeout` | `number` | `5000` | Milliseconds between auto scroll transitions |

_\* Automatically disabled when the user has `prefers-reduced-motion` set._

## Transition effects

### Carousel

Slides move horizontally in sequence. Supports drag-based progressive transitions.

```js
import { createCarouselSlider } from '@boxslider/slider'

const slider = createCarouselSlider('#slider', {
  cover: false,         // cover mode — slides stack over each other
  timingFunction: 'ease-in-out', // CSS easing function
})
```

### Cube

Slides rotate in 3D like faces of a cube.

```js
import { createCubeSlider } from '@boxslider/slider'

const slider = createCubeSlider('#slider', {
  direction: 'horizontal', // 'horizontal' | 'vertical'
  perspective: 1000,       // CSS perspective value in pixels
})
```

### Fade

Slides cross-fade in and out.

```js
import { createFadeSlider } from '@boxslider/slider'

const slider = createFadeSlider('#slider', {
  timingFunction: 'ease-in', // CSS easing function
})
```

### Tile

The current slide breaks into tiles that flip or fade to reveal the next slide.

```js
import { createTileSlider } from '@boxslider/slider'

const slider = createTileSlider('#slider', {
  rows: 8,           // number of tile rows
  rowOffset: 50,     // stagger delay between rows in milliseconds
  tileEffect: 'flip', // 'flip' | 'fade'
})
```

## Event listeners

```js
slider.addEventListener('before', ({ currentIndex, nextIndex, speed }) => {
  console.log(`Transitioning from slide ${currentIndex} to ${nextIndex}`)
})

slider.addEventListener('after', ({ currentIndex, speed }) => {
  console.log(`Now showing slide ${currentIndex}`)
})

slider.addEventListener('play', () => console.log('Auto scroll started'))
slider.addEventListener('pause', () => console.log('Auto scroll paused'))
slider.addEventListener('destroy', () => console.log('Slider destroyed'))
slider.addEventListener('reset', () => console.log('Slider reset'))
```

## BoxSlider API

```js
slider.next()               // go to the next slide
slider.prev()               // go to the previous slide
slider.skipTo(2)            // jump to slide at index 2
slider.play()               // start auto scrolling
slider.pause()              // stop auto scrolling
slider.reset()              // rebuild the slider (e.g. after DOM changes)
slider.destroy()            // tear down the slider and restore original DOM

slider.activeIndex          // index of the currently visible slide
slider.length               // total number of slides
slider.getOption('speed')   // read a current option value
```
