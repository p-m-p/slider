import { ComponentPropsWithoutRef, createElement } from 'react'

interface ContentSectionProps extends ComponentPropsWithoutRef<'section'> {
  title: string
  titleComponent?: 'h1' | 'h2' | 'h3'
}

export default function ContentSection({
  children,
  title,
  titleComponent = 'h2',
  ...props
}: ContentSectionProps) {
  const titleEl = createElement(
    titleComponent,
    { className: 'text-2xl md:text-4xl text-neutral-100 mb-8 font-bold' },
    title,
  )

  return (
    <section
      className="container mx-auto bg-neutral-900 p-16 rounded-lg mb-4 ring ring-neutral-800"
      {...props}>
      {titleEl}
      {children}
    </section>
  )
}
