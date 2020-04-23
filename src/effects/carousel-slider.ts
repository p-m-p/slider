import { BoxSlider } from '../box-slider';
import { BoxSliderOptions } from '../box-slider-options';
import { TransitionSettings } from './effect';
import { applyCss } from '../utils';

export class CarouselSlider extends BoxSlider {
  private slideWidth: string;
  private slideHeight: string;

  initialize(options: BoxSliderOptions): void {
    this.slideWidth = `${this.el.offsetWidth}px`;
    this.slideHeight = `${this.el.offsetHeight}px`;

    // XXX Move this to protected method on the box
    if ('static inherit'.indexOf(this.el.style.position) !== -1) {
      this.setStyle('position', 'relative');
    }

    this.setStyle('overflow', 'hidden');
    this.slides.forEach((slide, index) => {
      applyCss(slide, {
        height: this.slideHeight,
        left: '0',
        position: 'absolute',
        top: '0',
        transition: `left ${this.options.speed}ms`,
        width: this.slideWidth
      });

      if (index !== this.activeIndex) {
        applyCss(slide, { visibility: 'hidden' });
      }
    });
  }

  transition(settings: TransitionSettings): Promise<TransitionSettings> {
    return  new Promise(resolve => {
      const currentSlide = this.slides[settings.currentIndex];
      const nextSlide = this.slides[settings.nextIndex]

      applyCss(nextSlide, {
        left: settings.isPrevious ? `-${this.slideWidth}` : this.slideWidth,
        visibility: 'visible',
        transition: 'none'
      });

      window.setTimeout(() => {
        applyCss(nextSlide, {
          left: '0',
          transition: `left ${this.options.speed}ms`
        });
        applyCss(currentSlide, {
          left: settings.isPrevious ? this.slideWidth : `-${this.slideWidth}`
        });

        window.setTimeout(() => {
          applyCss(currentSlide, { left: '0', visibility: 'hidden' });
          resolve(settings);
        }, this.options.speed);
      }, 1);
    });
  }
}
