import { type ReactNode, useEffect, useRef, useState } from 'react'
import { BoxSlider as BxSlider, type BoxSliderOptions, type EventData } from '@boxslider/slider'

export interface BxlComponentProps {
  children: ReactNode
  sliderOptions?: Partial<BoxSliderOptions>
  className?: string
  onBefore?: (ev: EventData) => void
  onAfter?: (ev: EventData) => void
  onDestroy?: () => void
  onPlay?: () => void
  onPause?: () => void
}

export interface BxlSliderProps extends BxlComponentProps {
  sliderOptions: Partial<BoxSliderOptions>
}

export function BoxSlider({
  children,
  className,
  onAfter,
  onBefore,
  onDestroy,
  onPause,
  onPlay,
  sliderOptions,
}: BxlSliderProps) {
  const [index, setIndex] = useState(sliderOptions.startIndex || 0)
  const el = useRef(null)

  useEffect(() => {
    if (el.current !== null) {
      const slider = new BxSlider(el.current, { ...sliderOptions, startIndex: index })

      slider.addEventListener('after', (ev: EventData) => {
        setIndex(ev!.activeIndex as number)

        if (onAfter) {
          onAfter(ev)
        }
      })

      if (onBefore) {
        slider.addEventListener('before', onBefore)
      }
      if (onDestroy) {
        slider.addEventListener('destroy', onDestroy)
      }
      if (onPause) {
        slider.addEventListener('pause', onPause)
      }
      if (onPlay) {
        slider.addEventListener('play', onPlay)
      }

      return () => slider.destroy()
    }
  }, [index, onAfter, onBefore, onDestroy, onPause, onPlay, sliderOptions])

  return (
    <div className={className}>
      <div style={{ width: '100%', height: '100%' }} ref={el}>
        {children}
      </div>
    </div>
  )
}

export default BoxSlider
