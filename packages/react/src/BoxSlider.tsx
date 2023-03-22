import { Component, type ComponentPropsWithoutRef, type MutableRefObject } from 'react'
import { BoxSlider as BxSlider, BoxSliderOptions, SliderEventData, SliderEventHandler } from '@boxslider/slider'

export interface BoxSliderComponentProps extends ComponentPropsWithoutRef<'div'> {
  onAfter?: SliderEventHandler
  onBefore?: SliderEventHandler
  onDestroy?: SliderEventHandler
  onStartAutoScroll?: SliderEventHandler
  onStopAutoScroll?: SliderEventHandler
  sliderOptions?: Partial<BoxSliderOptions>
  slideIndex?: number
  sliderRef?: MutableRefObject<BxSlider | null>
}

export interface BoxSliderProps extends BoxSliderComponentProps {
  sliderOptions: Partial<BoxSliderOptions>
}

const sliderPropNames = [
  'effectOptions',
  'onAfter',
  'onBefore',
  'onDestroy',
  'onStartAutoScroll',
  'onStopAutoScroll',
  'sliderOptions',
  'slideIndex',
  'sliderRef',
]

function filterProps(props: BoxSliderProps): ComponentPropsWithoutRef<'div'> {
  const includeKeys = Object.keys(props).filter((key) => !sliderPropNames.includes(key))

  return includeKeys.reduce(
    (includedProps, key) => ({
      ...includedProps,
      [key]: props[key as keyof BoxSliderProps],
    }),
    {},
  )
}

class BoxSlider extends Component<BoxSliderProps> {
  private el?: HTMLDivElement | null
  private boxSlider?: BxSlider

  componentDidMount() {
    if (this.el) {
      this.boxSlider = new BxSlider(this.el, { ...this.props.sliderOptions })
      this.boxSlider.addEventListener('before', (ev: SliderEventData) => {
        if (this.props.onBefore) this.props.onBefore.call(undefined, ev)
      })
      this.boxSlider.addEventListener('after', (ev: SliderEventData) => {
        if (this.props.onAfter) this.props.onAfter.call(undefined, ev)
      })
      this.boxSlider.addEventListener('play', (ev: SliderEventData) => {
        if (this.props.onStartAutoScroll) this.props.onStartAutoScroll.call(undefined, ev)
      })
      this.boxSlider.addEventListener('pause', (ev: SliderEventData) => {
        if (this.props.onStopAutoScroll) this.props.onStopAutoScroll.call(undefined, ev)
      })
      this.boxSlider.addEventListener('destroy', (ev: SliderEventData) => {
        if (this.props.onDestroy) this.props.onDestroy.call(undefined, ev)
      })
    }

    if (this.boxSlider && this.props.sliderRef) {
      this.props.sliderRef.current = this.boxSlider
    }
  }

  componentWillUnmount() {
    this.boxSlider?.destroy()
  }

  componentDidUpdate(prevProps: Readonly<BoxSliderProps>) {
    if (this.props.sliderOptions !== prevProps.sliderOptions) {
      this.boxSlider?.reset({ ...this.props.sliderOptions })
    }

    if (this.props.slideIndex !== undefined && this.props.slideIndex !== prevProps.slideIndex) {
      this.boxSlider?.skipTo(this.props.slideIndex)
    }
  }

  render() {
    const { children, ...props } = this.props

    return (
      <div {...filterProps(props)}>
        <div style={{ width: '100%', height: '100%' }} ref={(el) => (this.el = el)}>
          {children}
        </div>
      </div>
    )
  }
}

export default BoxSlider
