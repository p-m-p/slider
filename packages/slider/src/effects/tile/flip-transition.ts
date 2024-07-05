import {
  type TileFace,
  type TileSettings,
  type TileTransition,
  SLIDE_CONTAINER_CLASS,
} from './tile-transition'
import { applyCss } from '../../utils'

class FlipTransition implements TileTransition {
  createTile(tileSettings: TileSettings): HTMLElement {
    const tileHolder = document.createElement('div')
    const tile = document.createElement('div')
    const front = document.createElement('div')
    const back = document.createElement('div')
    const faces = [front, back]

    applyCss(tileHolder, {
      height: `${tileSettings.height}px`,
      left: `${tileSettings.fromLeft}px`,
      overflow: 'hidden',
      perspective: '400px',
      position: 'absolute',
      top: `${tileSettings.fromTop}px`,
      width: `${tileSettings.width}px`,
    })

    tile.classList.add(tileSettings.tileClass)
    applyCss(tile, {
      position: 'relative',
      height: `${tileSettings.height}px`,
      'transform-style': 'preserve-3d',
      transition: 'transform 400ms',
      width: `${tileSettings.width}px`,
    })

    tileHolder.appendChild(tile)

    faces.forEach((face) => {
      const slideContainer = document.createElement('div')

      slideContainer.classList.add(SLIDE_CONTAINER_CLASS)
      applyCss(slideContainer, {
        width: `${tileSettings.boxWidth}px`,
        height: `${tileSettings.boxHeight}px`,
        left: `-${tileSettings.fromLeft}px`,
        position: 'absolute',
        top: `-${tileSettings.fromTop}px`,
      })
      face.appendChild(slideContainer)

      applyCss(face, {
        position: 'absolute',
        'backface-visibility': 'hidden',
        top: '0',
        left: '0',
        height: `${tileSettings.height}px`,
        width: `${tileSettings.width}px`,
      })
    })

    front.classList.add(tileSettings.frontClass)
    tile.appendChild(front)
    back.classList.add(tileSettings.backClass)
    tile.appendChild(back)

    applyCss(back, { transform: 'rotateY(180deg)' })

    return tileHolder
  }

  transition(tile: HTMLElement, nextFace: TileFace) {
    applyCss(tile, {
      transform: `rotate3d(0, 1, 0, ${nextFace === 'back' ? 180 : 0}deg)`,
    })
  }
}

export default FlipTransition
