import { FadeSlider } from '@boxslider/react'
import { useOptions } from '../Options'
import { Example } from './Example'
import { Slides } from './Slides'

import styles from './styles.module.css'

function Inner() {
  const { options } = useOptions()

  return (
    <FadeSlider className={styles.slider} {...options}>
      <Slides />
    </FadeSlider>
  )
}

export function Fade({ showOptions = false }: { showOptions: boolean }) {
  return (
    <Example
      showOptions={showOptions}
      effectControls={[
        {
          label: 'timing-function',
          type: 'text',
          optionKey: 'timing-function',
          defaultValue: 'ease-in-out',
        },
      ]}>
      <Inner />
    </Example>
  )
}
