import { useState } from 'react'
import GitHubButton from 'react-github-btn'
import { SliderEventData } from '@boxslider/slider'
import { CubeSlider } from '@boxslider/react'
import './App.css'

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = Array.from({ length: 6 }).map(
    (n, i) => `/Futuristic_city_scape_on_a_distant_alien_planet_${i + 1}.png`,
  )
  const diffusionText = 'Futuristic city scape on a distant alien planet'

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
          <CubeSlider
            id="slider"
            className="slider"
            aria-label="Image carousel"
            effectOptions={{ direction: 'vertical' }}
            onAfter={(ev: SliderEventData) => setActiveIndex(ev.currentIndex)}
            slideIndex={activeIndex}>
            {images.map((image, i) => (
              <div key={image} className="slide">
                <img src={image} alt={`Image ${i + 1} of ${images.length} depicting “${diffusionText}”`} />
              </div>
            ))}
          </CubeSlider>
        </section>

        <section className="slider-controls">
          {images.map((image, i) => (
            <button
              key={image}
              aria-controls="slider"
              className={`show-slide-btn${i === activeIndex ? ' active' : ''}`}
              aria-label={`Show slide ${i}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </section>
      </main>

      <footer>
        <p>Images of “{diffusionText}” created with Stable Diffusion</p>
      </footer>
    </div>
  )
}

export default App
