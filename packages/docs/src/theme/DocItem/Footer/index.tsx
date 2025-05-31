import type { ReactNode } from 'react'
import Footer from '@theme-original/DocItem/Footer'
import type FooterType from '@theme/DocItem/Footer'
import type { WrapperProps } from '@docusaurus/types'
import { Github, Star } from 'lucide-react'

import styles from './styles.module.css'
import CallToAction from '@site/src/components/CallToAction'

type Props = WrapperProps<typeof FooterType>

export default function FooterWrapper(props: Props): ReactNode {
  return (
    <>
      <div className={styles.starOnGithub}>
        <p className={styles.text}>
          <Star />
          <span>
            If you find BoxSlider helpful, please consider giving it a star on
            GitHub
          </span>
          <Star />
        </p>
        <CallToAction
          variant="secondary"
          href="https://github.com/p-m-p/slider">
          <Github /> Star BoxSlider
        </CallToAction>
      </div>
      <Footer {...props} />
    </>
  )
}
