import { CarouselSlider } from '@boxslider/react'
import { BoxSlider, SliderEventData } from '@boxslider/slider'
import { ReactNode, useRef, useState } from 'react'

export default function HeroSlider({ children }: { children: ReactNode }) {
  const [sliderOptions] = useState({ autoScroll: true })
  const [effectOptions] = useState({ cover: true })
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<BoxSlider>(null)

  return (
    <>
      <CarouselSlider
        sliderOptions={sliderOptions}
        effectOptions={effectOptions}
        slideIndex={activeIndex}
        sliderRef={sliderRef}
        className="HeroSlider"
        onBefore={({ nextIndex }: SliderEventData) => {
          if (nextIndex !== undefined) {
            setActiveIndex(nextIndex)
          }
        }}>
        {children}
      </CarouselSlider>

      <section className="HeroControls">
        <button onClick={() => sliderRef.current?.prev()}>Previous</button>
        <button onClick={() => sliderRef.current?.next()}>Next</button>
      </section>
    </>
  )
}
