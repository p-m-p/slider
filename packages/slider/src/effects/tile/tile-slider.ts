import { Effect, TransitionSettings } from '../effect';
import { StyleStore } from '../../style-store';
import { BoxSliderOptions } from '../../box-slider-options';
import { applyCss, locateSlideImageSrc } from '../../utils';
import { FadeTransition } from './fade-transition';
import { FlipTransition } from './flip-transition';

export interface TileSliderOptions {
  tileEffect?: 'flip' | 'fade';
  rows?: number;
  rowOffset?: number;
}

interface TileGrid {
  cols: number;
  rows: number;
  sideLength: number;
  height: number;
}

const defaults: TileSliderOptions = {
  tileEffect: 'flip',
  rows: 8,
  rowOffset: 100
}

const TILE_CLASS = 'bs-tile';
const SLIDE_STYLES = ['display'];
const BOX_STYLES = ['height', 'overflow', 'position'];

export class TileSlider implements Effect {
  private tileTransition: FadeTransition | FlipTransition;
  private options: TileSliderOptions;
  private grid: TileGrid;
  private tileWrapper: HTMLElement;
  private activeFace: 'front' | 'back';

  constructor(options: TileSliderOptions = defaults) {
    this.options = { ...defaults, ...options };
    this.activeFace = 'front';
    this.tileTransition = this.options.tileEffect === 'fade'
      ? new FadeTransition()
      : new FlipTransition();
  }

  initialize(el: HTMLElement, slides: HTMLElement[], styleStore: StyleStore, options?: BoxSliderOptions): void {
    const imgSrc = locateSlideImageSrc(slides[options.startIndex]);
    const fragment = document.createDocumentFragment();

    styleStore.store(el, BOX_STYLES);
    styleStore.store(slides, SLIDE_STYLES);

    this.grid = this.calculateGrid(el, slides);

    if (this.tileWrapper) {
      el.removeChild(this.tileWrapper);
    }

    this.tileWrapper = document.createElement('div');
    el.appendChild(this.tileWrapper);

    if ('fixed absolute relative'.indexOf(getComputedStyle(el).position) === -1) {
      applyCss(el, { position: 'relative' });
    }

    applyCss(el, {
      height: `${el.offsetHeight}px`,
      overflow: 'hidden'
    });
    applyCss(this.tileWrapper, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%'
    });
    slides.forEach(s => applyCss(s, { display: 'none' }));

    for (let i = 0; i < this.grid.rows; ++i) {
      const fromTop = i * this.grid.sideLength;

      for (let j = 0; j < this.grid.cols; ++j) {
        fragment.appendChild(this.tileTransition.createTile({
          backClass: 'back',
          boxWidth: el.offsetWidth,
          boxHeight: el.offsetHeight,
          fromTop: fromTop,
          fromLeft: j * this.grid.sideLength,
          frontClass: 'front',
          imgSrc,
          width: this.grid.sideLength,
          height: this.grid.sideLength,
          tileClass: TILE_CLASS
        }));
      }
    }

    this.tileWrapper.appendChild(fragment);
  }

  transition(settings: TransitionSettings): Promise<void> {
    return new Promise(resolve => {
      const tiles = this.tileWrapper.querySelectorAll(`.${TILE_CLASS}`);
      const rowInterval = this.options.rowOffset;
      const tileInterval = ((settings.speed - rowInterval * (this.grid.rows - 1)) / this.grid.cols);
      const imgSrc = locateSlideImageSrc(settings.slides[settings.nextIndex]);
      const nextFace = this.activeFace === 'front' ? 'back' : 'front';

      this.tileWrapper.querySelectorAll(`.${nextFace}`)
        .forEach((tile: HTMLElement) => applyCss(tile, { 'background-image': `url(${imgSrc})` }));

      requestAnimationFrame(() => {
        for (let i = 0 ; i < this.grid.rows; ++i) {
          let j = i * this.grid.cols;
          let timerIndex = 0;

          const rowEnd = j + this.grid.cols;
          const rowTimeout = i * rowInterval;

          setTimeout(() => {
            for (; j < rowEnd; ++j) {
              const tileTimeout = timerIndex * tileInterval;
              const tile = tiles[j] as HTMLElement;

              setTimeout(() => {
                this.tileTransition.transition(tile, nextFace);

                if (tile === tiles[tiles.length - 1]) {
                  this.activeFace = nextFace;
                  resolve();
                }
              }, tileTimeout);

              timerIndex += 1;
            }
          }, rowTimeout);
        }
      });
    });
  }

  destroy(el: HTMLElement): void {
    el.removeChild(this.tileWrapper);
    delete this.tileWrapper;
  }

  private calculateGrid(el: HTMLElement, slides: HTMLElement[]): TileGrid {
    const height = slides[0].offsetHeight;
    const rows = this.options.rows;
    const sideLength = Math.ceil(height / rows);
    const cols = Math.ceil(el.offsetWidth / sideLength);

    return { cols, rows, sideLength, height };
  }
}
