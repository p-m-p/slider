export interface TileSettings {
  backClass: string;
  boxHeight: number;
  boxWidth: number;
  fromLeft: number;
  fromTop: number;
  frontClass: string;
  imgSrc: string;
  width: number;
  height: number;
  tileClass: string;
}

export interface TileTransition {
  createTile(tileSettings: TileSettings): HTMLElement;

  transition(tile: HTMLElement, face?: string): void;
}
