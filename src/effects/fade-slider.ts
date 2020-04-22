import { Effect, TransitionSettings } from './effect';
import { BoxSlider } from '../box-slider';
import { BoxSliderOptions } from '../box-slider-options';
import { applyCss } from '../utils';

export class FadeSlider extends BoxSlider implements Effect {

  initialize(settings: BoxSliderOptions): void {
    if ('static inherit'.indexOf(this.el.style.position) !== -1) {
      this.setStyle('position', 'relative');
    }

    this.setStyle({
      height: `${this.slides[this.activeIndex].offsetHeight}px`,
      overflow: 'hidden'
    });

    Array.from(this.slides).forEach((slide: HTMLElement, index: number) => {
      applyCss(slide, {
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '100%',
        transition: `opacity ${settings.speed}ms`
      });

      if (index !== this.activeIndex) {
        applyCss(slide, { display: 'none' });
      }
    });
  }

  transition(settings: TransitionSettings): Promise<TransitionSettings> {
    return new Promise(resolve => {
      const currentSlide = this.slides[settings.currentIndex];
      const nextSlide = this.slides[settings.nextIndex];

      applyCss(currentSlide, { 'z-index': '2', opacity: '0' });
      applyCss(nextSlide, { 'z-index': '1', display: 'block' });

      setTimeout(() => {
        applyCss(currentSlide, { display: 'none', opacity: '1' });

        resolve(settings);
      }, this.options.speed);
    });
  }
}
