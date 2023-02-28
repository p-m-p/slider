import { useRef } from 'react'
import type { BoxSlider } from '@boxslider/slider'
import { CarouselSlider } from '@boxslider/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'
import CodeExample from '../layout/CodeExample'
import * as examples from './examples'
import ContentSection from '../layout/ContentSection'
import Slide from './Slide'
import Header from '../layout/Header'

export default function Index() {
  const sliderRef = useRef<BoxSlider>(null)

  return (
    <article>
      <div className="h-screen flex flex-col">
        <Header />
        <div aria-roledescription="carousel" className="container mx-auto relative grow">
          <CarouselSlider
            id="hero-carousel"
            className="h-full w-full z-10"
            sliderOptions={{ autoScroll: false, speed: 500 }}
            sliderRef={sliderRef}
            effectOptions={{ timingFunction: 'ease-out' }}>
            <Slide>The Carousel slider effect uses CSS transitions for buttery smooth slide animation</Slide>
            <Slide>
              The Slider adapts to changes in screen size and orientation to support responsive design layouts
            </Slide>
            <Slide>
              There&apos;s no CSS to install! Slider effects work with your styles to support all design needs
            </Slide>
          </CarouselSlider>

          <div className="absolute lg:top-1/2 top-0 left-0 z-20 flex w-full justify-between px-8">
            <Button aria-controls="hero-carousel" aria-label="Previous page" onClick={() => sliderRef.current?.prev()}>
              <ChevronLeft size={48} />
            </Button>
            <Button aria-controls="hero-carousel" aria-label="Next page" onClick={() => sliderRef.current?.next()}>
              <ChevronRight size={48} />
            </Button>
          </div>
        </div>
      </div>

      <main className="bg-neutral-800 p-8">
        <ContentSection title="Hero carousel" titleComponent="h1">
          <CodeExample {...examples} />
        </ContentSection>
      </main>
    </article>
  )
}
