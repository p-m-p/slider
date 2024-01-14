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
    className += ' border border-orange-500 bg-orange-800 hover:bg-orange-700'
  } else {
    className +=
      ' border border-neutral-500 bg-transparent hover:bg-neutral-500/25'
  }

  return (
    <a className={className} {...props}>
      {children}
    </a>
  )
}
