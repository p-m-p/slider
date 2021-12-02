import { BoxSliderOptions } from '../box-slider-options';
import { Effect, TransitionSettings } from './effect';
import { applyCss } from '../utils';
import { StyleStore } from '../style-store';

export interface CarouselSliderOptions {
  timingFunction?: string;
}

const defaults: CarouselSliderOptions = {
  timingFunction: 'ease-in-out'
}

const SLIDE_STYLES = ['height', 'left', 'position', 'top', 'transition', 'width'];
const BOX_STYLES = ['overflow', 'position'];

export class CarouselSlider implements Effect {
  private readonly options: CarouselSliderOptions;
  private slideWidth!: string;
  private slideHeight!: string;

  constructor(options = defaults) {
    this.options = { ...defaults, ...options };
  }

  initialize(el: HTMLElement, slides: HTMLElement[], styleStore: StyleStore, options: BoxSliderOptions): void {
    this.slideWidth = `${el.offsetWidth}px`;
    this.slideHeight = `${el.offsetHeight}px`;

    styleStore.store(slides, SLIDE_STYLES);
    styleStore.store(el, BOX_STYLES);

    applyCss(el, { overflow: 'hidden' });

    if ('static inherit'.indexOf(getComputedStyle(el).position) !== -1) {
      applyCss(el, { position: 'relative'});
    }

    slides.forEach((slide, index) => {
      applyCss(slide, {
        height: this.slideHeight,
        left: this.slideWidth,
        position: 'absolute',
        top: '0',
        width: this.slideWidth
      });

      if (index === options.startIndex) {
        applyCss(slide, { left: '0' });
      }
    });
  }

  transition(settings: TransitionSettings): Promise<void> {
    const currentSlide = settings.slides[settings.currentIndex];
    const nextSlide = settings.slides[settings.nextIndex]

    return new Promise(resolve => {
      applyCss(nextSlide, {
        left: settings.isPrevious ? `-${this.slideWidth}` : this.slideWidth
      });

      requestAnimationFrame(() => {
        setTimeout(() => {
          applyCss(nextSlide, {
            left: '0',
            transition: `left ${settings.speed}ms ${this.options.timingFunction}`
          });

          applyCss(currentSlide, {
            left: settings.isPrevious ? this.slideWidth : `-${this.slideWidth}`,
            transition: `left ${settings.speed}ms ${this.options.timingFunction}`
          });

          window.setTimeout(() => {
            applyCss(currentSlide, {
              left: this.slideWidth,
              transition: 'initial'
            });

            resolve();
          }, settings.speed + 10);
        }, 10);
      });
    });
  }
}
