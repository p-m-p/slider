import { BoxSlider, CarouselSlider, CubeSlider } from '../src';

const activeClassName = 'active';
const disabledClassName = 'disabled';

// Effect Examples slider
const examplesSlider = new BoxSlider(document.querySelector('.examples-carousel'), {
  effect: new CarouselSlider()
});
const exampleNavButtons = document.querySelectorAll('.examples-navigation > button');

exampleNavButtons.forEach((btn, index) =>
  btn.addEventListener('click', () => {
    exampleNavButtons.forEach(btn => btn.classList.remove(activeClassName));
    btn.classList.add(activeClassName);
    examplesSlider.skipTo(index); // Fix slider to determine if backwards itself
  }));

// Code/slider view selection
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

// Effect examples - need to active these only when visible in tab
new BoxSlider(document.getElementById('cube-slider'), {
  effect: new CubeSlider({
    direction: 'horizontal'
  }),
  autoScroll: true,
  timeout: 5000
});
