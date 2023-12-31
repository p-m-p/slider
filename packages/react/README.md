# BoxSlider React

React components for the [BoxSlider](https://github.com/p-m-p/slider) library effects.

## Installation

```sh
npm i --save @boxslider/react`
```

## Available Components

Each slide effect has a matching React component. The documentation for the `effectOptions` prop can be found on the
main plugin site. The documentation is linked for each option below.

- `<CarouselSlider />` [documentation](https://github.com/p-m-p/slider#carouselslider)
- `<CubeSlider />` [documentation](https://github.com/p-m-p/slider#cubeslider)
- `<FadeSlider />` [documentation](https://github.com/p-m-p/slider#fadeslider)
- `<TileSlider />` [documentation](https://github.com/p-m-p/slider#tileslider)

## Component props

Each effect component has the `sliderOptions` and `effectOptions` props. You can supply the setting
to tailor the slider and effect behaviour to suit your application needs. In addition to these props
there is the `slideIndex` prop that can be used to navigate the slider to a slide index. Each slider
event is available as props with the naming convention `on<Event>`.

```tsx
// Example using the core slider library
slider.addEventListener('pause', () => console.log('Slider paused'))

// Equivalent component prop
;<FadeSlider onPause={() => console.log('Slider paused')}>...</FadeSlider>
```

See the [events](https://github.com/p-m-p/slider#events) section of the main library page for all available events.

## Example usage

```tsx
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
  <FadeSlider
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
  </FadeSlider>,
  document.getElementById('root'),
)
```

### sliderRef prop

If needed, you can gain access to the slider instance via the `sliderRef` prop. Pass a `ref` and the current value will be set once the component is mounted and the slider instance is initialised.

```tsx
function Slider() {
  // You can wrap the slider options with useMemo or useState so that it does
  // not change between render calls and cause the carousel slider to be reset
  const options = useMemo(() => ({ autoScroll: false, speed: 300 }), [])
  const sliderRef = useRef(null)

  return (
    <div>
      <CarouselSlider sliderOptions={options} sliderRef={sliderRef}>
        <div>Slide one</div>
        <div>Slide two</div>
        <div>Slide three</div>
        <div>Slide four</div>
        <div>Slide five</div>
      </CarouselSlider>
      <button onClick={() => sliderRef.current?.prev()}>Previous slide</button>
      <button onClick={() => sliderRef.current?.next()}>Next slide</button>
    </div>
  )
}
```
