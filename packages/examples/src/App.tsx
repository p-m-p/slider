import { useState } from 'react'
import { CubeSlider } from '@boxslider/react'
import { type EventData } from '@boxslider/slider'
import './App.css'

function App() {
  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <div className="App">
      <section className="slider-viewport" aria-roledescription="carousel">
        <CubeSlider className="slider" onAfter={(ev: EventData) => setSlideIndex(ev!.activeIndex as number)}>
          {['blue', 'red', 'green'].map(colour => (
            <div key={colour} className="slide" style={{ background: colour }}>{colour}</div>
          ))}
        </CubeSlider>
      </section>

      <div className="counter">
        Slide index: {slideIndex}
      </div>
    </div>
  )
}

export default App
