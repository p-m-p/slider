import type { ComponentPropsWithoutRef } from 'react'

import styles from './styles.module.css'

export interface CallToActionProps extends ComponentPropsWithoutRef<'a'> {
  variant?: 'primary' | 'secondary'
}

export function CallToAction({
  children,
  variant = 'primary',
  ...props
}: CallToActionProps) {
  return (
    <a className={styles[variant]} {...props}>
      {children}
    </a>
  )
}
