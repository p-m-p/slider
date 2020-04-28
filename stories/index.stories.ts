import { FadeSlider } from '../src/effects/fade-slider';
import './style.css';
import { CarouselSlider } from '../src/effects/carousel-slider';
import { CubeSlider } from '../src/effects/cube-slider';

export default {
  title: 'Box Slider',
};

function createPage(slider: HTMLElement): HTMLElement {
  const page = document.createElement('div');

  page.innerHTML = `
  <main class="page">
    <section></section>
    
    <aside>
      <button class="prev">Prev</button>
      <button class="next">Next</button>
      <button class="pause">Pause</button>
      <button class="play">Play</button>
    </aside>
  </main>
  `;

  page.querySelector('section').appendChild(slider);

  return page;
}

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

  const page = createPage(box);

  setTimeout(() => {
    const slider = new FadeSlider(box.querySelector('.slider'), {
      timeout: 5000,
      speed: 1000,
      autoScroll: false
    });

    const next = page.querySelector('.next');
    const prev = page.querySelector('.prev');
    const pause = page.querySelector('.pause');
    const play = page.querySelector('.play');

    next.addEventListener('click', () => slider.next());
    prev.addEventListener('click', () => slider.prev());
    pause.addEventListener('click', () => slider.pause());
    play.addEventListener('click', () => slider.play());
  }, 500);

  return page;
};

export const Carousel = (): HTMLElement => {
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

  const page = createPage(box);

  setTimeout(() => {
    const slider = new CarouselSlider(box.querySelector('.slider'), {
      timeout: 5000,
      speed: 1000,
      autoScroll: false
    });

    const next = page.querySelector('.next');
    const prev = page.querySelector('.prev');
    const pause = page.querySelector('.pause');
    const play = page.querySelector('.play');

    next.addEventListener('click', () => slider.next());
    prev.addEventListener('click', () => slider.prev());
    pause.addEventListener('click', () => slider.pause());
    play.addEventListener('click', () => slider.play());
  }, 500);

  return page;
};

export const Cube = (): HTMLElement => {
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
    </div>
  `;

  const page = createPage(box);

  setTimeout(() => {
    const slider = new CubeSlider(box.querySelector('.slider'), {
      timeout: 5000,
      speed: 1000,
      autoScroll: false
    });

    const next = page.querySelector('.next');
    const prev = page.querySelector('.prev');
    const pause = page.querySelector('.pause');
    const play = page.querySelector('.play');

    next.addEventListener('click', () => slider.next());
    prev.addEventListener('click', () => slider.prev());
    pause.addEventListener('click', () => slider.pause());
    play.addEventListener('click', () => slider.play());
  }, 500);

  return page;
};
