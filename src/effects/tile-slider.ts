import { Effect, TransitionSettings } from './effect';
import { StyleStore } from '../style-store';
import { BoxSliderOptions } from '../box-slider-options';
import { applyCss, locateSlideImageSrc } from '../utils';

export interface TileSliderOptions {
  rows: number;
  rowOffset: number;
}

interface TileGrid {
  cols: number;
  rows: number;
  sideLength: number;
  height: number;
}

const defaults: TileSliderOptions = {
  rows: 8,
  rowOffset: 100
}

const SLIDE_STYLES = [];
const BOX_STYLES = [];

export class TileSlider implements Effect {
  options: TileSliderOptions;
  grid: TileGrid;
  tileWrapper: HTMLElement;
  activeFace: 'front' | 'back';

  constructor(options: TileSliderOptions = defaults) {
    this.options = { ...defaults, ...options };
    this.activeFace = 'front';
  }

  initialize(el: HTMLElement, slides: HTMLElement[], styleStore: StyleStore, options?: BoxSliderOptions): void {
    const imgSrc = locateSlideImageSrc(slides[options.startIndex]);
    const fragment = document.createDocumentFragment();

    this.grid = this.calculateGrid(el, slides);
    this.tileWrapper = document.createElement('div');

    el.appendChild(this.tileWrapper);

    if ('fixed absolute relative'.indexOf(getComputedStyle(el).position) === -1) {
      applyCss(el, { position: 'relative' });
    }

    applyCss(el, {
      height: `${this.grid.height}px`,
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

    let fromLeft = 0;
    let fromTop = 0;

    // set up the static grid with background images
    for (let i = 0; i < this.grid.rows; ++i) {
      fromTop = i * this.grid.sideLength;

      for (let j = 0; j < this.grid.cols; ++j) {
        fromLeft = j * this.grid.sideLength;

        fragment.appendChild(this.createTile({
          fromTop: fromTop,
          fromLeft: j * this.grid.sideLength,
          imgSrc,
          side: this.grid.sideLength,
          boxWidth: el.offsetWidth,
          boxHeight: el.offsetHeight
        }));
      }
    }

    this.tileWrapper.appendChild(fragment);
  }

  transition(settings: TransitionSettings): Promise<TransitionSettings> {
    return new Promise(resolve => {
      const tiles = this.tileWrapper.querySelectorAll('.bs-tile');
      const rowIntv = this.options.rowOffset;
      const tileIntv = ((settings.speed - rowIntv * (this.grid.rows - 1)) / this.grid.cols);
      const imgSrc = locateSlideImageSrc(settings.slides[settings.nextIndex]);
      const nextFace = this.activeFace === 'front' ? 'back' : 'front';
      const angle = nextFace === 'back' ? 180 : 0;

      this.tileWrapper.querySelectorAll(`.${nextFace}`)
        .forEach((tile: HTMLElement) => applyCss(tile, { 'background-image': `url(${imgSrc})` }));

      requestAnimationFrame(() => {
        for (let i = 0 ; i < this.grid.rows; ++i) {
          let j = i * this.grid.cols;
          let timerIndex = 0;

          const rowEnd = j + this.grid.cols;
          const rowTimeout = i * rowIntv;

          setTimeout(() => {
            for (; j < rowEnd; ++j) {
              const tileTimeout = timerIndex * tileIntv;
              const tile = tiles[j] as HTMLElement;

              setTimeout(() => {
                applyCss(tile, { transform: `rotate3d(0, 1, 0, ${angle}deg)`})

                if (tile === tiles[tiles.length - 1]) {
                  this.activeFace = nextFace;
                  resolve(settings);
                }
              }, tileTimeout);

              timerIndex += 1;
            }
          }, rowTimeout);
        }
      });
    });
  }

  private calculateGrid(el: HTMLElement, slides: HTMLElement[]): TileGrid {
    const height = slides[0].offsetHeight;
    const rows = this.options.rows;
    const sideLength = height / rows;
    const cols = Math.ceil(el.offsetWidth / sideLength);

    return { cols, rows, sideLength, height };
  }

  private createTile(tileSettings: any): HTMLElement {
    const tileHolder = document.createElement('div');
    const tile = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    applyCss(tileHolder, {
      height: `${tileSettings.side}px`,
      left: `${tileSettings.fromLeft}px`,
      perspective: '400px',
      position: 'absolute',
      top: `${tileSettings.fromTop}px`,
      width: `${tileSettings.side}px`
    });

    tile.classList.add('bs-tile');
    applyCss(tile, {
      height: `${tileSettings.side}px`,
      'transform-style': 'preserve-3d',
      transition: 'transform 400ms',
      width: `${tileSettings.side}px`
    });

    tileHolder.appendChild(tile);

    applyCss(front, { 'background-image': `url(${tileSettings.imgSrc})` });

    [front, back].forEach(t => applyCss(t, {
      'background-position': `-${tileSettings.fromLeft}px -${tileSettings.fromTop}px`,
      'background-size': `${tileSettings.boxWidth}px ${tileSettings.boxHeight}px`,
      'backface-visibility': 'hidden',
      height: `${tileSettings.side}px`,
      left: '0',
      position: 'absolute',
      top: '0',
      width: `${tileSettings.side}px`
    }));

    front.classList.add('front');
    tile.appendChild(front);
    back.classList.add('back');
    tile.appendChild(back);

    applyCss(back, { transform: 'rotateY(180deg)' });

    return tileHolder;
  }
}
