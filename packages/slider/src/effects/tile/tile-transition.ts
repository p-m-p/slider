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
  zIndex: number
}

export const TILE_CLASS = 'bs-tile'
export const FRONT_FACE_CLASS = 'bs-tile-front'
export const BACK_FACE_CLASS = 'bs-tile-back'

export type TileFace = 'front' | 'back'

export interface TransitionSettings {
  tile: HTMLElement
  nextFace: TileFace
  delay: number
  duration: number
}

export interface TileTransition {
  createTile(tileSettings: TileSettings): HTMLElement
  transition(settings: TransitionSettings): Promise<void>
  setTileFace(slide: HTMLElement, tileFace: HTMLElement): void
}
