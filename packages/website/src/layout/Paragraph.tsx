import { ComponentPropsWithoutRef } from 'react'

export default function Paragraph({ children }: ComponentPropsWithoutRef<'p'>) {
  return (
    <p className="md:text-lg mb-8 font-light text-neutral-300">{children}</p>
  )
}
