import { ComponentPropsWithoutRef } from 'react'

export default function Button({ children, ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <button {...props} className="rounded-lg border border-orange-500 bg-orange-800 px-4 py-2">
      {children}
    </button>
  )
}
