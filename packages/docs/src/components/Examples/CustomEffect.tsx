import { Slider } from '@boxslider/components'
import type { Effect } from '@boxslider/slider'
import { Slides } from './Slides'
import styles from './styles.module.css'
import { SliderControls } from '@boxslider/react'

const effect: Effect = {
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

class CustomSlider extends Slider {
  connectedCallback() {
    this.init(effect)
  }
}

if (
  typeof customElements !== 'undefined' &&
  !customElements.get('custom-slider')
) {
  customElements.define('custom-slider', CustomSlider)
}

export function CustomEffect() {
  return (
    <SliderControls className={styles.controls}>
      <div className={styles.viewport}>
        <custom-slider className={styles.slider} speed={300}>
          <Slides />
        </custom-slider>
      </div>
    </SliderControls>
  )
}
