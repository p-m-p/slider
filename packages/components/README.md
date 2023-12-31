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

## Available Components

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

component?.slider.next() // Control the slider programmatically

console.log(component.autoScroll) // => true
console.log(component.timeout) // => 2000
console.log(component.timingFunction) // => 'ease-in'
```
