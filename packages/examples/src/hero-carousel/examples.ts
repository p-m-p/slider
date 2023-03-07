export const react = `import { CarouselSlider } from "@boxslider/react";

function Slide({ children }) {
  return (
    <div style={{
      alignItems: 'center',
      display: 'flex',
      fontSize: '4rem',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    }}>{children}</div>
  )
}

export default function HeroSlider() {
  return (
    <CarouselSlider style={{ width: '100%', height: '100vh' }}>
      <Slide>Slide one</Slide>
      <Slide>Slide two</Slide>
      <Slide>Slide three</Slide>
      <Slide>Slide four</Slide>
    </CarouselSlider>
  )
}
`

export const html = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Hero Carousel</title>

  <style>
    #slider {
      height: 100vh;
      width: 100%;
    }

    .slide {
      align-items: center;
      display: flex;
      font-size: 4rem;
      height: 100%;
      justify-content: center;
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
  <script src="/node_modules/@boxslider/slider/dist/boxslider.min.js"></script>
  <script>
    new $bs.BoxSlider(document.querySelector('#slider'), {
      effect: new $bs.CarouselSlider()
    })
  </script>
</body>
</html>
`
