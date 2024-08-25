import { useId } from 'react'
import { useOptions } from '.'

import styles from './styles.module.css'

export interface OptionControl {
  label: string
  type: 'text' | 'checkbox' | 'number' | 'radio'
  optionKey: string
  defaultValue: string | boolean
  values?: string[]
}

export interface OptionsProps {
  controls?: OptionControl[]
}

export function Options({ controls = [] }: OptionsProps) {
  const id = useId()
  const { options, setOption } = useOptions()

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor={`speed-${id}`}>speed</label>
          <input
            id={`speed-${id}`}
            size={4}
            type="number"
            value={options.speed as string}
            onChange={(ev) => setOption('speed', ev.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`timeout-${id}`}>timeout</label>
          <input
            id={`timeout-${id}`}
            size={4}
            type="number"
            value={options.timeout as string}
            onChange={(ev) => setOption('timeout', ev.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`pause-on-hover-${id}`}>pauseOnHover</label>
          <input
            id={`pause-on-hover-${id}`}
            type="checkbox"
            checked={options.pauseOnHover as boolean}
            onChange={(ev) => setOption('pauseOnHover', ev.target.checked)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`loop-${id}`}>loop</label>
          <input
            id={`loop-${id}`}
            type="checkbox"
            checked={options.loop as boolean}
            onChange={(ev) => setOption('loop', ev.target.checked)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`swipe-${id}`}>swipe</label>
          <input
            id={`swipe-${id}`}
            type="checkbox"
            checked={options.swipe as boolean}
            onChange={(ev) => setOption('swipe', ev.target.checked)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`swipe-tolerance-${id}`}>swipeTolerance</label>
          <input
            id={`swipe-tolerance-${id}`}
            size={4}
            type="number"
            value={options.swipeTolerance as string}
            onChange={(ev) => setOption('swipeTolerance', ev.target.value)}
          />
        </div>
        {controls.map(({ label, type, optionKey, values }) => (
          <div key={label} className={styles.field}>
            {type === 'radio' ? (
              <fieldset>
                <legend>{label}</legend>
                {values?.map((value) => (
                  <label key={value}>
                    <input
                      type={type}
                      value={value}
                      checked={options[optionKey] === value}
                      onChange={(ev) =>
                        ev.target.checked && setOption(optionKey, value)
                      }
                    />
                    {value}
                  </label>
                ))}
              </fieldset>
            ) : (
              <>
                <label htmlFor={`${optionKey}-${id}`}>{label}</label>
                <input
                  id={`${optionKey}-${id}`}
                  type={type}
                  value={options[optionKey] as string}
                  checked={options[optionKey] === true}
                  onChange={(ev) =>
                    setOption(
                      optionKey,
                      type === 'checkbox' ? ev.target.checked : ev.target.value,
                    )
                  }
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
