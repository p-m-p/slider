import { Slider } from '@boxslider/components'
import {
  cancelAnimations,
  createProgressiveTransition,
  type Effect,
} from '@boxslider/slider'
import { Slides } from './Slides'
import styles from './styles.module.css'
import { SliderControls } from '@boxslider/react'

const effect: Effect = {
  initialize(el, slides, options) {
    el.style.setProperty('position', 'relative')
    slides.forEach((slide, index) => {
      const isActive = index === options.startIndex
      slide.style.setProperty('position', 'absolute')
      slide.style.setProperty('inset', '0')
      slide.style.setProperty('visibility', isActive ? 'visible' : 'hidden')
      slide.style.setProperty('opacity', isActive ? '1' : '0')
    })
  },

  prepareTransition({ slides, speed, currentIndex, nextIndex }) {
    const currentSlide = slides[currentIndex]
    const nextSlide = slides[nextIndex]

    cancelAnimations(currentSlide, nextSlide)

    nextSlide.style.setProperty('visibility', 'visible')
    currentSlide.style.setProperty('opacity', '1')
    currentSlide.style.setProperty('transform', 'scale(1)')
    nextSlide.style.setProperty('opacity', '0')
    nextSlide.style.setProperty('transform', 'scale(0.9)')

    return createProgressiveTransition({
      elements: [currentSlide, nextSlide],
      speed,

      onProgress: (progress) => {
        currentSlide.style.setProperty('opacity', String(1 - progress))
        currentSlide.style.setProperty(
          'transform',
          `scale(${1 - progress * 0.1})`,
        )
        nextSlide.style.setProperty('opacity', String(progress))
        nextSlide.style.setProperty(
          'transform',
          `scale(${0.9 + progress * 0.1})`,
        )
      },

      onComplete: async (fromProgress, remainingDuration) => {
        await Promise.all([
          currentSlide.animate(
            {
              opacity: [String(1 - fromProgress), '0'],
              transform: [`scale(${1 - fromProgress * 0.1})`, 'scale(0.9)'],
            },
            { duration: remainingDuration, fill: 'forwards' },
          ).finished,
          nextSlide.animate(
            {
              opacity: [String(fromProgress), '1'],
              transform: [`scale(${0.9 + fromProgress * 0.1})`, 'scale(1)'],
            },
            { duration: remainingDuration, fill: 'forwards' },
          ).finished,
        ])
      },

      onCancel: async (fromProgress, remainingDuration) => {
        await Promise.all([
          currentSlide.animate(
            {
              opacity: [String(1 - fromProgress), '1'],
              transform: [`scale(${1 - fromProgress * 0.1})`, 'scale(1)'],
            },
            { duration: remainingDuration, fill: 'forwards' },
          ).finished,
          nextSlide.animate(
            {
              opacity: [String(fromProgress), '0'],
              transform: [`scale(${0.9 + fromProgress * 0.1})`, 'scale(0.9)'],
            },
            { duration: remainingDuration, fill: 'forwards' },
          ).finished,
        ])
      },

      onFinish: () => {
        currentSlide.style.setProperty('visibility', 'hidden')
        currentSlide.style.setProperty('opacity', '0')
        currentSlide.style.setProperty('transform', 'scale(0.9)')
        nextSlide.style.setProperty('visibility', 'visible')
        nextSlide.style.setProperty('opacity', '1')
        nextSlide.style.setProperty('transform', 'scale(1)')
      },

      onReset: () => {
        nextSlide.style.setProperty('visibility', 'hidden')
        currentSlide.style.setProperty('opacity', '1')
        currentSlide.style.setProperty('transform', 'scale(1)')
        nextSlide.style.setProperty('opacity', '0')
        nextSlide.style.setProperty('transform', 'scale(0.9)')
      },
    })
  },

  destroy(_, slides) {
    cancelAnimations(...slides)
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
