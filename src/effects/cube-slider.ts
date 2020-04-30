import { Effect, TransitionSettings } from './effect';
import { applyCss } from '../utils';
import { BoxSliderOptions } from '../box-slider-options';

export interface CubeSliderOptions {
  direction?: 'horizontal' | 'vertical';
  perspective?: number;
}

export const defaults: CubeSliderOptions = {
  perspective: 1000,
  direction: 'horizontal'
};

export class CubeSlider implements Effect {

  private readonly options: CubeSliderOptions;
  private translateZ: number;

  constructor(options: CubeSliderOptions = {}) {
    this.options = { ...defaults, ...options };
  }

  initialize(el: HTMLElement, slides: HTMLElement[], options: BoxSliderOptions): void {
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const perspective = `${this.options.perspective}px`;
    const viewport = el.parentElement;

    this.translateZ = this.options.direction === 'vertical' ? height / 2 : width / 2;

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
    if (['absolute', 'fixed', 'relative'].indexOf(getComputedStyle(viewport).position) === -1) {
      applyCss(viewport, { position: 'relative' });
    }

    applyCss(viewport, {
      perspective: perspective,
      overflow: 'visible'
    });

    applyCss(slides[options.startIndex], {
      transform: `${this.rotation(0)} translate3d(0, 0, ${this.translateZ}px)`
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

      requestAnimationFrame(() => {
        applyCss(settings.slides[settings.nextIndex], {
          transform: `${this.rotation(-angle)} translate3d(0, 0, ${this.translateZ}px)`,
          'z-index': '2'
        });

        applyCss(settings.el, {
          transition: `transform ${settings.speed}ms`,
          transform: `translate3d(0, 0, -${this.translateZ}px) ${this.rotation(angle)}`
        });

        setTimeout(() => {
          settings.slides.forEach((s, index) => {
            if (index !== settings.nextIndex) {
              applyCss(s, { transform: 'initial' });
            }
          });

          applyCss(settings.el, {
            transition: 'initial',
            transform: `translate3d(0, 0, -${this.translateZ}px) ${this.rotation(0)}`
          });

          applyCss(settings.slides[settings.nextIndex], {
            transform: `${this.rotation(0)} translate3d(0, 0, ${this.translateZ}px)`,
            'z-index': '1'
          });

          resolve(settings);
        }, settings.speed);
      });
    });
  }

  private rotation(angle: number): string {
    return `rotate3d(${this.options.direction === 'vertical' ? '1, 0, 0' : '0, 1, 0'}, ${angle}deg)`;
  }
}
