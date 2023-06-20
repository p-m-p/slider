import { Github, Play, Eye } from 'lucide-react'
import CodeExample from '../layout/CodeExample'
import ContentSection from '../layout/ContentSection'
import Paragraph from '../layout/Paragraph'
import CallToAction from '../components/CallToAction'
import FeatureTile from './FeatureTile'
import initExamples from './initExamples'
import Header from '../layout/Header'

function Home() {
  return (
    <article>
      <div className="flex flex-col">
        <Header />
        <div className="container mx-auto px-4 pt-16 pb-4 text-center">
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold max-w-4xl xl:max-w-6xl mx-auto mb-8 xl:mb-12">
            A{' '}
            <span className="bg-clip-text bg-gradient-to-tr from-orange-700 to-orange-400 text-transparent">
              super small
            </span>{' '}
            content slider for modern web projects
          </h1>

          <p className="text-neutral-300 font-light text-sm sm:text-lg xl:text-xl">
            No third party dependencies and just 3-4kb download size (compressed) for a single effect
          </p>

          <p className="inline-flex flex-col sm:flex-row justify-center gap-4 my-20">
            <CallToAction href="#getting-started">
              <Play /> Get started
            </CallToAction>
            <CallToAction variant="secondary" href="https://github.com/p-m-p/slider">
              <Github /> View on Github
            </CallToAction>
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:items-center max-w-7xl mx-auto">
            <FeatureTile title="Mulitiple effects">
              Carousel, fade, tile and 3D slide transitions to suit mulitiple different project requirements
            </FeatureTile>
            <FeatureTile title="Easy to use">
              User your own styles! There&apos;s no complicated setup or style sheets to include
            </FeatureTile>
            <FeatureTile title="SEO and Accessibility">
              SSR compatible with correct aria attributes and easy to implement controls
            </FeatureTile>
          </section>
        </div>
      </div>

      <main className="max-w-6xl mx-auto mt-16">
        <ContentSection id="getting-started" title="Getting started">
          <Paragraph>Install the required package for your project.</Paragraph>
          <CodeExample shell="npm install --save @boxslider/slider" reactShell="npm install --save @boxslider/react" />
          <Paragraph>Import the module or add the browser build to your HTML to initialise a slider.</Paragraph>
          <CodeExample ts={initExamples.ts} react={initExamples.react} html={initExamples.html} />
          <Paragraph>
            Check the <a href="https://github.com/p-m-p/slider#usage">project on Github</a> for full instructions on how
            to use the Slider and see some of the examples below
          </Paragraph>
        </ContentSection>

        <ContentSection title="Examples">
          <article className="rounded bg-neutral-800">
            <div>
              <div className="h-2 bg-neutral-700">
                <div className="w-1/6 h-full bg-orange-700"></div>
              </div>
              <label className="uppercase text-neutral-700 text-sm font-bold mx-2">Easy</label>
            </div>

            <div className="p-4 pt-2">
              <h3 className="text-xl mb-2">Basic carousel</h3>
              <p className="text-neutral-300">
                Everything you need to get started with creating a basic content carousel.
              </p>

              <div className="mt-4">
                <a
                  href="https://codepen.io/p-m-p/pen/mdQVxKZ"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-600 transition-colors flex flex-row gap-2">
                  <Eye />
                  View on Codepen
                </a>
              </div>
            </div>
          </article>
        </ContentSection>
      </main>
    </article>
  )
}

export default Home
