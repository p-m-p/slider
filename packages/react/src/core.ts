import type {
  DetailedHTMLProps,
  HTMLAttributes,
  RefObject,
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

type JSXSliderElement<T> = DetailedHTMLProps<HTMLAttributes<T>, T>

declare module 'react/jsx-runtime' {
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

export interface BoxSliderProps extends Partial<BoxSliderOptions> {
  onAfter?: SliderEventListenerMap['after']
  onBefore?: SliderEventListenerMap['before']
  onDestroy?: SliderEventListenerMap['destroy']
  onPause?: SliderEventListenerMap['pause']
  onPlay?: SliderEventListenerMap['play']
  sliderRef?: RefObject<BoxSlider | null>
}

export type BaseComponentProps<T> = BoxSliderProps &
  Omit<
    JSXSliderElement<T>,
    | 'auto-scroll'
    | 'pause-on-hover'
    | 'start-index'
    | 'swipe-tolerance'
    | 'timing-function'
  >

export function extractSliderAttributes<T extends BoxSliderProps>(props: T) {
  const {
    autoScroll,
    onAfter,
    onBefore,
    onDestroy,
    onPause,
    onPlay,
    pauseOnHover,
    startIndex,
    swipeTolerance,
    ...elementProps
  } = props
  const eventHandlers = {
    onAfter,
    onBefore,
    onDestroy,
    onPause,
    onPlay,
  }
  const attributes: Record<string, string | number | boolean> = {}

  if (autoScroll !== undefined) {
    attributes['auto-scroll'] = autoScroll
  }

  if (pauseOnHover !== undefined) {
    attributes['pause-on-hover'] = pauseOnHover
  }

  if (startIndex !== undefined) {
    attributes['start-index'] = startIndex
  }

  if (swipeTolerance !== undefined) {
    attributes['swipe-tolerance'] = swipeTolerance
  }

  return { attributes, elementProps, eventHandlers }
}

export function sliderRefCallback<T extends BoxSliderProps>(
  { onAfter, onBefore, onDestroy, onPause, onPlay }: T,
  sliderRef?: RefObject<BoxSlider | null>,
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
