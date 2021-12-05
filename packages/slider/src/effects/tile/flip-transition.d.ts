import { TileSettings, TileTransition } from './tile-transition';
export declare class FlipTransition implements TileTransition {
    createTile(tileSettings: TileSettings): HTMLElement;
    transition(tile: HTMLElement, nextFace: 'front' | 'back'): void;
}
