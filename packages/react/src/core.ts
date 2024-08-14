import type {
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  RefCallback,
} from 'react'
import type {
  BoxSlider,
  BoxSliderOptions,
  SliderEventListenerMap,
} from '@boxslider/slider'
import type {
  CarouselSliderElement,
  CubeSliderElement,
  FadeSliderElement,
  TileSliderElement,
  SliderControlsElement,
  SliderElement,
} from '@boxslider/components'
import type { ComponentPropsWithoutRef } from 'react'

interface JSXSliderElement<T> extends DetailedHTMLProps<HTMLAttributes<T>, T> {
  class?: string
}

declare global {
  /* eslint-disable-next-line @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'bs-carousel': JSXSliderElement<CarouselSliderElement>
      'bs-cube': JSXSliderElement<CubeSliderElement>
      'bs-fade': JSXSliderElement<FadeSliderElement>
      'bs-tile': JSXSliderElement<TileSliderElement>
      'bs-slider-controls': JSXSliderElement<SliderControlsElement>
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
    | 'loop'
    | 'pause-on-hover'
    | 'start-index'
    | 'swipe-tolerance'
    | 'timing-function'
  >

export function extractSliderAttributes<T extends BoxSliderProps>(props: T) {
  const {
    autoScroll,
    loop,
    onAfter,
    onBefore,
    onDestroy,
    onPause,
    onPlay,
    pauseOnHover,
    startIndex,
    speed,
    swipe,
    swipeTolerance,
    timeout,
  } = props
  const eventHandlers = {
    onAfter,
    onBefore,
    onDestroy,
    onPause,
    onPlay,
  }
  const attributes: Record<string, string> = {}

  if (autoScroll !== undefined) {
    attributes['auto-scroll'] = `${autoScroll}`
  }

  if (loop !== undefined) {
    attributes.loop = `${loop}`
  }

  if (pauseOnHover !== undefined) {
    attributes['pause-on-hover'] = `${pauseOnHover}`
  }

  if (speed !== undefined) {
    attributes.speed = `${speed}`
  }

  if (startIndex !== undefined) {
    attributes['start-index'] = `${startIndex}`
  }

  if (swipe !== undefined) {
    attributes.swipe = `${swipe}`
  }

  if (swipeTolerance !== undefined) {
    attributes['swipe-tolerance'] = `${swipeTolerance}`
  }

  if (timeout !== undefined) {
    attributes.timeout = `${timeout}`
  }

  return { attributes, eventHandlers }
}

export function sliderRefCallback<T extends BoxSliderProps>(
  { onAfter, onBefore, onDestroy, onPause, onPlay }: T,
  sliderRef?: MutableRefObject<BoxSlider | null>,
): RefCallback<SliderElement> {
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
