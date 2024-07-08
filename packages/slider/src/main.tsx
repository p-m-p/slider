import { BoxSlider, CarouselSlider } from '.'

const el = document.getElementById('slider')

if (el) {
  const slider = new BoxSlider(el, new CarouselSlider(), {
    autoScroll: true,
  })

  document
    .getElementById('next')
    ?.addEventListener('click', () => slider.next())
  document
    .getElementById('prev')
    ?.addEventListener('click', () => slider.prev())
  document
    .getElementById('destroy')
    ?.addEventListener('click', () => slider.destroy())
}
