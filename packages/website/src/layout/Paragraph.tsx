import { ComponentPropsWithoutRef } from 'react'

export default function Paragraph({ children }: ComponentPropsWithoutRef<'p'>) {
  return <p className="md:text-lg mb-8 font-light">{children}</p>
}
