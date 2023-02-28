import { ComponentPropsWithoutRef } from 'react'

export default function Button({ children, ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <button {...props} className="text-2xl rounded-full bg-white/10 hover:bg-white/20 p-2 transition-colors">
      {children}
    </button>
  )
}
