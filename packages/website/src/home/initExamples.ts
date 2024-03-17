const ts = `import { BoxSlider, FadeSlider } from '@boxslider/slider'

const slider = new BoxSlider(
  document.getElementById('slider'),
  new FadeSlider(),
  {
    autoScroll: true,
    speed: 300,
    timeout: 5000
  }
)`

const react = `import { FadeSlider } from '@boxslider/react'

export function Slider() {
  const slideStyles = { height: '100%', width: '100%' }

  return (
    <FadeSlider style={{ display: 'block', height: '400px', width: '800px' }}>
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
    bs-carousel {
      display: block;
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
  <bs-carousel>
    <div class="slide">Slide one</div>
    <div class="slide">Slide two</div>
    <div class="slide">Slide three</div>
  </bs-carousel>
  <script type="module" src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"></script>
</body>
</html>
`

export default { html, react, ts }
