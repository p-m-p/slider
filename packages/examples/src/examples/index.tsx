import Tile from './Tile'

export default function Examples() {
  return (
    <article className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl">Examples</h1>
      </header>
      <section className="flex gap-4">
        <Tile title="Full page carousel">An example of an adaptive full page carousel with accessible controls.</Tile>
      </section>
    </article>
  )
}
