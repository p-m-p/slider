import { BoxSlider, TileSlider } from '.'

const el = document.getElementById('slider')

if (el) {
  /*
  const fadeEffect: Effect = {
    initialize(el, slides, options) {
      el.style.setProperty('position', 'relative')
      slides.forEach((slide, index) => {
        const isActive = index === options.startIndex
        slide.style.setProperty('position', 'absolute')
        slide.style.setProperty('visibility', isActive ? 'visible' : 'hidden')
        slide.style.setProperty('opacity', isActive ? '1' : '0')
      })
    },

    async transition({ slides, speed, currentIndex, nextIndex }) {
      slides[nextIndex].style.setProperty('visibility', 'visible')
      const animateOut = slides[currentIndex].animate(
        { opacity: [1, 0], transform: ['scale(1)', 'scale(0.9)'] },
        { duration: speed, fill: 'forwards' },
      )
      const animateIn = slides[nextIndex].animate(
        { opacity: [0, 1], transform: ['scale(0.9)', 'scale(1)'] },
        { duration: speed, fill: 'forwards' },
      )

      await Promise.all([animateIn.finished, animateOut.finished])
      slides[currentIndex].style.setProperty('visibility', 'hidden')
    },

    destroy(_, slides) {
      slides.forEach((slide) => {
        slide.getAnimations().forEach((animation) => animation.cancel())
      })
    },
  }
  */

  const slider = new BoxSlider(
    el,
    new TileSlider({ tileEffect: 'fade', rows: 5 }),
    {
      autoScroll: false,
      loop: false,
      speed: 500,
    },
  )

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
