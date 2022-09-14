import { BxlCubeSlider } from '@boxslider/react';
import './App.css'

function App() {
  return (
    <div className="App">
      <BxlCubeSlider className="slider">
        <div className="slide" style={{ background: 'blue' }}>Slide Oee</div>
        <div className="slide" style={{ background: 'red' }}>Slide Two</div>
        <div className="slide" style={{ background: 'green' }}>Slide Three</div>
      </BxlCubeSlider>
    </div>
  )
}

export default App
