import { ReactNode, useEffect, useRef, useState } from 'react'
import { BoxSlider, BoxSliderOptions, EventData } from '@boxslider/slider'

export interface BxlComponentProps {
  children: ReactNode
  sliderOptions?: Partial<BoxSliderOptions>
  className?: string
  slideIndex?: number
  onBefore?: (ev: EventData) => void
  onAfter?: (ev: EventData) => void
  onDestroy?: () => void
  onPlay?: () => void
  onPause?: () => void
}

export interface BxlSliderProps extends BxlComponentProps {
  sliderOptions: Partial<BoxSliderOptions>
}

export function BxlSlider(props: BxlSliderProps) {
  const el = useRef(null)

  useEffect(() => {
    if (el.current !== null) {
      const slider = new BoxSlider(el.current, props.sliderOptions)

      // Event listeners

      return () => slider.destroy()
    }
  }, [props.sliderOptions])

  // componentDidMount() {
  //   if (this.el) {
  //     this.boxSlider = new BoxSlider(this.el, this.props.sliderOptions)
  //     this.boxSlider.addEventListener('before', (ev: EventData) => {
  //       if (this.props.onBefore) this.props.onBefore.call(undefined, ev)
  //     })
  //     this.boxSlider.addEventListener('after', (ev: EventData) => {
  //       if (this.props.onAfter) this.props.onAfter.call(undefined, ev)
  //     })
  //     this.boxSlider.addEventListener('play', () => {
  //       if (this.props.onPlay) this.props.onPlay.call(undefined)
  //     })
  //     this.boxSlider.addEventListener('pause', () => {
  //       if (this.props.onPause) this.props.onPause.call(undefined)
  //     })
  //     this.boxSlider.addEventListener('destroy', () => {
  //       if (this.props.onDestroy) this.props.onDestroy.call(undefined)
  //     })
  //   }
  // }

  // componentWillUnmount() {
  //   console.log('unmounting', this.boxSlider)
  //   if (this.boxSlider) {
  //     this.boxSlider.destroy()
  //   }
  // }

  // componentDidUpdate(prevProps: Readonly<BxlSliderProps>) {
  //   if (this.props.slideIndex !== undefined && this.props.slideIndex !== prevProps.slideIndex) {
  //     this.boxSlider?.skipTo(this.props.slideIndex)
  //   }
  // }

  return (
    <div className={props.className}>
      <div style={{ width: '100%', height: '100%' }} ref={el}>
        {props.children}
      </div>
    </div>
  )
}
