export interface TileSettings {
  backClass: string
  boxHeight: number
  boxWidth: number
  fromLeft: number
  fromTop: number
  frontClass: string
  height: number
  speed: number
  tileClass: string
  width: number
}

export const TILE_CLASS = 'bs-tile'
export const FRONT_FACE_CLASS = 'bs-tile-front'
export const BACK_FACE_CLASS = 'bs-tile-back'

export type TileFace = 'front' | 'back'

export interface TileTransition {
  createTile(tileSettings: TileSettings): HTMLElement
  transition(tile: HTMLElement, face?: TileFace): void
}

export function setTileFace(slide: HTMLElement, tileFace: HTMLElement) {
  const clone = slide.cloneNode(true) as HTMLElement
  clone.removeAttribute('style')
  tileFace.replaceChildren(clone)
}
