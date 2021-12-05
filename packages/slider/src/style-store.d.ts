export declare class StyleStore {
    private elementStyles;
    constructor();
    store(elements: HTMLElement[] | HTMLElement, properties: string[]): void;
    revert(): void;
}
