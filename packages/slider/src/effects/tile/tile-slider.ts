import type { BoxSliderOptions, Effect, TransitionSettings } from '../../types'
import { applyCss } from '../../utils'
import FadeTransition from './fade-transition'
import FlipTransition from './flip-transition'
import {
  BACK_FACE_CLASS,
  FRONT_FACE_CLASS,
  TILE_CLASS,
} from './tile-transition'

export type TileEffect = 'flip' | 'fade'
export interface TileSliderOptions {
  rowOffset: number
  rows: number
  tileEffect: TileEffect
}

export const defaultOptions: TileSliderOptions = {
  rowOffset: 50,
  rows: 8,
  tileEffect: 'flip',
}

interface TileGrid {
  cols: number
  height: number
  rows: number
  tileHeight: number
  tileWidth: number
  width: number
}

export default class TileSlider implements Effect {
  readonly options: TileSliderOptions

  private _tileWrapper: HTMLElement | undefined
  private tileTransition: FadeTransition | FlipTransition
  private grid!: TileGrid
  private activeFace: 'front' | 'back'

  get tileWrapper() {
    if (this._tileWrapper === undefined) {
      throw new Error('TileWrapper is undefined')
    }

    return this._tileWrapper
  }

  constructor(options?: Partial<TileSliderOptions>) {
    this.options = { ...defaultOptions, ...options }
    this.activeFace = 'front'
    this.tileTransition =
      this.options.tileEffect === 'fade'
        ? new FadeTransition()
        : new FlipTransition()
  }

  initialize(
    el: HTMLElement,
    slides: HTMLElement[],
    options: BoxSliderOptions,
  ) {
    const slide = slides[options.startIndex || 0]
    const fragment = document.createDocumentFragment()

    this.grid = this.calculateGrid(el)

    if (this._tileWrapper) {
      this.destroy(el)
    }

    const tileWrapper = document.createElement('div')
    tileWrapper.setAttribute('aria-hidden', 'true')
    tileWrapper.dataset.bsElement = 'true'
    el.append(tileWrapper)
    this._tileWrapper = tileWrapper

    if (!'fixed absolute relative'.includes(getComputedStyle(el).position)) {
      applyCss(el, { position: 'relative' })
    }

    applyCss(this.tileWrapper, {
      position: 'absolute',
      inset: '0',
      display: 'none',
    })

    const totalTiles = this.grid.rows * this.grid.cols

    for (let i = 0; i < this.grid.rows; ++i) {
      const fromTop = i * this.grid.tileHeight

      for (let j = 0; j < this.grid.cols; ++j) {
        const tile = this.tileTransition.createTile({
          backClass: `${TILE_CLASS}-back`,
          boxWidth: this.grid.width,
          boxHeight: this.grid.height,
          fromTop: fromTop,
          fromLeft: j * this.grid.tileWidth,
          frontClass: `${TILE_CLASS}-front`,
          height: this.grid.tileHeight,
          speed:
            (options.speed - this.options.rowOffset * (this.grid.rows - 1)) /
            this.grid.cols,
          tileClass: TILE_CLASS,
          width: this.grid.tileWidth,
          zIndex: totalTiles - (i + j),
        })
        fragment.append(tile)
        this.tileTransition.setTileFace(
          slide,
          tile.querySelector(`.${FRONT_FACE_CLASS}`) as HTMLElement,
        )
      }
    }

    slides.forEach((s, index) =>
      applyCss(s, {
        position: 'absolute',
        visibility: index === options.startIndex ? 'visible' : 'hidden',
      }),
    )

    this.tileWrapper.append(fragment)
  }

  async transition(settings: TransitionSettings): Promise<void> {
    const tiles = this.tileWrapper.querySelectorAll(`.${TILE_CLASS}`)
    const tileDuration =
      (settings.speed - this.options.rowOffset * (this.grid.rows - 1)) /
      this.grid.cols
    const nextFace = this.activeFace === 'front' ? 'back' : 'front'

    this.tileWrapper.style.setProperty('display', 'block')
    settings.slides[settings.currentIndex].style.setProperty(
      'visibility',
      'hidden',
    )
    this.tileWrapper
      .querySelectorAll(
        `.${nextFace === 'front' ? FRONT_FACE_CLASS : BACK_FACE_CLASS}`,
      )
      .forEach((tile) =>
        this.tileTransition.setTileFace(
          settings.slides[settings.nextIndex],
          tile as HTMLElement,
        ),
      )

    for (let i = 0; i < this.grid.rows; i++) {
      for (let j = 0; j < this.grid.cols; j++) {
        const index = i * this.grid.cols + j
        const tile = tiles[index] as HTMLElement
        const transition = this.tileTransition.transition({
          delay: i * this.options.rowOffset + j * tileDuration,
          duration: tileDuration,
          nextFace,
          tile,
        })

        if (index === tiles.length - 1) {
          await transition
          this.activeFace = nextFace
          this.tileWrapper.style.setProperty('display', 'none')
          settings.slides[settings.nextIndex].style.setProperty(
            'visibility',
            'visible',
          )
        }
      }
    }
  }

  destroy() {
    this.tileWrapper.remove()
    delete this._tileWrapper
  }

  private calculateGrid(el: HTMLElement): TileGrid {
    const { width: elWidth, height: elHeight } = getComputedStyle(el)
    const height = parseInt(elHeight, 10) ?? el.offsetHeight
    const width = parseInt(elWidth, 10) ?? el.offsetWidth
    const rows = this.options.rows
    const tileHeight = Math.ceil(height / rows)
    const cols = Math.floor(el.offsetWidth / tileHeight)
    const tileWidth = Math.ceil(width / cols)

    return { cols, height, rows, tileHeight, tileWidth, width }
  }
}
