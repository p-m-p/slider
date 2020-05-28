import { BoxSlider, CarouselSlider, CubeSlider, Effect, FadeSlider, TileSlider } from '../src';

const activeClassName = 'active';
const disabledClassName = 'disabled';

// Effect Examples slider
const examplesSlider = new BoxSlider(document.querySelector('.examples-carousel'), {
  effect: new CarouselSlider()
});
const exampleNavButtons = document.querySelectorAll('.examples-navigation > button');
const exampleSliderElements = document.querySelectorAll('.slider');

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
    exampleNavButtons.forEach(btn => btn.classList.remove(activeClassName));
    btn.classList.add(activeClassName);
    examplesSlider.skipTo(index).then(() => {
      activeSlider.destroy();

      activeSlider = new BoxSlider(exampleSliderElements.item(index), {
        effect: effects[index],
        autoScroll: true,
        timeout: 5000,
        pauseOnHover: true
      });
    });
  }));

// Slider view selection
const viewSliderButton = document.querySelector('#view-slider');
const viewCodeButton = document.querySelector('#view-code');
const codeSelectionNavigation = document.querySelector('.examples-view-selection-code');
const codeExampleSelectionButtons = document.querySelectorAll('.examples-view-selection-code-item');

viewSliderButton.addEventListener('click', () => {
  viewSliderButton.classList.add(activeClassName);
  viewCodeButton.classList.remove(activeClassName);
  codeSelectionNavigation.classList.add(disabledClassName);

  document.querySelector('.example.active .example-slider').classList.remove(disabledClassName);
  document.querySelector('.example.active .example-code').classList.add(disabledClassName);
});
viewCodeButton.addEventListener('click', () => {
  viewCodeButton.classList.add(activeClassName);
  viewSliderButton.classList.remove(activeClassName);
  codeSelectionNavigation.classList.remove(disabledClassName);

  document.querySelector('.example.active .example-slider').classList.add(disabledClassName);
  document.querySelector('.example.active .example-code').classList.remove(disabledClassName);
});

codeExampleSelectionButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const codeExamples = document.querySelectorAll('.example.active .example-code-item');

    codeExampleSelectionButtons.forEach(b => b.classList.remove(activeClassName));
    btn.classList.add(activeClassName);

    codeExamples.forEach(example => example.classList.add(disabledClassName));
    codeExamples.item(index).classList.remove(disabledClassName);
  });
});
