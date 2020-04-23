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
    this.activeIndex = this.options.startIndex;

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
    return this.skipTo(this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1);
  }

  prev(): Promise<BoxSlider> {
    return this.skipTo(this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1, true);
  }

  skipTo(nextIndex: number, backwards = false): Promise<BoxSlider> {
    if (nextIndex < 0 || nextIndex >= this.slides.length) {
      throw new Error(`${nextIndex} is not a valid slide index`);
    }

    const currentIndex = this.activeIndex;

    if (this.options.autoScroll) {
      this.pause();
    }

    this.activeIndex = nextIndex;

    return this.transition({
      currentIndex,
      nextIndex,
      isPrevious: backwards
    }).then(() => {
      if (this.options.autoScroll) {
        this.play();
      }

      return this;
    });
  }

  pause(): BoxSlider {
    if (this.autoScrollTimer) {
      window.clearTimeout(this.autoScrollTimer);
    }

    return this;
  }

  play(): BoxSlider {
    this.setAutoScroll();

    return this;
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
    if (this.autoScrollTimer) {
      this.pause();
    }

    this.autoScrollTimer = window.setTimeout(() =>
      this.next().then(() => this.setAutoScroll()), this.options.timeout);
  }
}
