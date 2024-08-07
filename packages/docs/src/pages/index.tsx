import { FadeSlider } from '@boxslider/react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import CallToAction from '../components/CallToAction'
import { Code, Github, Play, SearchCheck, Sparkles, Star } from 'lucide-react'
import FeatureTile from '../components/FeatureTile'
import { Carousel } from '../components/Examples'

import styles from './styles.module.css'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={siteConfig.title}
      description="BoxSlider is a super small carousel for modern web projects">
      <main className={styles.mainContent}>
        <div className={styles.article}>
          <header className={styles.header}>
            <div className={styles.heroText}>
              <h1 className={styles.heading}>
                A <span className={styles.textEmphasis}>super small</span>{' '}
                carousel for modern web projects
              </h1>

              <FadeSlider className={styles.subHeading} timeout={10000}>
                <p>
                  Zero third party dependencies and only 3kb download size for a
                  single effect
                </p>
                <p>
                  Easily integrate into projects with React, Web Components or
                  Vanilla JavaScript
                </p>
              </FadeSlider>
            </div>

            <p className={styles.ctaLinks}>
              <CallToAction href="/slider/docs/getting-started/installation">
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

          <div className={styles.demo}>
            <section className={styles.demoContainer}>
              <h3 className={styles.demoTitle}>
                <div className={styles.demoTitleBar} />
                <Star className={styles.demoTitleIcon} />
                Demo
                <Star className={styles.demoTitleIcon} />
                <div className={styles.demoTitleBar} />
              </h3>
              <Carousel />
            </section>
            <div className={styles.demoBg} />
          </div>
        </div>
      </main>
    </Layout>
  )
}
