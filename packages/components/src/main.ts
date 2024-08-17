import './style.css'
import '.'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="sliders">
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
    <bs-tile auto-scroll timeout="7000" class="slider" tile-effect="fade">
      <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_1.png" /></div>
      <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_2.png" /></div>
      <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_3.png" /></div>
      <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_4.png" /></div>
      <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_5.png" /></div>
    </bs-tile>
  </bs-slider-controls>
</div>
`
