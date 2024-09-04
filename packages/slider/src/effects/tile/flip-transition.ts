import {
  TransitionSettings,
  type TileSettings,
  type TileTransition,
} from './tile-transition'
import { applyCss } from '../../utils'

class FlipTransition implements TileTransition {
  createTile(tileSettings: TileSettings): HTMLElement {
    const tileHolder = document.createElement('div')
    const tile = document.createElement('div')
    const front = document.createElement('div')
    const frontFace = document.createElement('div')
    const back = document.createElement('div')
    const backFace = document.createElement('div')
    const faces = [frontFace, backFace]

    applyCss(tileHolder, {
      height: `${tileSettings.height}px`,
      left: `${tileSettings.fromLeft}px`,
      perspective: '300px',
      position: 'absolute',
      top: `${tileSettings.fromTop}px`,
      width: `${tileSettings.width}px`,
      'z-index': `${tileSettings.zIndex}`,
    })

    tile.classList.add(tileSettings.tileClass)
    applyCss(tile, {
      height: '100%',
      position: 'relative',
      'transform-style': 'preserve-3d',
      width: '100%',
    })
    tileHolder.appendChild(tile)

    faces.forEach((face) =>
      applyCss(face, {
        height: `${tileSettings.boxHeight}px`,
        left: `-${tileSettings.fromLeft}px`,
        position: 'absolute',
        top: `-${tileSettings.fromTop}px`,
        width: `${tileSettings.boxWidth}px`,
      }),
    )

    applyCss(front, {
      'backface-visibility': 'hidden',
      inset: '0',
      overflow: 'hidden',
      position: 'absolute',
      'z-index': '1',
    })
    applyCss(back, {
      'backface-visibility': 'hidden',
      inset: '0',
      overflow: 'hidden',
      position: 'absolute',
      transform: 'rotateY(180deg)',
      'z-index': '2',
    })

    front.appendChild(frontFace)
    front.classList.add(tileSettings.frontClass)
    tile.appendChild(front)
    back.appendChild(backFace)
    back.classList.add(tileSettings.backClass)
    tile.appendChild(back)

    return tileHolder
  }

  async transition({ tile, nextFace, delay, duration }: TransitionSettings) {
    await tile.animate(
      {
        transform: [
          `rotateY(${nextFace === 'back' ? 0 : 180}deg)`,
          `rotateY(${nextFace === 'back' ? 180 : 0}deg)`,
        ],
      },
      {
        delay,
        duration,
        fill: 'forwards',
      },
    ).finished
  }

  setTileFace(slide: HTMLElement, tileFace: HTMLElement) {
    const clone = slide.cloneNode(true) as HTMLElement
    clone.removeAttribute('style')
    tileFace.firstElementChild!.replaceChildren(clone)
  }
}

export default FlipTransition
