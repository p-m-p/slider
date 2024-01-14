const ts = `import { BoxSlider, FadeSlider } from '@boxslider/slider'

const slider = new BoxSlider(document.querySelector('#slider'), {
  effect: new FadeSlider(),
  speed: 300,
})`

const react = `import { FadeSlider } from '@boxslider/react'

export function Slider() {
  const slideStyles = { height: '100%', width: '100%' }

  return (
    <FadeSlider style={{ height: '400px', width: '800px' }}>
      <div style={slideStyles}>Slide one</div>
      <div style={slideStyles}>Slide two</div>
      <div style={slideStyles}>Slide three</div>
    </FadeSlider>
  )
}
`
const html = `<html>
<head>
  <style>
    #slider {
      height: 400px;
      width: 800px;
    }

    .slide {
      height: 100%;
      width: 100%;
    }
  </style>
</head>
<body>
  <div id="slider">
    <div class="slide">Slide one</div>
    <div class="slide">Slide two</div>
    <div class="slide">Slide three</div>
  </div>

  <script src="/node_modules/@boxslider/slider/dist/browser/index.min.js"></script>
  <script>
    new $bs.BoxSlider(document.querySelector('#slider'), {
      autoScroll: true,
      effect: new $bs.FadeSlider()
    })
  </script>
</body>
</html>
`

export default { html, react, ts }
