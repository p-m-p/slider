import { type Effect, type TransitionSettings } from '../effect'
import { StateStore } from '../../state-store'
import { type BoxSliderOptions } from '../../box-slider-options'
import { applyCss, locateSlideImageSrc } from '../../utils'
import FadeTransition from './fade-transition'
import FlipTransition from './flip-transition'

export interface TileSliderOptions {
  tileEffect: 'flip' | 'fade'
  rows: number
  rowOffset: number
}

interface TileGrid {
  cols: number
  rows: number
  sideLength: number
  height: number
}

const TILE_CLASS = 'bs-tile'
const SLIDE_STYLES = ['display', 'position', 'overflow', 'clip', 'height', 'width', 'margin', 'padding', 'border']
const BOX_STYLES = ['height', 'overflow', 'position']

export class TileSlider implements Effect {
  private _tileWrapper: HTMLElement | undefined
  private tileTransition: FadeTransition | FlipTransition
  private options: TileSliderOptions
  private grid!: TileGrid
  private activeFace: 'front' | 'back'

  get tileWrapper() {
    if (this._tileWrapper === undefined) {
      throw new Error('TileWrapper is undefined')
    }

    return this._tileWrapper
  }

  constructor(options?: Partial<TileSliderOptions>) {
    this.options = {
      tileEffect: options?.tileEffect || 'flip',
      rows: options?.rows || 8,
      rowOffset: options?.rowOffset || 100,
    }
    this.activeFace = 'front'
    this.tileTransition = this.options.tileEffect === 'fade' ? new FadeTransition() : new FlipTransition()
  }

  initialize(el: HTMLElement, slides: HTMLElement[], stateStore: StateStore, options: BoxSliderOptions): void {
    const imgSrc = locateSlideImageSrc(slides[options.startIndex || 0])

    if (imgSrc == null) {
      throw new Error('Unable to locate slide image src for Tile slider')
    }

    const fragment = document.createDocumentFragment()

    stateStore.storeStyles(el, BOX_STYLES)
    stateStore.storeStyles(slides, SLIDE_STYLES)

    this.grid = this.calculateGrid(el, slides)

    if (this.tileWrapper) {
      this.destroy(el)
    }

    const tileWrapper = document.createElement('div')
    tileWrapper.setAttribute('aria-hidden', 'true')
    el.appendChild(tileWrapper)
    this._tileWrapper = tileWrapper

    if ('fixed absolute relative'.indexOf(getComputedStyle(el).position) === -1) {
      applyCss(el, { position: 'relative' })
    }

    applyCss(el, {
      height: `${el.offsetHeight}px`,
      overflow: 'hidden',
    })
    applyCss(this.tileWrapper, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
    })
    slides.forEach((s) =>
      applyCss(s, {
        position: 'absolute',
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        width: '1px',
        margin: '-1px',
        padding: '0',
        border: '0',
      }),
    )

    for (let i = 0; i < this.grid.rows; ++i) {
      const fromTop = i * this.grid.sideLength

      for (let j = 0; j < this.grid.cols; ++j) {
        fragment.appendChild(
          this.tileTransition.createTile({
            backClass: 'back',
            boxWidth: el.offsetWidth,
            boxHeight: el.offsetHeight,
            fromTop: fromTop,
            fromLeft: j * this.grid.sideLength,
            frontClass: 'front',
            imgSrc,
            width: this.grid.sideLength,
            height: this.grid.sideLength,
            tileClass: TILE_CLASS,
          }),
        )
      }
    }

    this.tileWrapper.appendChild(fragment)
  }

  transition(settings: TransitionSettings): Promise<void> {
    return new Promise((resolve) => {
      const tiles = this.tileWrapper.querySelectorAll(`.${TILE_CLASS}`)
      const rowInterval = this.options.rowOffset
      const tileInterval = (settings.speed - rowInterval * (this.grid.rows - 1)) / this.grid.cols
      const imgSrc = locateSlideImageSrc(settings.slides[settings.nextIndex])
      const nextFace = this.activeFace === 'front' ? 'back' : 'front'

      this.tileWrapper
        .querySelectorAll(`.${nextFace}`)
        .forEach((tile: HTMLElement | Element) =>
          applyCss(tile as HTMLElement, { 'background-image': `url(${imgSrc})` }),
        )

      requestAnimationFrame(() => {
        for (let i = 0; i < this.grid.rows; ++i) {
          let j = i * this.grid.cols
          let timerIndex = 0

          const rowEnd = j + this.grid.cols
          const rowTimeout = i * rowInterval

          setTimeout(() => {
            for (; j < rowEnd; ++j) {
              const tileTimeout = timerIndex * tileInterval
              const tile = tiles[j] as HTMLElement

              setTimeout(() => {
                this.tileTransition.transition(tile, nextFace)

                if (tile === tiles[tiles.length - 1]) {
                  this.activeFace = nextFace
                  resolve()
                }
              }, tileTimeout)

              timerIndex += 1
            }
          }, rowTimeout)
        }
      })
    })
  }

  destroy(el: HTMLElement): void {
    el.removeChild(this.tileWrapper)
    delete this._tileWrapper
  }

  private calculateGrid(el: HTMLElement, slides: HTMLElement[]): TileGrid {
    const height = slides[0].offsetHeight
    const rows = this.options.rows
    const sideLength = Math.ceil(height / rows)
    const cols = Math.ceil(el.offsetWidth / sideLength)

    return { cols, rows, sideLength, height }
  }
}

export default TileSlider
