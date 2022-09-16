import { Component, ReactNode } from 'react'
import { BoxSlider as BxSlider, BoxSliderOptions, EventData } from '@boxslider/slider'

export interface BxlComponentProps {
  children: ReactNode
  sliderOptions?: Partial<BoxSliderOptions>
  className?: string
  slideIndex?: number
  onBefore?: (ev?: EventData) => void
  onAfter?: (ev?: EventData) => void
  onDestroy?: () => void
  onPlay?: () => void
  onPause?: () => void
}

export interface BxlSliderProps extends BxlComponentProps {
  sliderOptions: Partial<BoxSliderOptions>
}

export class BoxSlider extends Component<BxlSliderProps> {
  private el!: HTMLDivElement | null;
  private boxSlider!: BxSlider;

  componentDidMount() {
    if (this.el) {
      this.boxSlider = new BxSlider(this.el, this.props.sliderOptions);
      this.boxSlider.addEventListener('before', (ev: EventData) => {
        if (this.props.onBefore) this.props.onBefore.call(undefined, ev);
      });
      this.boxSlider.addEventListener('after', (ev: EventData) => {
        if (this.props.onAfter) this.props.onAfter.call(undefined, ev);
      });
      this.boxSlider.addEventListener('play', () => {
        if (this.props.onPlay) this.props.onPlay.call(undefined);
      });
      this.boxSlider.addEventListener('pause', () => {
        if (this.props.onPause) this.props.onPause.call(undefined);
      });
      this.boxSlider.addEventListener('destroy', () => {
        if (this.props.onDestroy) this.props.onDestroy.call(undefined);
      });
    }
  }

  componentWillUnmount() {
    if (this.boxSlider) {
      this.boxSlider.destroy();
    }
  }

  componentDidUpdate(prevProps: Readonly<BxlSliderProps>) {
    if (this.props.slideIndex !== undefined && this.props.slideIndex !== prevProps.slideIndex) {
      this.boxSlider?.skipTo(this.props.slideIndex);
    }
  }

  render() {
    return <div className={this.props.className}>
      <div style={{ width: '100%', height: '100%'}} ref={el => this.el = el}>{ this.props.children }</div>
    </div>;
  }
}

export default BoxSlider
