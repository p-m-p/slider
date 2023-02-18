import { Link } from 'react-router-dom'
import CodeExample from '../layout/CodeExample'
import Paragraph from '../layout/Paragraph'
import ContentSection from './ContentSection'
import FeatureTile from './FeatureTile'
import initExamples from './initExamples'

function Home() {
  return (
    <article>
      <header className="container mx-auto px-4 py-12 md:py-20 text-center min-h-screen flex flex-col justify-center gap-12">
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto">
          A <span className="text-orange-500">super small*</span> content slider for modern web projects
        </h1>

        <p className="flex justify-center gap-4">
          <a className="px-4 py-2 block border border-orange-500 bg-orange-900 rounded text-lg" href="#getting-started">
            Get started
          </a>
          <a className="px-4 py-2 block border border-neutral-500 bg-neutral-800 rounded text-lg" href="">
            Github
          </a>
        </p>

        <p className="text-neutral-400 text-sm">
          *no third party dependencies and just 3-4kb download size (compressed) for a single effect
        </p>

        <section className="flex flex-col md:flex-row gap-4 grow items-stretch md:items-center">
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

        <ContentSection title="Examples"></ContentSection>
      </div>
    </article>
  )
}

export default Home
