import { type TileSettings, type TileTransition } from './tile-transition'
import { applyCss } from '../../utils'

export class FlipTransition implements TileTransition {
  createTile(tileSettings: TileSettings): HTMLElement {
    const tileHolder = document.createElement('div')
    const tile = document.createElement('div')
    const front = document.createElement('div')
    const back = document.createElement('div')

    applyCss(tileHolder, {
      height: `${tileSettings.height}px`,
      left: `${tileSettings.fromLeft}px`,
      perspective: '400px',
      position: 'absolute',
      top: `${tileSettings.fromTop}px`,
      width: `${tileSettings.width}px`,
    })

    tile.classList.add(tileSettings.tileClass)
    applyCss(tile, {
      height: `${tileSettings.height}px`,
      'transform-style': 'preserve-3d',
      transition: 'transform 400ms',
      width: `${tileSettings.width}px`,
    })

    tileHolder.appendChild(tile)

    applyCss(front, { 'background-image': `url(${tileSettings.imgSrc})` })
    ;[front, back].forEach((t) =>
      applyCss(t, {
        'background-position': `-${tileSettings.fromLeft}px -${tileSettings.fromTop}px`,
        'background-size': `${tileSettings.boxWidth}px ${tileSettings.boxHeight}px`,
        'backface-visibility': 'hidden',
        height: `${tileSettings.height}px`,
        left: '0',
        position: 'absolute',
        top: '0',
        width: `${tileSettings.width}px`,
      }),
    )

    front.classList.add(tileSettings.frontClass)
    tile.appendChild(front)
    back.classList.add(tileSettings.backClass)
    tile.appendChild(back)

    applyCss(back, { transform: 'rotateY(180deg)' })

    return tileHolder
  }

  transition(tile: HTMLElement, nextFace: 'front' | 'back'): void {
    applyCss(tile, { transform: `rotate3d(0, 1, 0, ${nextFace === 'back' ? 180 : 0}deg)` })
  }
}
