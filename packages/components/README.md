# `@boxslider/components`

Web components for the [BoxSlider](https://philparsons.co.uk/slider/) library. Framework-agnostic
custom elements that work in any modern browser or JavaScript framework.

View the [web components guide](https://philparsons.co.uk/slider/docs/guides/web-components) for
full documentation.

## Installation

Install from NPM:

```sh
npm install --save @boxslider/components
```

Use from CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"></script>
```

## Usage

Add child elements to a slider element — each direct child becomes a slide. Wrap the slider in
`<bs-slider-controls>` to add navigation buttons and index pips automatically.

```html
<bs-slider-controls>
  <bs-carousel>
    <div>Slide one</div>
    <div>Slide two</div>
    <div>Slide three</div>
  </bs-carousel>
</bs-slider-controls>
```

## Slider elements

All slider elements support the [common attributes](#common-attributes) listed below plus any
effect-specific attributes.

### `<bs-carousel>`

Slides move horizontally in sequence. Supports drag-based progressive transitions.

```html
<bs-carousel timing-function="ease-in-out" cover="false">
  ...
</bs-carousel>
```

| Attribute | Type | Default | Description |
|---|---|---|---|
| `cover` | `boolean` | `false` | Cover mode — slides stack over each other |
| `timing-function` | `string` | `'ease-out'` | CSS easing function |

### `<bs-cube>`

Slides rotate in 3D like faces of a cube.

```html
<bs-cube direction="horizontal" perspective="1000">
  ...
</bs-cube>
```

| Attribute | Type | Default | Description |
|---|---|---|---|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Rotation axis |
| `perspective` | `number` | `1000` | CSS perspective value in pixels |

### `<bs-fade>`

Slides cross-fade in and out.

```html
<bs-fade timing-function="ease-in">
  ...
</bs-fade>
```

| Attribute | Type | Default | Description |
|---|---|---|---|
| `timing-function` | `string` | `'ease-in-out'` | CSS easing function |

### `<bs-tile>`

The current slide breaks into tiles that flip or fade to reveal the next slide.

```html
<bs-tile rows="8" row-offset="50" tile-effect="flip">
  ...
</bs-tile>
```

| Attribute | Type | Default | Description |
|---|---|---|---|
| `rows` | `number` | `8` | Number of tile rows |
| `row-offset` | `number` | `50` | Stagger delay between rows in milliseconds |
| `tile-effect` | `'flip' \| 'fade'` | `'flip'` | Tile transition style |

### `<bs-slider-controls>`

Provides previous/next buttons, a play/pause button and index pips for the slider in its default
slot. Accepts optional attributes to override button labels for accessibility.

```html
<bs-slider-controls
  prev-btn-label="Previous slide"
  next-btn-label="Next slide"
  play-btn-label="Start auto scroll"
  pause-btn-label="Stop auto scroll"
  index-label="Select a slide"
  index-btn-label="View slide %d"
>
  <bs-carousel>...</bs-carousel>
</bs-slider-controls>
```

Add the `unstyled` attribute to opt out of the built-in styles and apply your own:

```html
<bs-slider-controls unstyled>
  ...
</bs-slider-controls>
```

## Common attributes

All slider elements support these attributes in addition to their effect-specific attributes:

| Attribute | Type | Default | Description |
|---|---|---|---|
| `auto-scroll` | `boolean` | `true`* | Automatically scroll through slides |
| `loop` | `boolean` | `true` | Loop from last slide back to first |
| `pause-on-hover` | `boolean` | `true`* | Pause auto scroll when mouse hovers |
| `speed` | `number` | `800` | Transition duration in milliseconds |
| `start-index` | `number` | `0` | Index of the first slide to show |
| `swipe` | `boolean` | `true` | Enable touch/swipe navigation |
| `swipe-tolerance` | `number` | `30` | Minimum drag distance in pixels to initiate a swipe |
| `timeout` | `number` | `5000` | Milliseconds between auto scroll transitions |

_\* Automatically disabled when the user has `prefers-reduced-motion` set._

## Events

All slider elements dispatch the following custom events:

| Event | Detail | Description |
|---|---|---|
| `before` | `{ currentIndex, nextIndex, speed }` | Fired before a slide transition begins |
| `after` | `{ currentIndex, speed }` | Fired after a slide transition completes |
| `play` | `{ currentIndex, speed }` | Fired when auto scrolling starts |
| `pause` | `{ currentIndex, speed }` | Fired when auto scrolling is paused |
| `destroy` | — | Fired when the slider is destroyed |
| `reset` | — | Fired when the slider is reset |

```js
const slider = document.querySelector('bs-carousel')

slider.addEventListener('before', (ev) => {
  const { currentIndex, nextIndex } = ev.detail
  console.log(`Slide ${currentIndex} → ${nextIndex}`)
})
```
