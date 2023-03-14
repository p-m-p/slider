import { useRef } from 'react'
import type { BoxSlider } from '@boxslider/slider'
import { CarouselSlider } from '@boxslider/react'
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'
import CodeExample from '../layout/CodeExample'
import * as examples from './examples'
import ContentSection from '../layout/ContentSection'
import Slide from './Slide'
import Header from '../layout/Header'
import CallToAction from '../components/CallToAction'

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
            <Slide>Slider effects use CSS transitions for buttery smooth slide animations</Slide>
            <Slide>Adapts to change in screen size and orientation for responsive design layouts</Slide>
            <Slide>No CSS to install! Slider effects work with your styles to support varied design requirements</Slide>
          </CarouselSlider>

          <div className="absolute lg:top-1/2 bottom-0 left-0 z-20 w-full px-4">
            <div className="relative -top-6 flex justify-between">
              <Button
                aria-controls="hero-carousel"
                aria-label="Previous page"
                onClick={() => sliderRef.current?.prev()}>
                <ChevronLeft size={48} />
              </Button>
              <Button aria-controls="hero-carousel" aria-label="Next page" onClick={() => sliderRef.current?.next()}>
                <ChevronRight size={48} />
              </Button>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-30 motion-safe:animate-bounce">
            <CallToAction href="#code-samples" variant="secondary">
              <ArrowDown /> View code samples
            </CallToAction>
          </div>
        </div>
      </div>

      <main className="bg-neutral-800 p-8">
        <ContentSection title="Hero carousel" titleComponent="h1" id="code-samples">
          <CodeExample {...examples} />
        </ContentSection>
      </main>
    </article>
  )
}
