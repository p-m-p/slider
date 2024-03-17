import { ComponentPropsWithoutRef } from 'react'

interface CallToActionProps extends ComponentPropsWithoutRef<'a'> {
  variant?: 'primary' | 'secondary'
}

export default function CallToAction({
  children,
  variant = 'primary',
  ...props
}: CallToActionProps) {
  let className =
    'px-4 py-2 rounded-lg text-lg font-semibold inline-flex shrink gap-3 items-center transition-colors uppercase'

  if (variant === 'primary') {
    className += ' border border-blue-700 bg-blue-800 hover:bg-blue-900'
  } else {
    className +=
      ' border border-neutral-700 bg-transparent hover:bg-neutral-800'
  }

  return (
    <a className={className} {...props}>
      {children}
    </a>
  )
}
