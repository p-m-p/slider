import { useState } from 'react'
import { CubeSlider } from '@boxslider/react'
import { type EventData } from '@boxslider/slider'
import './App.css'

function App() {
  const [slideIndex, setSlideIndex] = useState(0)
  const colours = ['blue', 'red', 'green']

  return (
    <div className="App">
      <section className="slider-viewport" aria-roledescription="carousel">
        <CubeSlider className="slider"
                    slideIndex={slideIndex}>
          {colours.map(colour => (
            <div key={colour} className="slide" style={{ background: colour }}>{colour}</div>
          ))}
        </CubeSlider>
      </section>
      <section className="slider-controls">
        {colours.map((colour, i) => (
          <button key={colour} className="goto-btn" onClick={() => setSlideIndex(i)}>Show slide {i}</button>
        ))}
      </section>

      <div className="slider-status">
        Slide index: {slideIndex}
      </div>
    </div>
  )
}

export default App
