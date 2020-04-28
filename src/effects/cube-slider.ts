import { Effect, TransitionSettings } from './effect';
import { applyCss } from '../utils';
import { BoxSliderOptions } from '../box-slider-options';

export class CubeSlider implements Effect {

  private translateZ: number;

  initialize(el: HTMLElement, slides: HTMLElement[], options: BoxSliderOptions): void {
    const width = el.clientWidth;
    const height = el.offsetHeight;
    const perspective = '1000px';
    const viewport = el.parentElement; // XXX Need a better defined way to get this element

    this.translateZ = width / 2;

    slides.forEach((slide: HTMLElement) => applyCss(slide, {
      left: '0',
      position: 'absolute',
      top: '0'
    }));

    applyCss(el, {
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

    applyCss(slides[options.startIndex], {
      transform: `rotate3d(0, 1, 0, 0deg) translate3d(0, 0, ${this.translateZ}px)`
    });

    applyCss(el, {
      'transform-style': 'preserve-3d',
      transform: `translate3d(0, 0, -${this.translateZ}px)`
    });

    requestAnimationFrame(() => applyCss(el, {
      transition: `transform ${options.speed}ms`
    }));
  }

  transition(settings: TransitionSettings): Promise<TransitionSettings> {
    return new Promise(resolve => {
      const angle = settings.isPrevious ? 90 : -90;
      const isVert = false;

      requestAnimationFrame(() => {
        applyCss(settings.slides[settings.nextIndex], {
          transform: `rotate3d(${isVert ? '1, 0, 0' : '0, 1, 0'}, ${-angle}deg) translate3d(0, 0, ${this.translateZ}px)`,
          'z-index': '2'
        });

        applyCss(settings.el, {
          transition: `transform ${settings.speed}ms`,
          transform: `translate3d(0, 0, -${this.translateZ}px) rotate3d(${isVert ? '1, 0, 0' : '0, 1, 0'}, ${angle}deg)`
        });

        setTimeout(() => {
          settings.slides.forEach((s, index) => {
            if (index !== settings.nextIndex) {
              applyCss(s, { transform: 'initial' });
            }
          });

          applyCss(settings.el, {
            transition: 'initial',
            transform: `translate3d(0, 0, -${this.translateZ}px) rotate3d(${isVert ? '1, 0, 0' : '0, 1, 0'}, 0deg)`
          });

          applyCss(settings.slides[settings.nextIndex], {
            transform: `rotate3d(${isVert ? '1, 0, 0' : '0, 1, 0'}, 0deg) translate3d(0, 0, ${this.translateZ}px)`,
            'z-index': '1'
          });

          resolve(settings);
        }, settings.speed);
      });
    });
  }
}
