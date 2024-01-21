import { BoxSlider, FadeSlider } from '.'

const el = document.getElementById('slider')

if (el) {
  const slider = new BoxSlider(el, new FadeSlider(), { autoScroll: false })

  document
    .getElementById('next')
    ?.addEventListener('click', () => slider.next())
  document
    .getElementById('prev')
    ?.addEventListener('click', () => slider.prev())
}
