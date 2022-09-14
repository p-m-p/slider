# BoxSlider React

React components for the [BoxSlider](https://github.com/boxslider/slider) library effects.

## Installation

`npm i --save @boxslider/react`

## Available Components

Each slide effect has a matching React component. The documentation for the `effectOptions` prop can be found on the
main plugin site. The documentation is linked for each option below.

- `<BxlCarouselSlider />` [documentation](https://github.com/boxslider/slider#carouselslider)
- `<BxlCubeSlider />` [documentation](https://github.com/boxslider/slider#cubeslider)
- `<BxlFadeSlider />` [documentation](https://github.com/boxslider/slider#fadeslider)
- `<BxlTileSlider />` [documentation](https://github.com/boxslider/slider#tileslider)

## Component props

Each effect component has the `sliderOptions` and `effectOptions` props. You can supply the setting
to tailor the slider and effect behaviour to suit your application needs. In addition to these props
there is the `slideIndex` prop that can be used to navigate the slider to a slide index. Each slider
event is available as props with the naming convention `on<Event>`.

```jsx
// Example using the core slider library
slider.addEventListener('pause', () => console.log('Slider paused'))

// Equivalent component prop
;<BxlFadeSlider onPause={() => console.log('Slider paused')} />
```

See the [events](https://github.com/boxslider/slider#events) section of the main library page for all available events.

## Example usage

```jsx
const options = {
  autoScroll: false,
  speed: 300,
}

const effectOptions = {
  timingFunction: 'ease-in',
}

function doSomethingBefore(ev) {
  console.log(`About to show slide ${ev.nextIndex}`)
}

ReactDOM.render(
  <BxlFadeSlider
    sliderOptions={options}
    effectOptions={effectOptions}
    slideIndex={3}
    className={'slider'}
    onBefore={doSomethingBefore}>
    <div>Slide one</div>
    <div>Slide two</div>
    <div>Slide three</div>
    <div>Slide four</div>
    <div>Slide five</div>
  </BxlFadeSlider>,
  document.getElementById('root'),
)
```
