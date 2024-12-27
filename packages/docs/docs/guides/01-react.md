---
title: React
---

BoxSlider React components are a thin wrapper around the [Web Components](/docs/guides/web-components) for each
slide effect and the slider controls.

## Installation

```sh
npm i --save @boxslider/react@latest
```

## Components

Each slide effect has a matching React component. The options for the slider and the effect are passed as props.
View the [configuration options](/docs/getting-started/configuration) for the available options.

```tsx
// Example prop types
<CarouselSlider speed={500} timingFunction="ease-in" cover>{children}</CarouselSlider>
<CubeSlider />
<FadeSlider />
<TileSlider />
```

The slider components do not have any controls built in. Use the `SliderControls` component to add navigation
controls to the slider. See the [slider controls](/docs/guides/slider-controls) guide for more information.

```tsx
<SliderControls>
  <CarouselSlider>
    <div>Slide one</div>
    <div>Slide two</div>
    <div>Slide three</div>
  </CarouselSlider>
</SliderControls>
```

## Styling

The components do not include any styles by default. The display, width and height style properties need to be set
as a minimum for the slider to work. View the [styling guide](/docs/guides/styling) for more information on how to
effectively style the slider components.

```tsx
const sliderStyles = {
  display: 'block',
  height: '400px',
  width: '800px'
}

const slideStyles = {
  height: '100%',
  width: '100%'
}

<CarouselSlider style={sliderStyles}>
  <div style={slideStyles}>Slide 1</div>
  <div style={slideStyles}>Slide 2</div>
  <div style={slideStyles}>Slide 3</div>
</CarouselSlider>
```

## Events

Handlers for [slider events](/docs/getting-started/api#events) can be provided in props with the
naming convention `on<EventName>`.

```tsx
function MySlider({ children }) {
  const handlePause = () => console.log('Slider paused')

  return <FadeSlider onPause={handlePause}>{children}</FadeSlider>
}
```

## `sliderRef` prop

To gain access to the BoxSlider instance pass a ref to the `sliderRef` props. The current value
of the ref will be set once the component is mounted and the slider instance is initialised. View
the [API reference](/docs/getting-started/api) for more information on the available methods.

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
