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
  tileEffect?: TileEffect
  rows?: number
  rowOffset?: number
}

export const defaultOptions = {
  tileEffect: 'flip',
  rows: 8,
  rowOffset: 50,
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
  private readonly rowCount: number
  private readonly rowOffset: number
  private readonly tileEffect: TileEffect
  private _tileWrapper: HTMLElement | undefined
  private tileTransition: FadeTransition | FlipTransition
  private grid!: TileGrid
  private activeFace: 'front' | 'back'
  private rowTimers: number[] = []
  private tileTimers: number[] = []

  get tileWrapper() {
    if (this._tileWrapper === undefined) {
      throw new Error('TileWrapper is undefined')
    }

    return this._tileWrapper
  }

  constructor(options?: Partial<TileSliderOptions>) {
    this.tileEffect =
      options?.tileEffect || (defaultOptions.tileEffect as TileEffect)
    this.rowCount = options?.rows || defaultOptions.rows
    this.rowOffset = options?.rowOffset || defaultOptions.rowOffset
    this.activeFace = 'front'
    this.tileTransition =
      this.tileEffect === 'fade' ? new FadeTransition() : new FlipTransition()
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
    el.appendChild(tileWrapper)
    this._tileWrapper = tileWrapper

    if (
      'fixed absolute relative'.indexOf(getComputedStyle(el).position) === -1
    ) {
      applyCss(el, { position: 'relative' })
    }

    applyCss(this.tileWrapper, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
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
            (options.speed - this.rowOffset * (this.grid.rows - 1)) /
            this.grid.cols,
          tileClass: TILE_CLASS,
          width: this.grid.tileWidth,
          zIndex: totalTiles - (i + j),
        })
        fragment.appendChild(tile)
        this.tileTransition.setTileFace(
          slide,
          tile.querySelector(`.${FRONT_FACE_CLASS}`) as HTMLElement,
        )
      }
    }

    slides.forEach((s) =>
      applyCss(s, {
        position: 'absolute',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        width: '1px',
        margin: '-1px',
        padding: '0',
        border: '0',
      }),
    )

    this.tileWrapper.appendChild(fragment)
  }

  transition(settings: TransitionSettings): Promise<void> {
    return new Promise((resolve) => {
      const tiles = this.tileWrapper.querySelectorAll(`.${TILE_CLASS}`)
      const rowInterval = this.rowOffset
      const tileInterval =
        (settings.speed - rowInterval * (this.grid.rows - 1)) / this.grid.cols
      const nextFace = this.activeFace === 'front' ? 'back' : 'front'

      this.rowTimers.length = 0
      this.tileTimers.length = 0

      this.tileWrapper
        .querySelectorAll(
          `.${nextFace === 'front' ? FRONT_FACE_CLASS : BACK_FACE_CLASS}`,
        )
        .forEach((tile: HTMLElement | Element) =>
          this.tileTransition.setTileFace(
            settings.slides[settings.nextIndex],
            tile as HTMLElement,
          ),
        )

      for (let i = 0; i < this.grid.rows; ++i) {
        let j = i * this.grid.cols
        let timerIndex = 0

        const rowEnd = j + this.grid.cols
        const rowTimeout = i * rowInterval

        this.rowTimers.push(
          window.setTimeout(() => {
            for (; j < rowEnd; ++j) {
              const tileTimeout = timerIndex * tileInterval
              const tile = tiles[j] as HTMLElement

              this.tileTimers.push(
                window.setTimeout(() => {
                  this.tileTransition.transition(tile, nextFace)

                  if (tile === tiles[tiles.length - 1]) {
                    this.activeFace = nextFace
                    resolve()
                  }
                }, tileTimeout),
              )

              timerIndex += 1
            }
          }, rowTimeout),
        )
      }
    })
  }

  destroy(el: HTMLElement) {
    el.removeChild(this.tileWrapper)
    delete this._tileWrapper
    this.rowTimers.forEach(window.clearTimeout)
    this.tileTimers.forEach(window.clearTimeout)
  }

  private calculateGrid(el: HTMLElement): TileGrid {
    const { width: elWidth, height: elHeight } = getComputedStyle(el)
    const height = parseInt(elHeight, 10) ?? el.offsetHeight
    const width = parseInt(elWidth, 10) ?? el.offsetWidth
    const rows = this.rowCount
    const tileHeight = Math.ceil(height / rows)
    const cols = Math.floor(el.offsetWidth / tileHeight)
    const tileWidth = Math.ceil(width / cols)

    return { cols, height, rows, tileHeight, tileWidth, width }
  }
}
