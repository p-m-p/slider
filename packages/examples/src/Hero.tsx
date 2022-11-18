import { CarouselSlider } from '@boxslider/react'
import { SliderEventData } from '@boxslider/slider'
import { useEffect, useState } from 'react'
import './Hero.css'

const slides = [
  {
    background: '/slider/hero-slides/product-design.webp',
    caption: 'Product design',
  },
  {
    background: '/slider/hero-slides/product-design.webp',
    caption: 'Caption Two',
  },
  {
    background: '/slider/hero-slides/product-design.webp',
    caption: 'Caption Three',
  },
  {
    background: '/slider/hero-slides/product-design.webp',
    caption: 'Caption Four',
  },
  {
    background: '/slider/hero-slides/product-design.webp',
    caption: 'Caption Five',
  },
]

function useImgLoader(srcList: string[]): boolean {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    console.log(srcList)
    Promise.all(
      srcList.map(
        (src) =>
          new Promise((resolve, reject) => {
            const img = document.createElement('img')
            img.src = src
            img.onload = resolve
            img.onerror = reject
          }),
      ),
    ).then(() => setLoaded(true))
  }, [srcList])

  return loaded
}

function Slider() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <CarouselSlider
        sliderOptions={{ autoScroll: true }}
        effectOptions={{ cover: true }}
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
    <div>
      {isLoaded ? (
        <div className="Hero">
          <Slider />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  )
}
