import { Code, Github, Play, Sparkles, SearchCheck } from 'lucide-react'
import CodeExample from '../layout/CodeExample'
import ContentSection from '../layout/ContentSection'
import Paragraph from '../layout/Paragraph'
import CallToAction from '../layout/CallToAction'
import FeatureTile from './FeatureTile'
import initExamples from './initExamples'
import Header from '../layout/Header'
import ExampleCard from './ExampleCard'

function Home() {
  return (
    <article className="bg-gradient-to-tl from-neutral-800 to-neutral-900">
      <div className="flex flex-col">
        <Header />
        <div className="container mx-auto px-4 pt-16 pb-4 text-center">
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold max-w-4xl mx-auto mb-8 xl:mb-12">
            A{' '}
            <span className="bg-clip-text bg-gradient-to-tr from-yellow-600 to-yellow-200 text-transparent">
              super small
            </span>{' '}
            carousel for modern web projects
          </h1>

          <p className="text-neutral-300 font-light text-sm sm:text-lg xl:text-xl">
            No third party dependencies and just 3-4kb download size
            (compressed) for a single effect
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
              Bring your own styles! There&apos;s no complicated setup or style
              sheets to include
            </FeatureTile>
            <FeatureTile title="SEO and Accessibility" icon={<SearchCheck />}>
              SSR compatible, ARIA attributes and easy to integrate with
              accessible controls
            </FeatureTile>
          </section>
        </div>
      </div>

      <main className="max-w-6xl mx-auto mt-16">
        <ContentSection id="getting-started" title="Getting started">
          <Paragraph>
            The BoxSlider library can be installed as a JavaScript/TypeScript
            module or used as web and React components. Select the required
            option below to see how to install the library into your project.
          </Paragraph>
          <CodeExample
            shell="npm install --save @boxslider/slider"
            reactShell="npm install --save @boxslider/react"
            htmlShell="npm install --save @boxslider/components"
          />
          <Paragraph>
            Once installed, import the module or add the import to your HTML to
            initialise a slider.
          </Paragraph>
          <CodeExample
            ts={initExamples.ts}
            react={initExamples.react}
            html={initExamples.html}
          />
          <Paragraph>
            Check the{' '}
            <a href="https://github.com/p-m-p/slider#usage">
              project on Github
            </a>{' '}
            for full instructions on how to use the Slider and see some of the
            examples below
          </Paragraph>
        </ContentSection>

        <ContentSection title="Examples">
          <ul className="grid grid-cols-2 gap-8">
            <li className="rounded bg-neutral-800">
              <ExampleCard
                title="Basic carousel"
                description="Minimal example of what is needed to get started with creating a content carousel."
                level="easy"
                url="https://codepen.io/p-m-p/pen/mdQVxKZ"
              />
            </li>
            <li className="rounded bg-neutral-800">
              <ExampleCard
                title="Full page fade effect with controls"
                description="Responsive hero style carousel that fills the page height and has controls for slide navigation"
                level="intermediate"
                url="https://codepen.io/p-m-p/pen/vYQGOrW"
              />
            </li>
            <li className="rounded bg-neutral-800">
              <ExampleCard
                title="Full page fade effect with controls"
                description="Responsive hero style carousel that fills the page height and has controls for slide navigation"
                level="advanced"
                url="https://codepen.io/p-m-p/pen/vYQGOrW"
              />
            </li>
          </ul>
        </ContentSection>
      </main>
    </article>
  )
}

export default Home
