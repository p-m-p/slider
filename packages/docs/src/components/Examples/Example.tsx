import { useState, type PropsWithChildren } from 'react'
import { SliderControls } from '@boxslider/react'
import { type OptionControl, Options } from '../Options'
import styles from './styles.module.css'
import { Context } from './Context'

export interface ExampleProps extends PropsWithChildren {
  effectControls?: OptionControl[]
  showOptions?: boolean
}

export function Example({
  children,
  showOptions,
  effectControls,
}: ExampleProps) {
  const [options, setOptions] = useState({
    autoScroll: true,
    loop: true,
    speed: 800,
    swipe: true,
    swipeTolerance: 30,
    timeout: 5000,
    pauseOnHover: false,
    ...Object.fromEntries(
      effectControls.map((c) => [c.optionKey, c.defaultValue]),
    ),
  })

  return (
    <Context.Provider
      value={{
        options,
        setOption: (key: string, value: string | boolean) => {
          setOptions((o) => ({ ...o, [key]: value }))
        },
      }}>
      <SliderControls
        className={styles.controls}
        indexBtnLabel="%d of 4"
        aria-label="BoxSlider demonstration with AI generated images of animals in a Vaporwave style">
        <div className={styles.viewport}>{children}</div>
      </SliderControls>
      {showOptions && (
        <div className={styles.optionsContainer}>
          <Options controls={effectControls} />
        </div>
      )}
    </Context.Provider>
  )
}
