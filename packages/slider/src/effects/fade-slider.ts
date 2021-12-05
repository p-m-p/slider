import { Effect, TransitionSettings } from './effect';
import { BoxSliderOptions } from '../box-slider-options';
import { applyCss } from '../utils';
import { StyleStore } from '../style-store';

export interface FadeSliderOptions {
  timingFunction?: string;
}

const defaults: FadeSliderOptions = {
  timingFunction: 'ease-in'
}

const SLIDE_STYLES = ['display', 'height', 'left', 'opacity', 'position', 'top', 'transition', 'width', 'z-index'];
const BOX_STYLES = ['height', 'overflow', 'position'];

export class FadeSlider implements Effect {

  private readonly  options: FadeSliderOptions;

  constructor(options = defaults) {
    this.options = { ...defaults, ...options };
  }

  initialize(el: HTMLElement, slides: HTMLElement[], styleStore: StyleStore, options: BoxSliderOptions): void {
    styleStore.store(slides, SLIDE_STYLES);
    styleStore.store(el, BOX_STYLES);

    if ('static inherit'.indexOf(getComputedStyle(el).position) !== -1) {
      applyCss(el, { position: 'relative' });
    }

    applyCss(el, {
      height: `${slides[options.startIndex].offsetHeight}px`,
      overflow: 'hidden'
    });

    slides.forEach((slide: HTMLElement, index: number) => {
      applyCss(slide, {
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        transition: `opacity ${options.speed}ms ${this.options.timingFunction}`,
        width: '100%'
      });

      if (index !== options.startIndex) {
        applyCss(slide, { display: 'none' });
      }
    });
  }

  transition(settings: TransitionSettings): Promise<void> {
    return new Promise(resolve => {
      const currentSlide = settings.slides[settings.currentIndex];
      const nextSlide = settings.slides[settings.nextIndex];

      applyCss(currentSlide, { 'z-index': '2', opacity: '0' });
      applyCss(nextSlide, { 'z-index': '1', display: 'block' });

      setTimeout(() => {
        applyCss(currentSlide, { display: 'none', opacity: '1' });

        resolve();
      }, settings.speed);
    });
  }
}
