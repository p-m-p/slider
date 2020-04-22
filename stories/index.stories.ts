import { FadeSlider } from '../src/effects/fade-slider';
import './style.css';

export default {
  title: 'Box Slider',
};

export const Fade = (): HTMLElement => {
  const box = document.createElement('div');
  box.classList.add('viewport');

  box.innerHTML = `
    <div class="slider">
      <figure class="slide">
        <span>ONE</span>
      </figure>
      <figure class="slide">
        <span>TWO</span>
      </figure>
      <figure class="slide">
        <span>THREE</span>
      </figure>
      <figure class="slide">
        <span>FOUR</span>
      </figure>
      <figure class="slide">
        <span>FIVE</span>
      </figure>
    </div>
  `;

  setTimeout(() => {
    new FadeSlider(box.querySelector('.slider'), {
      timeout: 5000,
      speed: 1000,
      autoScroll: true
    });
  }, 500);

  return box;
};
