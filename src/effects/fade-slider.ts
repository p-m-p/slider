import { Effect, TransitionSettings } from './effect';
import { BoxSliderOptions } from '../box-slider-options';
import { applyCss } from '../utils';

export class FadeSlider implements Effect {

  initialize(el: HTMLElement, slides: HTMLElement[], options: BoxSliderOptions): void {
    if ('static inherit'.indexOf(el.style.position) !== -1) {
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
        width: '100%',
        transition: `opacity ${options.speed}ms`
      });

      if (index !== options.startIndex) {
        applyCss(slide, { display: 'none' });
      }
    });
  }

  transition(settings: TransitionSettings): Promise<TransitionSettings> {
    return new Promise(resolve => {
      const currentSlide = settings.slides[settings.currentIndex];
      const nextSlide = settings.slides[settings.nextIndex];

      applyCss(currentSlide, { 'z-index': '2', opacity: '0' });
      applyCss(nextSlide, { 'z-index': '1', display: 'block' });

      setTimeout(() => {
        applyCss(currentSlide, { display: 'none', opacity: '1' });

        resolve(settings);
      }, settings.speed);
    });
  }
}
