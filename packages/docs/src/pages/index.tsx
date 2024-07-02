import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import CallToAction from '../components/CallToAction'
import {
  ArrowLeft,
  ArrowRight,
  Code,
  Github,
  Play,
  SearchCheck,
  Sparkles,
  Star,
} from 'lucide-react'
import FeatureTile from '../components/FeatureTile'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type {
  CarouselSliderElement,
  CubeSliderElement,
  FadeSliderElement,
  SliderControlsElement,
  TileSliderElement,
} from '@boxslider/components'
import { Button } from '../components/Button'

interface JSXSliderElement<T> extends DetailedHTMLProps<HTMLAttributes<T>, T> {
  class?: string
  timeout?: string
  speed?: string
  swipe?: boolean
}

declare global {
  /* eslint-disable-next-line @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'bs-carousel': JSXSliderElement<CarouselSliderElement>
      'bs-cube': JSXSliderElement<CubeSliderElement>
      'bs-fade': JSXSliderElement<FadeSliderElement>
      'bs-tile': JSXSliderElement<TileSliderElement>
      'bs-slider-controls': JSXSliderElement<SliderControlsElement>
    }
  }
}

import styles from './styles.module.css'
import BrowserOnly from '@docusaurus/BrowserOnly'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={siteConfig.title}
      description="BoxSlider is a super small carousel for modern web projects">
      <main className={styles.mainContent}>
        <div className={styles.article}>
          <header className={styles.header}>
            <h1 className={styles.heading}>
              A <span className={styles.textEmphasis}>super small</span>{' '}
              carousel for modern web projects
            </h1>

            <bs-fade class={styles.subHeading} timeout="10000">
              <p>
                Zero third party dependencies and only 3kb download size for a
                single effect
              </p>
              <p>
                Easily integrate into projects with Web Components, React or
                Vanilla JavaScript
              </p>
            </bs-fade>

            <p className={styles.ctaLinks}>
              <CallToAction href="#getting-started">
                <Play /> Get started
              </CallToAction>
              <CallToAction
                variant="secondary"
                href="https://github.com/p-m-p/slider">
                <Github /> Github
              </CallToAction>
            </p>

            <section className={styles.features}>
              <FeatureTile title="Multiple effects" icon={<Sparkles />}>
                Carousel, fade, tile and 3D slide transitions to suit multiple
                different project requirements
              </FeatureTile>
              <FeatureTile title="Easy to use" icon={<Code />}>
                Bring your own styles! There&apos;s no complicated setup or
                style sheets to include
              </FeatureTile>
              <FeatureTile title="SEO and Accessibility" icon={<SearchCheck />}>
                SSR compatible, ARIA attributes and easy to integrate with
                accessible controls
              </FeatureTile>
            </section>
          </header>

          <section className={styles.demoContainer}>
            <h3 className={styles.demoTitle}>
              <div className={styles.demoTitleBar} />
              <Star className={styles.demoTitleIcon} />
              Demo
              <Star className={styles.demoTitleIcon} />
              <div className={styles.demoTitleBar} />
            </h3>
            <BrowserOnly>
              {() => {
                import('@boxslider/components')

                return (
                  <bs-slider-controls class={styles.demoControls}>
                    <bs-carousel
                      class={styles.demoSlider}
                      auto-scroll="true"
                      speed="400"
                      timeout="5000"
                      pause-on-hover>
                      <picture className={styles.demoSlide}>
                        <source
                          srcSet="/slider/img/slides/slide-3-square.jpg"
                          media="(max-width: 480px)"
                        />
                        <img
                          className={styles.demoSlideImage}
                          src="/slider/img/slides/slide-3.jpg"
                          alt="Slide one"
                        />
                      </picture>
                      <picture className={styles.demoSlide}>
                        <source
                          srcSet="/slider/img/slides/slide-1-square.jpg"
                          media="(max-width: 480px)"
                        />
                        <img
                          className={styles.demoSlideImage}
                          src="/slider/img/slides/slide-1.jpg"
                          alt="Slide one"
                        />
                      </picture>
                      <picture className={styles.demoSlide}>
                        <source
                          srcSet="/slider/img/slides/slide-2-square.jpg"
                          media="(max-width: 600px)"
                        />
                        <img
                          className={styles.demoSlideImage}
                          src="/slider/img/slides/slide-2.jpg"
                          alt="Slide one"
                        />
                      </picture>
                    </bs-carousel>
                    <Button slot="prev-btn" variant="secondary">
                      <ArrowLeft />
                      <span>Previous</span>
                    </Button>
                    <Button slot="next-btn" variant="secondary">
                      <span>Next</span>
                      <ArrowRight />
                    </Button>
                  </bs-slider-controls>
                )
              }}
            </BrowserOnly>
          </section>
        </div>
      </main>
    </Layout>
  )
}
