import { BoxSlider, TileSlider } from '.'

const el = document.getElementById('slider')

if (el) {
  const slider = new BoxSlider(el, new TileSlider({ tileEffect: 'fade' }), {
    autoScroll: false,
  })

  document
    .getElementById('next')
    ?.addEventListener('click', () => slider.next())
  document
    .getElementById('prev')
    ?.addEventListener('click', () => slider.prev())
}
