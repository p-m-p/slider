import type { TileSettings, TileTransition } from './tile-transition'
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
      position: 'absolute',
      top: `${tileSettings.fromTop}px`,
      width: `${tileSettings.width}px`,
    })

    faces.forEach((face) =>
      applyCss(face, {
        'background-position': `-${tileSettings.fromLeft}px -${tileSettings.fromTop}px`,
        'background-size': `${tileSettings.boxWidth}px ${tileSettings.boxHeight}px`,
        height: `${tileSettings.height}px`,
        left: '0',
        position: 'absolute',
        top: '0',
        transition: 'opacity 400ms',
        width: `${tileSettings.width}px`,
      }),
    )

    applyCss(front, { 'background-image': `url(${tileSettings.imgSrc})` })
    applyCss(back, { opacity: '0' })

    front.classList.add(tileSettings.frontClass)
    tile.appendChild(front)
    back.classList.add(tileSettings.backClass)
    tile.appendChild(back)

    return tile
  }

  transition(tile: HTMLElement, nextFace: string): void {
    // XXX Move classes from settings to constants
    const front = tile.querySelector('.front') as HTMLElement
    const back = tile.querySelector('.back') as HTMLElement

    applyCss(front, { opacity: nextFace === 'front' ? '1' : '0' })
    applyCss(back, { opacity: nextFace === 'front' ? '0' : '1' })
  }
}

export default FadeTransition
