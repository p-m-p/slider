import type { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary'
}

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <button {...props} className={clsx(styles.root, styles[variant])} />
}
