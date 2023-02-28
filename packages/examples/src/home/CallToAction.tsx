import { ComponentPropsWithoutRef } from 'react'

interface CallToActionProps extends ComponentPropsWithoutRef<'a'> {
  variant?: 'primary' | 'secondary'
}

export default function CallToAction({ children, variant = 'primary', ...props }: CallToActionProps) {
  let className = 'px-4 py-2 rounded-lg text-lg font-semibold inline-flex shrink gap-3 items-center transition-colors'

  if (variant === 'primary') {
    className += ' border border-orange-500 bg-orange-900 uppercase hover:bg-orange-800'
  } else {
    className += ' border border-neutral-500 bg-transparent hover:bg-neutral-800'
  }

  return (
    <a className={className} {...props}>
      {children}
    </a>
  )
}
