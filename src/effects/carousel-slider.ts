import { BoxSliderOptions } from '../box-slider-options';
import { Effect, TransitionSettings } from './effect';
import { applyCss } from '../utils';

export class CarouselSlider implements Effect {
  private slideWidth: string;
  private slideHeight: string;

  initialize(el: HTMLElement, slides: HTMLElement[], options: BoxSliderOptions): void {
    this.slideWidth = `${el.offsetWidth}px`;
    this.slideHeight = `${el.offsetHeight}px`;

    if ('static inherit'.indexOf(getComputedStyle(el).position) !== -1) {
      applyCss(el, { position: 'relative'});
    }

    applyCss(el, { overflow: 'hidden' });

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

  transition(settings: TransitionSettings): Promise<TransitionSettings> {
    return  new Promise(resolve => {
      const currentSlide = settings.slides[settings.currentIndex];
      const nextSlide = settings.slides[settings.nextIndex]

      applyCss(nextSlide, {
        left: settings.isPrevious ? `-${this.slideWidth}` : this.slideWidth,
      });

      requestAnimationFrame(() => {
        applyCss(nextSlide, {
          left: '0',
          transition: `left ${settings.speed}ms`
        });

        applyCss(currentSlide, {
          left: settings.isPrevious ? this.slideWidth : `-${this.slideWidth}`,
          transition: `left ${settings.speed}ms`
        });

        window.setTimeout(() => {
          applyCss(currentSlide, {
            left: this.slideWidth,
            transition: 'initial'
          });

          resolve(settings);
        }, settings.speed);
      });
    });
  }
}
