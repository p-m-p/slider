import { BoxSlider, CarouselSlider, CubeSlider, FadeSlider, TileSlider } from '../packages/slider/src';

const activeClassName = 'active';
const disabledClassName = 'disabled';
const viewSliderButton = document.querySelector('#view-slider');
const viewCodeButton = document.querySelector('#view-code');
const examples = document.querySelectorAll('.example');
const codeSelectionNavigation = document.querySelector('.examples-view-selection-code');
const codeExampleSelectionButtons = document.querySelectorAll('.examples-view-selection-code-item');
const exampleNavButtons = document.querySelectorAll('.examples-navigation > button');
const exampleSliderElements = document.querySelectorAll('.slider');

function removeLoader(): void {
  document.querySelector('.examples-loader').classList.add(disabledClassName);
}

function showSlider(): void {
  viewSliderButton.classList.add(activeClassName);
  viewCodeButton.classList.remove(activeClassName);
  codeSelectionNavigation.classList.add(disabledClassName);

  document.querySelector('.example.active .example-slider').classList.remove(disabledClassName);
  document.querySelector('.example.active .example-code').classList.add(disabledClassName);
}

function showCodeSamples(): void {
  viewCodeButton.classList.add(activeClassName);
  viewSliderButton.classList.remove(activeClassName);
  codeSelectionNavigation.classList.remove(disabledClassName);

  document.querySelector('.example.active .example-slider').classList.add(disabledClassName);
  document.querySelector('.example.active .example-code').classList.remove(disabledClassName);
}

// Image loader
const imagesBySrc = Array.from(document.querySelectorAll('.slide img'))
  .reduce((imgBySrc: { [src: string]: HTMLImageElement }, img: HTMLImageElement) => {
    imgBySrc[img.currentSrc] = img;

    return imgBySrc;
  }, {})
const slideImagesToLoad = Object.keys(imagesBySrc)
  .map(src => imagesBySrc[src])
  .filter((img: HTMLImageElement) => !img.complete)

if (slideImagesToLoad.length === 0) {
  removeLoader();
} else {
  let toLoad = slideImagesToLoad.length;

  slideImagesToLoad.forEach(img => img.addEventListener('load', () => {
    toLoad -= 1;

    if (toLoad === 0) {
      removeLoader();
    }
  }));
}

// Effect Examples slider
const examplesSlider = new BoxSlider(document.querySelector('#examples-carousel'), {
  effect: new CarouselSlider(),
  swipe: false
});

const effects = [
  new CubeSlider({
    direction: 'horizontal'
  }),
  new TileSlider({
    tileEffect: 'fade',
    rowOffset: 60,
    rows: 6
  }),
  new CarouselSlider({
    timingFunction: 'cubic-bezier(0.375, 0.065, 0.280, 0.820)'
  }),
  new FadeSlider()
];

let activeSlider = new BoxSlider(exampleSliderElements.item(0), {
  effect: effects[0],
  autoScroll: true,
  timeout: 5000,
  pauseOnHover: true
});

exampleNavButtons.forEach((btn, index) =>
  btn.addEventListener('click', () => {
    showSlider();

    exampleNavButtons.forEach(btn => btn.classList.remove(activeClassName));
    btn.classList.add(activeClassName);

    examplesSlider.skipTo(index);
  }));

examplesSlider.addEventListener('before', () =>
  examples.forEach(example => example.classList.remove(activeClassName)));
examplesSlider.addEventListener('after', data => {
  activeSlider.destroy();
  examples.item(data.activeIndex).classList.add(activeClassName);

  activeSlider = new BoxSlider(exampleSliderElements.item(data.activeIndex), {
    effect: effects[data.activeIndex],
    autoScroll: true,
    timeout: 5000,
    pauseOnHover: true
  });
});

const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

pauseButton.addEventListener('click', () => {
  activeSlider.pause();
  playButton.classList.remove(disabledClassName);
  pauseButton.classList.add(disabledClassName);
});
playButton.addEventListener('click', () => {
  activeSlider.play();
  playButton.classList.add(disabledClassName);
  pauseButton.classList.remove(disabledClassName);
});
nextButton.addEventListener('click', () => activeSlider.next());
prevButton.addEventListener('click', () => activeSlider.prev());

// Slider view selection
viewSliderButton.addEventListener('click', showSlider);
viewCodeButton.addEventListener('click', showCodeSamples);

codeExampleSelectionButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const codeExamples = document.querySelectorAll('.example.active .example-code-item');

    codeExampleSelectionButtons.forEach(b => b.classList.remove(activeClassName));
    btn.classList.add(activeClassName);

    codeExamples.forEach(example => example.classList.add(disabledClassName));
    codeExamples.item(index).classList.remove(disabledClassName);
  });
});
