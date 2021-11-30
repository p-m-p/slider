import { Effect, TransitionSettings } from './effect';
import { applyCss } from '../utils';
import { BoxSliderOptions } from '../box-slider-options';
import { StyleStore } from '../style-store';

export interface CubeSliderOptions {
  direction?: 'horizontal' | 'vertical';
  perspective?: number;
}

export const defaults: CubeSliderOptions = {
  perspective: 1000,
  direction: 'horizontal'
};

const SLIDE_STYLES = ['left', 'position', 'top', 'transform', 'z-index'];
const BOX_STYLES = ['height', 'left', 'overflow', 'position', 'top', 'transform', 'transform-style', 'transition', 'width', 'z-index' ];
const VIEWPORT_STYLES = ['overflow', 'perspective', 'position'];

export class CubeSlider implements Effect {

  private readonly options: CubeSliderOptions;
  private translateZ: number;

  constructor(options: CubeSliderOptions = {}) {
    this.options = { ...defaults, ...options };
  }

  initialize(el: HTMLElement, slides: HTMLElement[], styleStore: StyleStore, options: BoxSliderOptions): void {
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const perspective = `${this.options.perspective}px`;
    const viewport = el.parentElement;

    this.translateZ = this.options.direction === 'vertical' ? height / 2 : width / 2;

    styleStore.store(slides, SLIDE_STYLES);
    styleStore.store(el, BOX_STYLES);
    styleStore.store(viewport, VIEWPORT_STYLES);

    slides.forEach((slide: HTMLElement) => applyCss(slide, {
      left: '0',
      position: 'absolute',
      top: '0'
    }));

    applyCss(el, {
      height: `${height}px`,
      left: '0',
      overflow: 'visible',
      position: 'absolute',
      top: '0',
      width: `${width}px`
    });

    // ensure parent is positioned to hold the box
    if (['absolute', 'fixed', 'relative'].indexOf(getComputedStyle(viewport).position) === -1) {
      applyCss(viewport, { position: 'relative' });
    }

    applyCss(viewport, {
      overflow: 'visible',
      perspective: perspective
    });

    applyCss(slides[options.startIndex], {
      transform: `${this.rotation(0)} translate3d(0, 0, ${this.translateZ}px)`
    });

    applyCss(el, {
      'transform-style': 'preserve-3d',
      transform: `translate3d(0, 0, -${this.translateZ}px)`
    });

    setTimeout(() => applyCss(el, {
      transition: `transform ${options.speed}ms`
    }), 50);
  }

  transition(settings: TransitionSettings): Promise<void> {
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

          resolve();
        }, settings.speed);
      });
    });
  }

  private rotation(angle: number): string {
    return `rotate3d(${this.options.direction === 'vertical' ? '1, 0, 0' : '0, 1, 0'}, ${angle}deg)`;
  }
}
