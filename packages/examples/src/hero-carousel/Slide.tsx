import type { ComponentPropsWithoutRef } from 'react'

export default function Slide({ children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="h-full w-full text-4xl flex items-center justify-center" {...props}>
      {children}
    </div>
  )
}
