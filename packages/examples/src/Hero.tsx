import { CarouselSlider } from '@boxslider/react'
import { SliderEventData } from '@boxslider/slider'
import { useState } from 'react'
import useImgLoader from './useImgLoader'
import './Hero.css'

const slides = [
  {
    background: '/slider/hero-slides/ropes-large.webp',
    caption: 'Product design',
  },
  {
    background: '/slider/hero-slides/squat-large.webp',
    caption: 'Caption Two',
  },
  {
    background: '/slider/hero-slides/deadlift-large.webp',
    caption: 'Caption Three',
  },
  {
    background: '/slider/hero-slides/squat-bw-large.webp',
    caption: 'Caption Four',
  },
]

function Slider() {
  const [sliderOptions] = useState({ autoScroll: true })
  const [effectOptions] = useState({ cover: true })
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <CarouselSlider
        sliderOptions={sliderOptions}
        effectOptions={effectOptions}
        className="Hero-slides"
        onBefore={({ nextIndex }: SliderEventData) => {
          if (nextIndex !== undefined) {
            setActiveIndex(nextIndex)
          }
        }}>
        {slides.map((slide) => (
          <div key={slide.caption} className="Hero-slide">
            <picture>
              <img src={slide.background} />
            </picture>
          </div>
        ))}
      </CarouselSlider>
      <section className="Hero-captions">
        {slides.map((slide, index) => (
          <div key={slide.caption} className={`Hero-caption ${activeIndex === index ? 'Hero-caption--active' : ''}`}>
            <span>{slide.caption}</span>
          </div>
        ))}
      </section>
    </>
  )
}

export default function Hero() {
  const isLoaded = useImgLoader(slides.map((s) => s.background))

  return (
    <div className="Hero">
      {isLoaded ? (
        <Slider />
      ) : (
        <div className="Hero-placeholder">
          <picture>
            <img src={slides[0].background} />
          </picture>
        </div>
      )}
    </div>
  )
}
