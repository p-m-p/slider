import { useState } from 'react'
import GitHubButton from 'react-github-btn'
import {
  CarouselSliderOptions,
  CubeSliderOptions,
  FadeSliderOptions,
  SliderEventData,
  TileSliderOptions,
} from '@boxslider/slider'
import { CarouselSlider, CubeSlider, FadeSlider, TileSlider } from '@boxslider/react'
import './Home.css'

const images = Array.from({ length: 6 }).map(
  (_, i) => `/slider/Futuristic_city_scape_on_a_distant_alien_planet_${i + 1}.png`,
)
const diffusionText = 'Futuristic city scape on a distant alien planet'
const effects: {
  name: string
  options: CarouselSliderOptions | CubeSliderOptions | FadeSliderOptions | TileSliderOptions
  component: typeof CarouselSlider | typeof CubeSlider | typeof FadeSlider | typeof TileSlider
}[] = [
  {
    name: 'Horizontal Cube',
    options: { direction: 'horizontal' },
    component: CubeSlider,
  },
  {
    name: 'Vertical Cube',
    options: { direction: 'vertical' },
    component: CubeSlider,
  },
  {
    name: 'Tile Fade',
    options: { rows: 10, tileEffect: 'fade' },
    component: TileSlider,
  },
  {
    name: 'Tile Flip',
    options: { rows: 10, tileEffect: 'flip' },
    component: TileSlider,
  },
  {
    name: 'Fade',
    options: { timingFunction: 'ease-in' },
    component: FadeSlider,
  },
  {
    name: 'Carousel',
    options: { timingFunction: 'ease' },
    component: CarouselSlider,
  },
  {
    name: 'Carousel Cover',
    options: { cover: true },
    component: CarouselSlider,
  },
]

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [effect, setEffect] = useState(effects[0])
  const slides = images.map((image, i) => (
    <div key={image} className="slide">
      <img src={image} alt={`Image ${i + 1} of ${images.length} depicting “${diffusionText}”`} />
    </div>
  ))

  return (
    <div className="App">
      <header>
        <h1>Box Slider</h1>
        <GitHubButton
          href="https://github.com/boxslider/slider"
          data-color-scheme="no-preference: dark_dimmed; light: dark_dimmed; dark: dark_dimmed;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star boxslider/slider on GitHub">
          Star
        </GitHubButton>
      </header>

      <main>
        <section className="slider-viewport" aria-roledescription="carousel">
          {effect.component({
            'aria-label': 'Image carousel',
            className: 'slider',
            id: 'slider',
            effectOptions: effect.options,
            onAfter: (ev: SliderEventData) => setActiveIndex(ev.currentIndex),
            slideIndex: activeIndex,
            children: slides,
          })}
        </section>

        <section className="slider-controls">
          <select
            name="effect"
            value={effect.name}
            onChange={(ev) => {
              const effect = effects.find((e) => e.name === ev.target.value)

              if (effect) {
                setEffect(effect)
              }
            }}>
            {effects.map((effect) => (
              <option key={effect.name} value={effect.name}>
                {effect.name}
              </option>
            ))}
          </select>

          <div className="skip-buttons">
            {images.map((image, i) => (
              <button
                key={image}
                aria-controls="slider"
                className={`skip-button${i === activeIndex ? ' active' : ''}`}
                aria-label={`Show slide ${i}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>Images of “{diffusionText}” created with Stable Diffusion</p>
      </footer>
    </div>
  )
}

export default App
