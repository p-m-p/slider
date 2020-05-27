import { BoxSliderOptions, defaults } from './box-slider-options';
import { Effect } from './effects';
import { StyleStore } from './style-store';
import { responder } from './responder';

export type EventType = 'after' | 'before' | 'destroy' | 'pause' | 'play';
export type EventData = { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

export class BoxSlider {
  private readonly options: BoxSliderOptions;

  private activeIndex: number;
  private autoScrollTimer: number;
  private el: HTMLElement;
  private effect: Effect;
  private eventListeners: { [ev: string]: ((payload: EventData) => void)[] };
  private isDestroyed: boolean;
  private slides: HTMLElement[];
  private styleStore: StyleStore;
  private transitionPromise: Promise<BoxSlider>;

  constructor(el: Element | HTMLElement, options: BoxSliderOptions) {
    if (!options.effect) {
      throw new Error('No slide effect defined in box options');
    }

    this.el = el as HTMLElement;
    this.effect = options.effect;
    this.options = { ...defaults, ...options };
    this.slides = Array.from(el.children).filter((el: Node) => el instanceof HTMLElement) as HTMLElement[];
    this.activeIndex = this.options.startIndex;
    this.eventListeners = {};
    this.styleStore = new StyleStore();
    this.isDestroyed = false;

    this.applyEventListeners();
    responder.add(this);

    if (this.slides.length > this.activeIndex) {
      this.effect.initialize(this.el, this.slides, this.styleStore, { ...this.options, effect: undefined });

      if (options.autoScroll) {
        this.setAutoScroll();
      }
    }
  }

  reset(): void {
    this.styleStore.revert();
    this.effect.initialize(this.el, this.slides, this.styleStore, {
      ...this.options,
      effect: undefined,
      startIndex: this.activeIndex
    });
  }

  next(): Promise<BoxSlider> {
    return this.skipTo(this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1, false);
  }

  prev(): Promise<BoxSlider> {
    return this.skipTo(this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1, true);
  }

  skipTo(nextIndex: number, backwards?: boolean): Promise<BoxSlider> {
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
      isPrevious: backwards === undefined ? nextIndex < this.activeIndex : backwards,
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

  addEventListener(ev: EventType, callback: (payload: EventData) => void): BoxSlider {
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
      if (this.effect.destroy) {
        this.effect.destroy(this.el);
      }

      this.styleStore.revert();
      responder.remove(this);
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

  private emit(ev: EventType, payload?: EventData): void {
    (this.eventListeners[ev] || []).forEach(cb => cb(payload));
  }

  private setAutoScroll(): void {
    if (this.autoScrollTimer) {
      this.pause();
    }

    this.autoScrollTimer = window.setTimeout(() =>
      this.next().then(() => this.setAutoScroll()), this.options.timeout);
  }

  private applyEventListeners(): void {
    if (this.options.pauseOnHover) { // XXX Need to properly check if it's actually set to play/pause in options
      this.el.addEventListener('mouseenter', () => this.pause());
      this.el.addEventListener('mouseleave', () => this.play());
    }

    if (this.options.swipe) {
      this.addSwipeNavigation();
    }
  }

  private addSwipeNavigation(): void {
    let pointerTraceX = 0;

    this.el.addEventListener('pointerdown', ev => {
      pointerTraceX = ev.clientX;
    });

    this.el.addEventListener('pointerup', ev => {
      const distanceX = ev.clientX - pointerTraceX;

      // XXX Need to be able to determine if effect scrolling is vertical
      if (Math.abs(distanceX) >= this.options.swipeTolerance) {
        if (distanceX > 0) {
          this.prev();
        } else {
          this.next();
        }

        ev.stopPropagation();
      }
    });
  }
}
