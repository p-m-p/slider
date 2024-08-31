import './style.css'
import '.'
import { Slider } from '.'
import type { Effect } from '@boxslider/slider'

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
      { opacity: [1, 0], transform: ['scale(1)', 'scale(0.95)'] },
      { duration: speed, fill: 'forwards' },
    )
    const animateIn = slides[nextIndex].animate(
      { opacity: [0, 1], transform: ['scale(0.95)', 'scale(1)'] },
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

customElements.define('custom-slider', CustomSlider)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<button id="add-slides">Add Slides</button>

<div class="sliders">
  <bs-slider-controls>
    <custom-slider auto-scroll="true" timeout="1000" speed="300" class="full-carousel" id="custom">
      <div class="slide">Slide One</div>
      <div class="slide">Slide Two</div>
      <div class="slide">Slide Three</div>
      <div class="slide">Slide Four</div>
      <div class="slide">Slide Five</div>
    </custom-slider>
  </bs-slider-controls>

  <bs-slider-controls>
    <bs-carousel auto-scroll="false" timeout="5000" cover class="full-carousel">
      <div class="slide">Slide One</div>
      <div class="slide">Slide Two</div>
      <div class="slide">Slide Three</div>
      <div class="slide">Slide Four</div>
      <div class="slide">Slide Five</div>
    </bs-carousel>
  </bs-slider-controls>

  <bs-slider-controls>
    <bs-carousel auto-scroll="false" timeout="5000" cover class="full-carousel">
      <div class="slide">Slide One</div>
      <div class="slide">Slide Two</div>
      <div class="slide">Slide Three</div>
      <div class="slide">Slide Four</div>
      <div class="slide">Slide Five</div>
    </bs-carousel>

    <button slot="play-btn">Play/Pause</button>

    <button slot="prev-btn">Prev</button>
    <button slot="next-btn">Next</button>

    <div slot="index">
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </div>
  </bs-slider-controls>

  <bs-slider-controls>
    <div class="viewport">
      <bs-cube auto-scroll timeout="5000" class="slider" direction="vertical">
        <div class="slide">Slide One</div>
        <div class="slide">Slide Two</div>
        <div class="slide">Slide Three</div>
        <div class="slide">Slide Four</div>
        <div class="slide">Slide Five</div>
      </bs-cube>
    </div>
  </bs-slider-controls>

  <bs-slider-controls unstyled>
    <bs-fade auto-scroll timeout="2000" class="slider" timing-function="ease-in">
      <div class="slide">Slide One</div>
      <div class="slide">Slide Two</div>
      <div class="slide">Slide Three</div>
      <div class="slide">Slide Four</div>
      <div class="slide">Slide Five</div>
    </bs-fade>

    <button slot="play-btn">Play/Pause</button>

    <button slot="prev-btn">Prev</button>
    <button slot="next-btn">Next</button>

    <div slot="index">
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </div>
  </bs-slider-controls>

  <bs-slider-controls>
    <bs-tile auto-scroll="false" timeout="7000" class="slider" tile-effect="fade">
      <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_1.png" /></div>
      <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_2.png" /></div>
      <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_3.png" /></div>
      <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_4.png" /></div>
      <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_5.png" /></div>
    </bs-tile>
  </bs-slider-controls>
</div>
`

setTimeout(() => {
  document.getElementById('add-slides')!.addEventListener('click', () => {
    const custom = document.getElementById('custom')
    custom!.innerHTML += '<div class="slide">Slide Six</div>'
  })
}, 1000)
