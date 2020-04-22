export interface BoxSliderOptions {
  speed?: number;
  responsive?: boolean;
  timeout?: number;
  autoScroll?: boolean;
  pauseOnHover?: boolean;
  perspective?: number;
  startIndex?: number;
}

export const defaults: BoxSliderOptions = {
  speed: 800,
  responsive: true,
  timeout: 5000,
  autoScroll: false,
  pauseOnHover: false,
  perspective: 1000,
  startIndex: 0
};
