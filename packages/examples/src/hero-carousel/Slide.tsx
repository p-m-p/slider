import type { ComponentPropsWithoutRef } from 'react'

export default function Slide({ children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-pink-900 to-violet-900"
      {...props}>
      <p className="text-4xl lg:text-6xl text-center font-light p-4 max-w-4xl">{children}</p>
    </div>
  )
}
