import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import CallToAction from '../components/CallToAction'
import { Code, Github, Play, SearchCheck, Sparkles } from 'lucide-react'
import FeatureTile from '../components/FeatureTile'
import type { PropsWithChildren } from 'react'

export default function Home({ children }: PropsWithChildren) {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={siteConfig.title}
      description="BoxSlider is a super small carousel for modern web projects">
      <main className="bg-gradient-to-tl dark:from-neutral-800 dark:to-neutral-900 grow">
        <article>
          <div className="flex flex-col">
            <header className="container mx-auto px-4 pt-16 pb-4 text-center">
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold max-w-4xl mx-auto mb-8 xl:mb-12">
                A{' '}
                <span className="bg-clip-text bg-gradient-to-tr from-blue-800 to-blue-500 dark:from-yellow-600 dark:to-yellow-200 text-transparent">
                  super small
                </span>{' '}
                carousel for modern web projects
              </h1>

              <p className="text-neutral-700 dark:text-neutral-300 font-light text-sm sm:text-lg xl:text-xl">
                Zero third party dependencies and approximately just 3kb
                download size for a single effect
              </p>

              <p className="inline-flex flex-col sm:flex-row justify-center gap-4 my-20">
                <CallToAction href="#getting-started">
                  <Play /> Get started
                </CallToAction>
                <CallToAction
                  variant="secondary"
                  href="https://github.com/p-m-p/slider">
                  <Github /> View on Github
                </CallToAction>
              </p>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-center max-w-7xl mx-auto">
                <FeatureTile title="Multiple effects" icon={<Sparkles />}>
                  Carousel, fade, tile and 3D slide transitions to suit multiple
                  different project requirements
                </FeatureTile>
                <FeatureTile title="Easy to use" icon={<Code />}>
                  Bring your own styles! There&apos;s no complicated setup or
                  style sheets to include
                </FeatureTile>
                <FeatureTile
                  title="SEO and Accessibility"
                  icon={<SearchCheck />}>
                  SSR compatible, ARIA attributes and easy to integrate with
                  accessible controls
                </FeatureTile>
              </section>
            </header>

            <section>{children}</section>
          </div>
        </article>
      </main>
    </Layout>
  )
}
