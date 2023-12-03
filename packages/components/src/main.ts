import './style.css'
import '.'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="sliders">
  <bs-slider class="full">
    <bs-carousel slot="slider" auto-scroll="false" timeout="5000" cover class="full-carousel">
      <div class="slide">Slide One</div>
      <div class="slide">Slide Two</div>
      <div class="slide">Slide Three</div>
      <div class="slide">Slide Four</div>
      <div class="slide">Slide Five</div>
    </bs-carousel>

    <button slot="prev-btn">Previous</button>
    <button slot="next-btn">Next</button>
  </bs-slider>

  <div class="viewport">
    <bs-cube auto-scroll="true" timeout="5000" class="slider" direction="vertical">
      <div class="slide">Slide One</div>
      <div class="slide">Slide Two</div>
      <div class="slide">Slide Three</div>
      <div class="slide">Slide Four</div>
      <div class="slide">Slide Five</div>
    </bs-cube>
  </div>

  <bs-fade auto-scroll="true" timeout="2000" class="slider" timing-function="ease-in">
    <div class="slide">Slide One</div>
    <div class="slide">Slide Two</div>
    <div class="slide">Slide Three</div>
    <div class="slide">Slide Four</div>
    <div class="slide">Slide Five</div>
  </bs-fade>

  <bs-tile auto-scroll="true" timeout="7000" class="slider" tile-effect="fade">
    <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_1.png" /></div>
    <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_2.png" /></div>
    <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_3.png" /></div>
    <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_4.png" /></div>
    <div class="slide"><img src="/Futuristic_city_scape_on_a_distant_alien_planet_5.png" /></div>
  </bs-tile>
</div>
`

const carousel = document.querySelector('bs-carousel')
carousel?.addEventListener('before', (ev) => {
  console.log(ev.detail)
})
