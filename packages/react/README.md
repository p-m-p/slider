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

Each component has optional props for the BoxSlider options and the effect options. In addition to these props an
event handler for each slider event can be provided with the naming convention `on<EventName>`.

```tsx
// Example using the core slider library
slider.addEventListener('pause', () => console.log('Slider paused'))

// Equivalent component prop
;<FadeSlider onPause={() => console.log('Slider paused')}>...</FadeSlider>
```

See the [options](https://github.com/p-m-p/slider#options) for all available slider options and
[events](https://github.com/p-m-p/slider#events) for the available events.

## Example usage

```tsx
function doSomethingBefore(ev) {
  console.log(`About to show slide ${ev.nextIndex}`)
}

ReactDOM.render(
  <FadeSlider
    autoScroll
    speed={300}
    className="slider"
    timingFunction="ease-in"
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

To can gain access to the slider instance pass a `sliderRef` and the current value will be set once the component is mounted and the slider instance is initialised.

```tsx
function Slider() {
  const sliderRef = useRef(null)

  return (
    <div>
      <CarouselSlider sliderRef={sliderRef}>
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
