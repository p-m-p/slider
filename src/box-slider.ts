import { BoxSliderOptions, defaults } from './box-slider-options';
import { applyCss } from './utils';
import { Effect } from './effects/effect';

export const ACTIVE_SLIDE_CLASS = 'bs-active';

export class BoxSlider {
  private readonly el: HTMLElement;
  private readonly effect: Effect;
  private readonly options: BoxSliderOptions;
  private readonly slides: HTMLElement[];

  private activeIndex: number;
  private autoScrollTimer: number;
  private transitionPromise: Promise<BoxSlider>;

  constructor(el: HTMLElement, options: BoxSliderOptions) {
    if (!options.effect) {
      throw new Error('No slide effect defined in box options');
    }

    this.el = el;
    this.effect = options.effect;
    this.options = { ...defaults, ...options };
    this.slides = Array.from(el.children).filter((el: Node) => el instanceof HTMLElement) as HTMLElement[];
    this.activeIndex = this.options.startIndex;

    if (this.slides.length > this.activeIndex) {
      this.slides[this.activeIndex].classList.add(ACTIVE_SLIDE_CLASS);
      this.effect.initialize(this.el, this.slides, { ...this.options, effect: undefined });

      if (options.autoScroll) {
        this.setAutoScroll();
      }
    }
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

    const settings = {
      el: this.el,
      slides: this.slides,
      speed: this.options.speed,
      currentIndex: this.activeIndex,
      isPrevious: backwards,
      nextIndex,
    };
    this.activeIndex = nextIndex;

    this.transitionPromise = (this.transitionPromise || Promise.resolve(this)).then(() => {
      if (this.options.autoScroll) {
        this.pause();
      }

      return this.effect.transition(settings).then(() => {
        if (this.options.autoScroll) {
          this.play();
        }

        return this;
      });
    });

    return this.transitionPromise;
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
