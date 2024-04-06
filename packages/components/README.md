# BoxSlider Components

Web components for the [BoxSlider](https://github.com/p-m-p/slider) library effects.

## Installation

```sh
npm i --save @boxslider/components
```

Include the package in your bundle.

```ts
import '@boxslider/components'
```

Use from CDN

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"></script>

<bs-carousel>
  <!-- Slides -->
</bs-carousel>
```

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

## Available Slider Components

Each slide effect has a matching web component. Each component element has both the `BoxSlider`
and effect options as properties. These options can also be set using attributes with hyphens
where the option is camel cased, e.g ` startIndex` becomes `start-index`.
The documentation is linked for each effect below.

- `<bs-carousel></bs-carousel>` [documentation](https://github.com/p-m-p/slider#carouselslider)
- `<bs-cube></bs-cube>` [documentation](https://github.com/p-m-p/slider#cubeslider)
- `<bs-fade></bs-fade>` [documentation](https://github.com/p-m-p/slider#fadeslider)
- `<bs-tile></bs-tile>` [documentation](https://github.com/p-m-p/slider#tileslider)

## Example usage

```html
<bs-fade auto-scroll="true" timeout="2000" timing-function="ease-in">
  <div>Slide One</div>
  <div>Slide Two</div>
  <div>Slide Three</div>
  <div>Slide Four</div>
  <div>Slide Five</div>
</bs-fade>
```

```ts
const component = document.querySelector('bs-fade')

component?.slider?.next() // Control the slider programmatically

// Access the slider component readonly props
console.log(component.autoScroll) // => true
console.log(component.timeout) // => 2000
console.log(component.timingFunction) // => 'ease-in'
```

## Slider controls

The `<bs-slider-controls>` component wraps a slider to provide navigation
and slide index buttons.

```html
<bs-slider-controls>
  <bs-carousel auto-scroll="false" timeout="5000" cover>
    <div class="slide">Slide One</div>
    <div class="slide">Slide Two</div>
    <div class="slide">Slide Three</div>
    <div class="slide">Slide Four</div>
    <div class="slide">Slide Five</div>
  </bs-carousel>
</bs-slider-controls>
```

Button labels for the default controls can be set via attributes. The
`index-btn-label` attribute may include a `%d` placeholder for the slide number.

```html
<bs-slider-controls
  prev-btn-label="Show previous slide"
  next-btn-label="Show next slide"
  index-btn-label="Go to slide %d">
  <!-- slider content --->
</bs-slider-controls>
```

Slots for the controls are available if you want to provide your own and
these will be activated with event listeners to control the slider for you.

```html
<bs-slider-controls>
  <bs-carousel auto-scroll="false" timeout="5000" cover>
    <div class="slide">Slide One</div>
    <div class="slide">Slide Two</div>
    <div class="slide">Slide Three</div>
    <div class="slide">Slide Four</div>
    <div class="slide">Slide Five</div>
  </bs-carousel>

  <button slot="next-btn">Next</button>
  <button slot="prev-btn">Previous</button>

  <div slot="index">
    <button>View slide one</button>
    <button>View slide two</button>
    <button>View slide three</button>
    <button>View slide four</button>
    <button>View slide five</button>
  </div>
</bs-slider-controls>
```

To style the provided navigation and index buttons either import the default
stylesheet from `@boxslider/components/style/slider-controls.css` and provide
custom properties or target the provided parts for fully custom styles.

```css
:root {
  /* Positioning of the index buttons under the slider */
  --bs-index-justify: center;

  /* Index button colors and size */
  --bs-index-btn-active-color: black;
  --bs-index-btn-color: rgb(0 0 0 / 40%);
  --bs-index-btn-size: 1rem;

  /* Navigation button colors and size */
  --bs-nav-btn-bg: rgb(0 0 0 / 5%);
  --bs-nav-btn-hover-bg: rgb(255 255 255 / 25%);
  --bs-nav-btn-color: rgb(0 0 0 / 40%);
  --bs-nav-btn-hover-color: rgb(0 0 0 / black);
  --bs-nav-btn-height: 2.5rem;
  --bs-nav-btn-padding: 0.5rem;
  --bs-nav-btn-width: 3rem;
}
```

Below is the template for the slider controls showing the available parts.

```html
<div part="container">
  <div part="slider">
    <slot id="slider"></slot>
  </div>

  <div part="controls">
    <slot name="prev-btn">
      <button
        part="prev-btn nav-btn"
        type="button"
        aria-label="Previous"></button>
    </slot>
    <slot name="next-btn">
      <button part="next-btn nav-btn" type="button" aria-label="Next"></button>
    </slot>
  </div>

  <slot name="index" part="index"></slot>
</div>
```

As an example, to style the navigation buttons create a selector to target
the `nav-btn` part.

```css
bs-slider-controls::part(nav-btn) {
  background: red;
  color: white;
}
```
