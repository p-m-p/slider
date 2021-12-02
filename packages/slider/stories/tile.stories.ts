import { createPage, setUpNavigation } from './story-helpers';
import { BoxSlider } from '../src/box-slider';
import { TileSlider } from '../src/effects/tile/tile-slider';

export const TileFlip = (): HTMLElement => {
  const box = document.createElement('div');
  box.classList.add('viewport');

  box.innerHTML = `
    <div class="slider">
      <figure class="slide">
      <picture>
        <source srcset="one-680.jpg" media="(min-width: 800px)">
        <img src="one.jpg">
      </picture>
      </figure>
      <figure class="slide">
        <img src="two.jpg">
      </figure>
      <figure class="slide">
        <img src="three.jpg">
      </figure>
      <figure class="slide">
        <img src="four.jpg">
      </figure>
    </div>
  `;

  const page = createPage(box);

  setTimeout(() => {
    const slider = new BoxSlider(box.querySelector('.slider') as HTMLElement, {
      effect: new TileSlider(),
      timeout: 5000,
      speed: 1000,
      autoScroll: false
    });

    setUpNavigation(page, slider);
  }, 500);

  return page;
};

export const TileFade = (): HTMLElement => {
  const box = document.createElement('div');
  box.classList.add('viewport');

  box.innerHTML = `
    <div class="slider">
      <figure class="slide">
      <picture>
        <source srcset="one-680.jpg" media="(min-width: 800px)">
        <img src="one.jpg">
      </picture>
      </figure>
      <figure class="slide">
        <img src="two.jpg">
      </figure>
      <figure class="slide">
        <img src="three.jpg">
      </figure>
      <figure class="slide">
        <img src="four.jpg">
      </figure>
    </div>
  `;

  const page = createPage(box);

  setTimeout(() => {
    const slider = new BoxSlider(box.querySelector('.slider') as HTMLElement, {
      effect: new TileSlider({ tileEffect: 'fade' }),
      speed: 1000,
      autoScroll: false
    });

    setUpNavigation(page, slider);
  }, 500);

  return page;
};
