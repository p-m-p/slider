import { BoxSliderOptions, defaults } from './box-slider-options';
import { applyCss } from './utils';
import { Effect, TransitionSettings } from './effects/effect';

export const ACTIVE_SLIDE_CLASS = 'bs-active';

export abstract class BoxSlider implements Effect {
  protected el: HTMLElement;
  protected options: BoxSliderOptions;
  protected slides: HTMLElement[];
  protected activeIndex: number;
  protected autoScrollTimer: number;

  constructor(el: HTMLElement, options: BoxSliderOptions = {}) {
    this.el = el;
    this.options = { ...defaults, ...options };
    this.slides = Array.from(el.children).filter((el: Node) => el instanceof HTMLElement) as HTMLElement[];
    this.activeIndex = 0; // XXX Allow this to be set from options

    if (this.slides.length > this.activeIndex) {
      this.slides[this.activeIndex].classList.add(ACTIVE_SLIDE_CLASS);
      this.initialize(this.options);

      if (options.autoScroll) {
        this.setAutoScroll();
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialize(options: BoxSliderOptions): void {
    throw new Error('Effect must implement the initialize method');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transition(settings: TransitionSettings): Promise<TransitionSettings> {
    throw new Error('Effect must implement the transition method');
  }

  next(): Promise<BoxSlider> {
    const currentIndex = this.activeIndex;
    const nextIndex = this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1;

    this.activeIndex = nextIndex;
    return this.transition({ currentIndex, nextIndex }).then(() => this);
  }

  protected setStyle(style: string | { [style: string]: string }, value?: string): BoxSlider {
    if (typeof style === 'string') {
      this.el.style.setProperty(style, value);
    } else {
      applyCss(this.el, style);
    }

    return this;
  }

  private setAutoScroll(): void {
    this.autoScrollTimer = window.setTimeout(() =>
      this.next().then(() => this.setAutoScroll()), this.options.timeout);
  }
}
