import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import CallToAction from '../components/CallToAction'
import { Code, Github, Play, SearchCheck, Sparkles } from 'lucide-react'
import FeatureTile from '../components/FeatureTile'
import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'
import type {
  CarouselSliderElement,
  CubeSliderElement,
  FadeSliderElement,
  SliderControlsElement,
  TileSliderElement,
} from '@boxslider/components'

import '@boxslider/components'

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

export default function Home({ children }: PropsWithChildren) {
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
                <Github /> View on Github
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

          <section>{children}</section>

          <bs-slider-controls class={styles.demoContainer}>
            <bs-carousel
              class={styles.demoSlider}
              speed="600"
              timeout="5000"
              pause-on-hover>
              <img
                src="/slider/img/slides/slide-1-1280x720.jpg"
                alt="Slide one"
              />
              <img
                src="/slider/img/slides/slide-2-1280x720.jpg"
                alt="Slide one"
              />
            </bs-carousel>
            <button slot="prev-btn">Previous</button>
            <button slot="next-btn">Next</button>
          </bs-slider-controls>
        </div>
      </main>
    </Layout>
  )
}
