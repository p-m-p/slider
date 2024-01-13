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

// Access the slider component read only props
console.log(component.autoScroll) // => true
console.log(component.timeout) // => 2000
console.log(component.timingFunction) // => 'ease-in'
```

## Slider controls (🧰 Beta)

The `<bs-slider-controls>` web component wraps a slider component and provides navigation buttons
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

The slider controls component has slots for the controls if you want to provide your own and
will activate the click handlers to control the slider for you.

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

To style the provided navigation and index buttons you can import the default
stylesheet and provide the custom properties to controls the colors and sizes or
target the parts for custom styling.

Below is the template for the slider controls.

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

For example, to style the navigation buttons you would target the `nav-btn` part.

```css
bs-slider-controls::part(nav-btn) {
  background: red;
  color: white;
}
```
