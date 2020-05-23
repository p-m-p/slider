import { BoxSlider, CarouselSlider } from '../src';

const examplesSlider = new BoxSlider(document.querySelector('.examples-slider'), {
  effect: new CarouselSlider()
});

const exampleNavButtons = document.querySelectorAll('.examples-navigation > button');
const activeButtonClassName = 'active';

exampleNavButtons.forEach((btn, index) =>
  btn.addEventListener('click', () => {
    exampleNavButtons.forEach(btn => btn.classList.remove(activeButtonClassName));
    btn.classList.add(activeButtonClassName);
    examplesSlider.skipTo(index);
  }));

