import { Link } from 'react-router-dom'
import CodeExample from '../layout/CodeExample'
import ContentSection from '../layout/ContentSection'
import Paragraph from '../layout/Paragraph'
import CallToAction from './CallToAction'
import FeatureTile from './FeatureTile'
import initExamples from './initExamples'

function Home() {
  return (
    <article>
      <header className="container mx-auto px-4 pt-20 pb-4 text-center min-h-screen flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl xl:text-8xl font-extrabold max-w-4xl xl:max-w-6xl mx-auto mb-8 xl:mb-12">
          A{' '}
          <span className="bg-clip-text bg-gradient-to-tr from-orange-700 to-orange-400 text-transparent">
            super small
          </span>{' '}
          content slider for modern web projects
        </h1>

        <p className="text-neutral-300 font-light text-sm sm:text-lg xl:text-2xl mb-12">
          No third party dependencies and just 3-4kb download size (compressed) for a single effect
        </p>

        <p className="flex justify-center gap-4 mb-16 lg:mb-24">
          <CallToAction href="#getting-started">Get started</CallToAction>
          <CallToAction variant="secondary" href="https://github.com/p-m-p/slider">
            Github
          </CallToAction>
        </p>

        <section className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <FeatureTile
            title="SEO Optimized"
            text="Render on the server with modern frameworks like Next.js and Remix"
          />
          <FeatureTile title="No CSS" text="Bring your own styles, no complicated setup or stylesheets to import" />
          <FeatureTile title="Accessible" text="Aria support with easy to implement accessible controls" />
        </section>
      </header>

      <div className="px-2 py-4 sm:p-8 bg-neutral-800">
        <ContentSection id="getting-started" title="Getting started">
          <Paragraph>Install the required package for your project.</Paragraph>
          <CodeExample shell="npm install --save @boxslider/slider" reactShell="npm install --save @boxslider/react" />
          <Paragraph>Import the module or add the browser build to your HTML to initialise a slider.</Paragraph>
          <CodeExample ts={initExamples.ts} react={initExamples.react} html={initExamples.html} />
        </ContentSection>

        <ContentSection title="Examples">
          <Link to="/slider/hero-carousel">Hero carousel</Link>
        </ContentSection>
      </div>
    </article>
  )
}

export default Home
