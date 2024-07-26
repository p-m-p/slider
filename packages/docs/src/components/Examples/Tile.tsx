import { TileSlider } from '@boxslider/react'
import { useOptions } from '../Options'
import { Example } from './Example'
import { Slides } from './Slides'

import styles from './styles.module.css'

function Inner() {
  const { options } = useOptions()

  return (
    <TileSlider className={styles.slider} {...options}>
      <Slides />
    </TileSlider>
  )
}

export function Tile({ showOptions = false }: { showOptions: boolean }) {
  return (
    <Example
      showOptions={showOptions}
      effectControls={[
        {
          label: 'rows',
          type: 'number',
          optionKey: 'rows',
          defaultValue: '5',
        },
        {
          label: 'rowOffset',
          type: 'number',
          optionKey: 'rowOffset',
          defaultValue: '50',
        },
        {
          label: 'tileEffect',
          type: 'radio',
          optionKey: 'tileEffect',
          defaultValue: 'fade',
          values: ['flip', 'fade'],
        },
      ]}>
      <Inner />
    </Example>
  )
}
