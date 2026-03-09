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
  onReset?: SliderEventListenerMap['reset']
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

export function extractEventHandlers<T extends BoxSliderProps>(props: T) {
  const {
    onAfter,
    onBefore,
    onDestroy,
    onPause,
    onPlay,
    onReset,
    ...elementProps
  } = props
  const eventHandlers = {
    onAfter,
    onBefore,
    onDestroy,
    onPause,
    onPlay,
    onReset,
  }

  return { elementProps, eventHandlers }
}

export function sliderRefCallback<T extends BoxSliderProps>(
  eventHandlers: T,
  sliderRef?: RefObject<BoxSlider | null>,
): RefCallback<SliderElement> {
  return (el: SliderElement) => {
    const slider = el?.slider

    if (slider) {
      const events = [
        ['after', eventHandlers.onAfter],
        ['before', eventHandlers.onBefore],
        ['destroy', eventHandlers.onDestroy],
        ['pause', eventHandlers.onPause],
        ['play', eventHandlers.onPlay],
        ['reset', eventHandlers.onReset],
      ] as const

      for (const [event, handler] of events) {
        if (handler) {
          slider.addEventListener(event, handler)
        }
      }

      if (sliderRef) {
        sliderRef.current = slider
      }

      // React 19 ref cleanup - remove event listeners on unmount
      return () => {
        for (const [event, handler] of events) {
          if (handler) {
            slider.removeEventListener(event, handler)
          }
        }

        if (sliderRef) {
          sliderRef.current = null
        }
      }
    }
  }
}
