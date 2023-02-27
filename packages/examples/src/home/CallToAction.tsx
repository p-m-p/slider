import { ComponentPropsWithoutRef } from 'react'

interface CallToActionProps extends ComponentPropsWithoutRef<'a'> {
  variant?: 'primary' | 'secondary'
}

export default function CallToAction({ children, variant = 'primary', ...props }: CallToActionProps) {
  let className = 'px-8 py-2 block border rounded-lg text-lg uppercase font-semibold'

  if (variant === 'primary') {
    className += ' border-orange-500 bg-orange-900'
  } else {
    className += ' border-neutral-500 bg-neutral-800'
  }

  return (
    <a className={className} {...props}>
      {children}
    </a>
  )
}
