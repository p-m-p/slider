import { BoxSliderOptions, defaults } from './box-slider-options';
import { Effect } from './effects/effect';
import { StyleStore } from './style-store';

export type EventType = 'after' | 'before' | 'destroy' | 'pause' | 'play';

export class BoxSlider {
  private readonly options: BoxSliderOptions;

  private activeIndex: number;
  private autoScrollTimer: number;
  private el: HTMLElement;
  private effect: Effect;
  private eventListeners: { [ev: string]: ((payload: any) => void)[] };
  private slides: HTMLElement[];
  private transitionPromise: Promise<BoxSlider>;
  private styleStore: StyleStore;
  private isDestroyed: boolean;

  constructor(el: HTMLElement, options: BoxSliderOptions) {
    if (!options.effect) {
      throw new Error('No slide effect defined in box options');
    }

    this.el = el;
    this.effect = options.effect;
    this.options = { ...defaults, ...options };
    this.slides = Array.from(el.children).filter((el: Node) => el instanceof HTMLElement) as HTMLElement[];
    this.activeIndex = this.options.startIndex;
    this.eventListeners = {};
    this.styleStore = new StyleStore();
    this.isDestroyed = false;

    if (this.slides.length > this.activeIndex) {
      this.effect.initialize(this.el, this.slides, this.styleStore, { ...this.options, effect: undefined });

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
    if(this.isDestroyed) {
      throw new Error('Invalid attempt made to move destroyed slider instance');
    }

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

      this.emit('before', {
        currentIndex: settings.currentIndex,
        nextIndex: settings.nextIndex,
        speed: settings.speed
      });

      return this.effect.transition(settings).then(() => {
        if (this.options.autoScroll) {
          this.play();
        }

        this.emit('after', { activeIndex: settings.nextIndex });

        return this;
      });
    });

    return this.transitionPromise;
  }

  pause(): BoxSlider {
    if (this.autoScrollTimer) {
      this.stopAutoPlay();
      this.emit('pause');
    }

    return this;
  }

  play(): BoxSlider {
    this.setAutoScroll();
    this.emit('play');

    return this;
  }

  addEventListener(ev: EventType, callback: (payload: any) => void): BoxSlider {
    this.eventListeners[ev] = this.eventListeners[ev] || [];
    this.eventListeners[ev].push(callback);

    return this;
  }

  removeEventListener(ev: EventType, callback: Function): BoxSlider {
    if (this.eventListeners[ev]) {
      this.eventListeners[ev] = this.eventListeners[ev].filter(cb => cb !== callback);
    }

    return this;
  }

  destroy(): void {
    this.isDestroyed = true;
    this.stopAutoPlay();

    (this.transitionPromise || Promise.resolve(null)).then(() => {
      this.styleStore.revert();
      this.emit('destroy');

      delete this.el;
      delete this.slides;
      delete this.eventListeners;
      delete this.styleStore;
      delete this.effect;
    });
  }

  private stopAutoPlay(): void {
    window.clearTimeout(this.autoScrollTimer);
  }

  private emit(ev: EventType, payload?: any): void {
    (this.eventListeners[ev] || []).forEach(cb => cb(payload));
  }

  private setAutoScroll(): void {
    if (this.autoScrollTimer) {
      this.pause();
    }

    this.autoScrollTimer = window.setTimeout(() =>
      this.next().then(() => this.setAutoScroll()), this.options.timeout);
  }
}
