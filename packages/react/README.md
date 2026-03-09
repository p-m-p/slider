# `@boxslider/react`

React components for the [BoxSlider](https://github.com/p-m-p/slider) library. Wraps the
[web components](https://www.npmjs.com/package/@boxslider/components) package to provide
idiomatic React integration with typed props and event handlers.

View the [React guide](https://philparsons.co.uk/slider/docs/guides/react) for full
documentation.

## Requirements

- React 19 or later

## Installation

```sh
npm install --save @boxslider/react
```

## Usage

Wrap a slider component with `SliderControls` to add navigation buttons and index pips
automatically, or use a slider component on its own if you want to build your own controls.

```tsx
import { SliderControls, CarouselSlider } from '@boxslider/react'

function MySlider() {
  return (
    <SliderControls>
      <CarouselSlider autoScroll timeout={4000}>
        <div>Slide one</div>
        <div>Slide two</div>
        <div>Slide three</div>
      </CarouselSlider>
    </SliderControls>
  )
}
```

## Components

All slider components accept the [common slider props](#common-slider-props) listed below plus any
effect-specific props.

### `<CarouselSlider>`

Slides move horizontally in sequence. Supports drag-based progressive transitions.

```tsx
<CarouselSlider
  cover={false}
  timingFunction="ease-in-out"
>
  ...
</CarouselSlider>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `cover` | `boolean` | `false` | Cover mode — slides stack over each other |
| `timingFunction` | `string` | `'ease-out'` | CSS easing function |

### `<CubeSlider>`

Slides rotate in 3D like faces of a cube.

```tsx
<CubeSlider direction="horizontal" perspective={1000}>
  ...
</CubeSlider>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Rotation axis |
| `perspective` | `number` | `1000` | CSS perspective value in pixels |

### `<FadeSlider>`

Slides cross-fade in and out.

```tsx
<FadeSlider timingFunction="ease-in">
  ...
</FadeSlider>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `timingFunction` | `string` | `'ease-in-out'` | CSS easing function |

### `<TileSlider>`

The current slide breaks into tiles that flip or fade to reveal the next slide.

```tsx
<TileSlider rows={8} rowOffset={50} tileEffect="flip">
  ...
</TileSlider>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `rows` | `number` | `8` | Number of tile rows |
| `rowOffset` | `number` | `50` | Stagger delay between rows in milliseconds |
| `tileEffect` | `'flip' \| 'fade'` | `'flip'` | Tile transition style |

### `<SliderControls>`

Provides previous/next buttons, a play/pause button and index pips for the slider placed in its
default slot. Accepts optional label overrides for accessibility.

```tsx
<SliderControls
  prevBtnLabel="Previous slide"
  nextBtnLabel="Next slide"
  playBtnLabel="Start auto scroll"
  pauseBtnLabel="Stop auto scroll"
  indexLabel="Select a slide"
  indexBtnLabel="View slide %d"
>
  <CarouselSlider>...</CarouselSlider>
</SliderControls>
```

## Common slider props

All slider components accept these props in addition to their effect-specific props:

| Prop | Type | Default | Description |
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

## Event handlers

```tsx
import { useRef } from 'react'
import type { BoxSlider } from '@boxslider/slider'
import { CarouselSlider } from '@boxslider/react'

function MySlider() {
  const sliderRef = useRef<BoxSlider>(null)

  return (
    <CarouselSlider
      sliderRef={sliderRef}
      onBefore={({ currentIndex, nextIndex }) =>
        console.log(`Slide ${currentIndex} → ${nextIndex}`)
      }
      onAfter={({ currentIndex }) =>
        console.log(`Now showing slide ${currentIndex}`)
      }
      onPlay={() => console.log('Auto scroll started')}
      onPause={() => console.log('Auto scroll paused')}
    >
      <div>Slide one</div>
      <div>Slide two</div>
      <div>Slide three</div>
    </CarouselSlider>
  )
}
```

| Prop | Description |
|---|---|
| `sliderRef` | React ref that receives the underlying `BoxSlider` instance |
| `onAfter` | Called after a slide transition completes |
| `onBefore` | Called before a slide transition begins |
| `onDestroy` | Called when the slider is destroyed |
| `onPause` | Called when auto scrolling is paused |
| `onPlay` | Called when auto scrolling starts |
| `onReset` | Called when the slider is reset |
