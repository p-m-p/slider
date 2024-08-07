import { CarouselSlider } from '@boxslider/react'
import { useOptions } from '../Options'
import { Example } from './Example'
import { Slides } from './Slides'

import styles from './styles.module.css'

function Inner() {
  const { options } = useOptions()

  return (
    <CarouselSlider className={styles.slider} {...options}>
      <Slides />
    </CarouselSlider>
  )
}

export function Carousel({ showOptions = false }: { showOptions?: boolean }) {
  return (
    <Example
      showOptions={showOptions}
      effectControls={[
        {
          label: 'timing-function',
          type: 'text',
          optionKey: 'timingFunction',
          defaultValue: 'ease-in-out',
        },
        {
          label: 'cover',
          type: 'checkbox',
          optionKey: 'cover',
          defaultValue: false,
        },
      ]}>
      <Inner />
    </Example>
  )
}
