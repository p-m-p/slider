import { CubeSlider } from '@boxslider/react'
import { useOptions } from '../Options'
import { Example } from './Example'
import { Slides } from './Slides'

import styles from './styles.module.css'

function Inner() {
  const { options } = useOptions()

  return (
    <CubeSlider className={styles.slider} {...options}>
      <Slides />
    </CubeSlider>
  )
}

export function Cube({ showOptions = false }: { showOptions?: boolean }) {
  return (
    <Example
      showOptions={showOptions}
      effectControls={[
        {
          label: 'direction',
          type: 'radio',
          optionKey: 'direction',
          defaultValue: 'horizontal',
          values: ['horizontal', 'vertical'],
        },
        {
          label: 'perspective',
          type: 'number',
          optionKey: 'perspective',
          defaultValue: '1000',
        },
      ]}>
      <Inner />
    </Example>
  )
}
