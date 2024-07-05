export interface TileSettings {
  backClass: string
  boxHeight: number
  boxWidth: number
  fromLeft: number
  fromTop: number
  frontClass: string
  width: number
  height: number
  tileClass: string
}

export const TILE_CLASS = 'bs-tile'
export const FRONT_FACE_CLASS = 'bs-tile-front'
export const BACK_FACE_CLASS = 'bs-tile-back'
export const SLIDE_CONTAINER_CLASS = 'bs-tile-slide-container'

export type TileFace = 'front' | 'back'

export interface TileTransition {
  createTile(tileSettings: TileSettings): HTMLElement
  transition(tile: HTMLElement, face?: TileFace): void
}

export function setTileFace(slide: HTMLElement, tileFace: HTMLElement) {
  const clone = slide.cloneNode(true) as HTMLElement
  clone.removeAttribute('style')
  const slideContainer = tileFace.querySelector(`.${SLIDE_CONTAINER_CLASS}`)

  if (slideContainer) {
    slideContainer.replaceChildren(clone)
  }
}
