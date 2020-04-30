import { FadeSlider } from '../src/effects/fade-slider';
import { CarouselSlider } from '../src/effects/carousel-slider';
import { CubeSlider } from '../src/effects/cube-slider';
import { BoxSlider } from '../src/box-slider';

import './style.css';

export default {
  title: 'Box Slider',
};

function createPage(slider: HTMLElement): HTMLElement {
  const page = document.createElement('main');

  page.innerHTML = `
    <section class="box-slider"></section>
    
    <aside>
      <button class="prev">Prev</button>
      <button class="next">Next</button>
      <button class="pause">Pause</button>
      <button class="play">Play</button>
    </aside>
  `;

  page.querySelector('.box-slider').appendChild(slider);

  return page;
}

function setUpNavigation(page: HTMLElement, slider: BoxSlider): void {
  const next = page.querySelector('.next');
  const prev = page.querySelector('.prev');
  const pause = page.querySelector('.pause');
  const play = page.querySelector('.play');

  next.addEventListener('click', () => slider.next());
  prev.addEventListener('click', () => slider.prev());
  pause.addEventListener('click', () => slider.pause());
  play.addEventListener('click', () => slider.play());
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
    const slider = new BoxSlider(box.querySelector('.slider'), {
      effect: new FadeSlider(),
      timeout: 5000,
      speed: 1000,
      autoScroll: false
    });

    setUpNavigation(page, slider);
  }, 500);

  return page;
};

export const Carousel = (): HTMLElement => {
  const box = document.createElement('div');
  box.classList.add('viewport');

  box.innerHTML = `
    <div class="carousel">
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
      
      <div class="text-captions">
        <div class="text active">This is slide one</div>
        <div class="text">This is slide two</div>
        <div class="text">This is slide three</div>
        <div class="text">This is slide four</div>
        <div class="text">This is slide five</div>
      </div>
    </div>
  `;

  const page = createPage(box);

  setTimeout(() => {
    const slider = new BoxSlider(box.querySelector('.slider'), {
      effect: new CarouselSlider(),
      timeout: 5000,
      speed: 1000,
      autoScroll: false
    });

    setUpNavigation(page, slider);

    const textCaptionsSlider = new BoxSlider(page.querySelector('.text-captions'), {
      effect: new FadeSlider(),
      speed: 1000,
    });

    slider.addEventListener('before', settings => textCaptionsSlider.skipTo(settings.nextIndex));
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
      <figure class="slide">
        <span>FIVE</span>
      </figure>
    </div>
  `;

  const page = createPage(box);

  setTimeout(() => {
    const slider = new BoxSlider(box.querySelector('.slider'), {
      effect: new CubeSlider({ direction: 'horizontal' }),
      timeout: 5000,
      speed: 1000,
      autoScroll: false
    });

    setUpNavigation(page, slider);
  }, 500);

  return page;
};
