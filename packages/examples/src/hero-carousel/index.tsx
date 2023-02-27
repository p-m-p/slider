import { useRef } from 'react'
import type { BoxSlider } from '@boxslider/slider'
import { CarouselSlider } from '@boxslider/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'
import CodeExample from '../layout/CodeExample'
import * as examples from './examples'
import ContentSection from '../layout/ContentSection'
import Slide from './Slide'

export default function Index() {
  const sliderRef = useRef<BoxSlider>(null)

  return (
    <div>
      <div aria-roledescription="carousel" className="h-screen container mx-auto relative">
        <CarouselSlider
          id="hero-carousel"
          className="h-full w-full z-10"
          sliderOptions={{ autoScroll: false, speed: 500 }}
          sliderRef={sliderRef}
          effectOptions={{ timingFunction: 'ease-out' }}>
          <Slide>Slide one</Slide>
          <Slide>Slide two</Slide>
          <Slide>Slide three</Slide>
          <Slide>Slide four</Slide>
          <Slide>Slide five</Slide>
        </CarouselSlider>

        <div className="absolute bottom-0 left-0 z-20 flex w-full justify-between p-8">
          <Button aria-controls="hero-carousel" aria-label="Previous page" onClick={() => sliderRef.current?.prev()}>
            <ChevronLeft size={48} />
          </Button>
          <Button aria-controls="hero-carousel" aria-label="Next page" onClick={() => sliderRef.current?.next()}>
            <ChevronRight size={48} />
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
