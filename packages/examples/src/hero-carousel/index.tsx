import { useRef } from 'react'
import type { BoxSlider } from '@boxslider/slider'
import { CarouselSlider } from '@boxslider/react'
import Button from './Button'
import CodeExample from '../layout/CodeExample'
import * as examples from './examples'
import ContentSection from '../layout/ContentSection'

export default function Index() {
  const sliderRef = useRef<BoxSlider>(null)
  const slideClassName = 'h-full w-full text-4xl flex items-center justify-center'

  return (
    <div>
      <div aria-roledescription="carousel" className="h-screen container mx-auto relative">
        <CarouselSlider
          id="hero-carousel"
          className="h-full w-full z-10"
          sliderOptions={{ autoScroll: false, speed: 500 }}
          sliderRef={sliderRef}
          effectOptions={{ timingFunction: 'ease-out' }}>
          <div className={slideClassName}>Slide one</div>
          <div className={slideClassName}>Slide two</div>
          <div className={slideClassName}>Slide three</div>
          <div className={slideClassName}>Slide four</div>
          <div className={slideClassName}>Slide five</div>
        </CarouselSlider>

        <div className="absolute bottom-0 left-0 z-20 flex w-full justify-between p-8">
          <Button aria-controls="hero-carousel" onClick={() => sliderRef.current?.prev()}>
            <span className="">Previous page</span>
          </Button>
          <Button aria-controls="hero-carousel" onClick={() => sliderRef.current?.next()}>
            <span className="">Next page</span>
          </Button>
        </div>
      </div>
      <div className="bg-neutral-800 p-8">
        <ContentSection title="Hero carousel" titleComponent="h1">
          <CodeExample {...examples} />
        </ContentSection>
      </div>
    </div>
  )
}
