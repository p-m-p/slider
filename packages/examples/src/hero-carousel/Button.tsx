import { ComponentPropsWithoutRef } from 'react'

export default function Button({ children, ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <button {...props} className="text-2xl">
      {children}
    </button>
  )
}
