import { TileSettings, TileTransition } from './tile-transition';
export declare class FadeTransition implements TileTransition {
    createTile(tileSettings: TileSettings): HTMLElement;
    transition(tile: HTMLElement, nextFace: string): void;
}
