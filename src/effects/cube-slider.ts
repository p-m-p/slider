import { BoxSlider } from '../box-slider';
import { BoxSliderOptions } from '../box-slider-options';
import { TransitionSettings } from './effect';
import { applyCss } from '../utils';

export class CubeSlider extends BoxSlider {

  private translateZ: number;

  initialize(options: BoxSliderOptions): void {
    const width = this.el.clientWidth;
    const height = this.el.offsetHeight;
    const perspective = '1000px';
    const viewport = this.el.parentElement; // XXX Need a better defined way to get this element

    this.translateZ = width / 2;

    this.slides.forEach((slide: HTMLElement) => applyCss(slide, {
      left: '0',
      position: 'absolute',
      top: '0'
    }));

    this.setStyle({
      height: `${height}px`,
      left: '0',
      position: 'absolute',
      top: '0',
      width: `${width}px`
    });

    // ensure parent is positioned to hold the box
    if (['absolute', 'fixed', 'relative'].indexOf(viewport.style.position) === -1) {
      applyCss(viewport, { position: 'relative' });
    }

    applyCss(viewport, {
      perspective: perspective,
      overflow: 'visible'
    });

    applyCss(this.slides[this.activeIndex], {
      transform: `rotate3d(0, 1, 0, 0deg) translate3d(0, 0, ${this.translateZ}px)`
    });

    this.setStyle({
      'transform-style': 'preserve-3d',
      transform: `translate3d(0, 0, -${this.translateZ}px)`
    });

    setTimeout(() => this.setStyle('transition', `transform ${this.options.speed}ms`), 1);
  }

  transition(settings: TransitionSettings): Promise<TransitionSettings> {
    return new Promise(resolve => {
      const angle = settings.isPrevious ? 90 : -90;
      const isVert = false;

      setTimeout(() => {
        applyCss(this.slides[settings.nextIndex], {
          transform: `rotate3d(${isVert ? '1, 0, 0' : '0, 1, 0'}, ${-angle}deg) translate3d(0, 0, ${this.translateZ}px)`,
          'z-index': '2'
        });

        this.setStyle({
          transition: `transform ${this.options.speed}ms`,
          transform: `translate3d(0, 0, -${this.translateZ}px) rotate3d(${isVert ? '1, 0, 0' : '0, 1, 0'}, ${angle}deg)`
        });

        setTimeout(() => {
          this.slides.forEach((s, index) => {
            if (index !== settings.nextIndex) {
              applyCss(s, { transform: 'initial' });
            }
          });

          this.setStyle({
            transition: 'initial',
            transform: `translate3d(0, 0, -${this.translateZ}px) rotate3d(${isVert ? '1, 0, 0' : '0, 1, 0'}, 0deg)`
          });

          applyCss(this.slides[settings.nextIndex], {
            transform: `rotate3d(${isVert ? '1, 0, 0' : '0, 1, 0'}, 0deg) translate3d(0, 0, ${this.translateZ}px)`,
            'z-index': '1'
          });

          resolve(settings);
        }, this.options.speed);
      }, 1);
    });
  }
}
