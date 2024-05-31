import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import styles from './styles.module.css'

export interface FeatureTileProps extends ComponentPropsWithoutRef<'div'> {
  icon: ReactNode
  title: string
}

export function FeatureTile({ children, icon, title }: FeatureTileProps) {
  return (
    <div className={styles.tile}>
      <h3 className={styles.title}>
        <span className={styles.icon}>{icon}</span>
        {title}
      </h3>
      <p className={styles.description}>{children}</p>
    </div>
  )
}
