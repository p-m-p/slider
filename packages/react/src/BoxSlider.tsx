import type {
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  RefCallback,
} from 'react'
import type { BoxSlider, SliderEventListenerMap } from '@boxslider/slider'
import type {
  CarouselSliderElement,
  CubeSliderElement,
  FadeSliderElement,
  TileSliderElement,
  SliderElement,
} from '@boxslider/components'
import type { BoxSliderOptions } from '@boxslider/slider'
import type { ComponentPropsWithoutRef } from 'react'

interface JSXSliderElement<T> extends DetailedHTMLProps<HTMLAttributes<T>, T> {
  class?: string
  'start-index'?: number
}

declare global {
  /* eslint-disable-next-line @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'bs-carousel': JSXSliderElement<CarouselSliderElement>
      'bs-cube': JSXSliderElement<CubeSliderElement>
      'bs-fade': JSXSliderElement<FadeSliderElement>
      'bs-tile': JSXSliderElement<TileSliderElement>
    }
  }
}

type ElementName = 'bs-carousel' | 'bs-cube' | 'bs-fade' | 'bs-tile'

export interface BoxSliderProps extends Partial<BoxSliderOptions> {
  onAfter?: SliderEventListenerMap['after']
  onBefore?: SliderEventListenerMap['before']
  onDestroy?: SliderEventListenerMap['destroy']
  onPause?: SliderEventListenerMap['pause']
  onPlay?: SliderEventListenerMap['play']
  sliderRef?: MutableRefObject<BoxSlider | null>
}

export type BaseComponentProps<T extends ElementName> = BoxSliderProps &
  Omit<
    ComponentPropsWithoutRef<T>,
    | 'auto-scroll'
    | 'pause-on-hover'
    | 'start-index'
    | 'swipe-tolerance'
    | 'timing-function'
  >

export function extractSliderAttributes<T extends BoxSliderProps>(props: T) {
  const {
    autoScroll,
    pauseOnHover,
    startIndex,
    swipeTolerance,
    ...extraProps
  } = props
  const attributes: Record<string, string> = {}

  if (autoScroll !== undefined) {
    attributes['auto-scroll'] = `${autoScroll}`
  }

  if (pauseOnHover !== undefined) {
    attributes['pause-on-hover'] = `${pauseOnHover}`
  }

  if (startIndex !== undefined) {
    attributes['start-index'] = `${startIndex}`
  }

  if (swipeTolerance !== undefined) {
    attributes['swipe-tolerance'] = `${swipeTolerance}`
  }

  return { attributes, extraProps }
}

export function sliderRefCallback<T extends BoxSliderProps>(
  props: T,
  sliderRef?: MutableRefObject<BoxSlider | null>,
): RefCallback<SliderElement> {
  const { onAfter, onBefore, onDestroy, onPause, onPlay } = props

  return (el: SliderElement) => {
    const slider = el?.slider

    if (slider) {
      if (onAfter) {
        slider.addEventListener('after', onAfter)
      }

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

      if (sliderRef) {
        sliderRef.current = slider
      }
    }
  }
}
