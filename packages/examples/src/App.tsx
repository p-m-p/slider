import { useState } from 'react'
import { CubeSlider } from '@boxslider/react'
import { SliderEventData } from '@boxslider/slider'
import './App.css'

function App() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const colours = ['blue', 'red', 'green']

  return (
    <div className="App">
      <section className="slider-viewport" aria-roledescription="carousel">
        <CubeSlider id="cube-slider"
                    className="slider"
                    aria-label="Colour carousel"
                    onAfter={(ev: SliderEventData) => setActiveIndex(ev.currentIndex)}
                    slideIndex={slideIndex}>
          {colours.map(colour => (
            <div key={colour} className="slide" style={{ background: colour }}>{colour}</div>
          ))}
        </CubeSlider>
      </section>
      <section className="slider-controls">
        {colours.map((colour, i) => (
          <button key={colour}
                  aria-controls="cube-slider"
                  className="show-slide-btn"
                  aria-label={`Show slide ${i}`}
                  onClick={() => setSlideIndex(i)} />
        ))}
      </section>

      <div className="slider-status">
        Slide index: {activeIndex}
      </div>
    </div>
  )
}

export default App
