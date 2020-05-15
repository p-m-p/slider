import { BoxSlider } from '../src/box-slider';

export function createPage(slider: HTMLElement): HTMLElement {
  const page = document.createElement('main');

  page.innerHTML = `
    <section class="box-slider"></section>
    
    <aside>
      <button class="prev">Prev</button>
      <button class="next">Next</button>
      <button class="pause">Pause</button>
      <button class="play">Play</button>
      <button class="destroy">Destroy</button>
    </aside>
  `;

  page.querySelector('.box-slider').appendChild(slider);

  return page;
}

export function setUpNavigation(page: HTMLElement, slider: BoxSlider): void {
  const next = page.querySelector('.next');
  const prev = page.querySelector('.prev');
  const pause = page.querySelector('.pause');
  const play = page.querySelector('.play');
  const destroy = page.querySelector('.destroy');

  next.addEventListener('click', () => slider.next());
  prev.addEventListener('click', () => slider.prev());
  pause.addEventListener('click', () => slider.pause());
  play.addEventListener('click', () => slider.play());
  destroy.addEventListener('click', () => slider.destroy());
}
