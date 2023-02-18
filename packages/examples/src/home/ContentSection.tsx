import { ComponentPropsWithoutRef } from 'react'

interface ContentSectionProps extends ComponentPropsWithoutRef<'section'> {
  title: string
}

export default function ContentSection({ children, title, ...props }: ContentSectionProps) {
  return (
    <section className="container mx-auto bg-neutral-900 p-4 md:p-8 rounded mb-8" {...props}>
      <h2 className="text-2xl md:text-4xl text-neutral-200 mb-8 font-bold">{title}</h2>
      {children}
    </section>
  )
}
