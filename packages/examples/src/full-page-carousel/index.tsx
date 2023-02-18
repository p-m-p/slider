import { useRef, useState } from 'react'
import type { BoxSlider } from '@boxslider/slider'
import { CarouselSlider } from '@boxslider/react'
import './index.css'

export default function Index() {
  const [options] = useState({ autoScroll: false })
  const sliderRef = useRef<BoxSlider>(null)

  return (
    <div className="FullPageCarousel">
      <CarouselSlider className="slider" sliderOptions={options} sliderRef={sliderRef}>
        <div className="slide">Coral</div>
        <div className="slide">Cornflower blue</div>
        <div className="slide">Dark orange</div>
        <div className="slide">Plum</div>
        <div className="slide">Olive</div>
      </CarouselSlider>

      <div className="controls">
        <button className="btn prev" onClick={() => sliderRef.current?.prev()}>
          <span className="sr-only">Previous page</span>
        </button>
        <button className="btn next" onClick={() => sliderRef.current?.next()}>
          <span className="sr-only">Next page</span>
        </button>
      </div>
    </div>
  )
}
