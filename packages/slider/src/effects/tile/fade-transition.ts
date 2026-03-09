import {
  type TileSettings,
  type TileTransition,
  FRONT_FACE_CLASS,
  BACK_FACE_CLASS,
  TransitionSettings,
} from './tile-transition'
import { animOpts, applyCss, cloneSlideToFace } from '../../utils'

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
        width: `${tileSettings.boxWidth}px`,
      })
    })

    applyCss(back, { opacity: '0' })

    front.classList.add(tileSettings.frontClass)
    tile.append(front)
    back.classList.add(tileSettings.backClass)
    tile.append(back)

    return tile
  }

  async transition({ tile, nextFace, delay, duration }: TransitionSettings) {
    const front = tile.querySelector(`.${FRONT_FACE_CLASS}`) as HTMLElement
    const back = tile.querySelector(`.${BACK_FACE_CLASS}`) as HTMLElement
    const opts = animOpts(duration, undefined, delay)

    await Promise.all([
      front.animate({ opacity: nextFace === 'front' ? 1 : 0 }, opts).finished,
      back.animate({ opacity: nextFace === 'front' ? 0 : 1 }, opts).finished,
    ])
  }

  setTileFace(slide: HTMLElement, tileFace: HTMLElement) {
    cloneSlideToFace(slide, tileFace)
  }
}

export default FadeTransition
