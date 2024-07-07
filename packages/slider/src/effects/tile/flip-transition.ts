import {
  type TileFace,
  type TileSettings,
  type TileTransition,
} from './tile-transition'
import { applyCss } from '../../utils'

class FlipTransition implements TileTransition {
  createTile(tileSettings: TileSettings): HTMLElement {
    const tileHolder = document.createElement('div')
    const tile = document.createElement('div')
    const front = document.createElement('div')
    const back = document.createElement('div')

    applyCss(tileHolder, {
      height: `${tileSettings.height}px`,
      left: `${tileSettings.fromLeft}px`,
      overflow: 'clip',
      perspective: '400px',
      position: 'absolute',
      top: `${tileSettings.fromTop}px`,
      width: `${tileSettings.width}px`,
    })

    tile.classList.add(tileSettings.tileClass)
    applyCss(tile, {
      height: '100%',
      position: 'relative',
      'transform-style': 'preserve-3d',
      transition: `transform ${tileSettings.speed}ms`,
      width: '100%',
    })

    tileHolder.appendChild(tile)

    applyCss(front, {
      'backface-visibility': 'hidden',
      height: `${tileSettings.boxHeight}px`,
      left: `-${tileSettings.fromLeft}px`,
      position: 'absolute',
      top: `-${tileSettings.fromTop}px`,
      width: `${tileSettings.boxWidth}px`,
    })

    applyCss(back, {
      'backface-visibility': 'hidden',
      height: `${tileSettings.boxHeight}px`,
      left: `-${tileSettings.boxWidth - tileSettings.fromLeft - tileSettings.width}px`,
      position: 'absolute',
      top: `-${tileSettings.fromTop}px`,
      transform: 'rotateY(180deg)',
      width: `${tileSettings.boxWidth}px`,
    })

    front.classList.add(tileSettings.frontClass)
    tile.appendChild(front)
    back.classList.add(tileSettings.backClass)
    tile.appendChild(back)

    return tileHolder
  }

  transition(tile: HTMLElement, nextFace: TileFace) {
    applyCss(tile, {
      transform: `rotateY(${nextFace === 'back' ? 180 : 0}deg)`,
    })
  }
}

export default FlipTransition
