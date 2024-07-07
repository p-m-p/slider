import {
  type TileFace,
  type TileSettings,
  type TileTransition,
  FRONT_FACE_CLASS,
  BACK_FACE_CLASS,
} from './tile-transition'
import { applyCss } from '../../utils'

class FadeTransition implements TileTransition {
  createTile(tileSettings: TileSettings): HTMLElement {
    const tile = document.createElement('div')
    const front = document.createElement('div')
    const back = document.createElement('div')
    const faces = [front, back]

    tile.classList.add(tileSettings.tileClass)

    applyCss(tile, {
      height: `${tileSettings.height}px`,
      left: `${tileSettings.fromLeft}px`,
      overflow: 'hidden',
      position: 'absolute',
      top: `${tileSettings.fromTop}px`,
      width: `${tileSettings.width}px`,
    })

    faces.forEach((face) => {
      applyCss(face, {
        height: `${tileSettings.boxHeight}px`,
        left: `-${tileSettings.fromLeft}px`,
        position: 'absolute',
        top: `-${tileSettings.fromTop}px`,
        transition: 'opacity 400ms',
        width: `${tileSettings.boxWidth}px`,
      })
    })

    applyCss(back, { opacity: '0' })

    front.classList.add(tileSettings.frontClass)
    tile.appendChild(front)
    back.classList.add(tileSettings.backClass)
    tile.appendChild(back)

    return tile
  }

  transition(tile: HTMLElement, nextFace: TileFace): void {
    const front = tile.querySelector(`.${FRONT_FACE_CLASS}`) as HTMLElement
    const back = tile.querySelector(`.${BACK_FACE_CLASS}`) as HTMLElement

    applyCss(front, { opacity: nextFace === 'front' ? '1' : '0' })
    applyCss(back, { opacity: nextFace === 'front' ? '0' : '1' })
  }
}

export default FadeTransition
