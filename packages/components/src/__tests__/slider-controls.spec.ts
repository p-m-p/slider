import {
  findByRole,
  getByRole,
  getByTestId,
  getByText,
  waitFor,
} from '@testing-library/dom'
import user from '@testing-library/user-event'
import type { SliderControlsElement, SliderElement } from '..'

import '..'

afterEach(() => {
  const controls = document.querySelector('bs-slider-controls')

  if (controls) {
    document.body.removeChild(controls)
  }
})

function assertActiveSlideIndex(slides: HTMLElement[], index: number) {
  slides.forEach((slide, i) => {
    if (i === index) {
      expect(slide).toBeVisible()
    } else {
      expect(slide).not.toBeVisible()
    }
  })
}

async function runAssertions({
  controls,
  indexButtons,
  nextButton,
  prevButton,
  playButton,
  slider,
  slides,
}: {
  controls: SliderControlsElement
  indexButtons: HTMLButtonElement[]
  nextButton: HTMLButtonElement
  prevButton: HTMLButtonElement
  playButton: HTMLButtonElement
  slider: SliderElement
  slides: HTMLElement[]
}) {
  expect(controls).toHaveAttribute('aria-roledescription', 'carousel')
  assertActiveSlideIndex(slides, 0)

  await waitFor(() => {
    expect(nextButton).toHaveAttribute('aria-controls', slider.id)
  })
  await user.click(nextButton)
  await waitFor(() => assertActiveSlideIndex(slides, 1))

  await waitFor(() => {
    expect(prevButton).toHaveAttribute('aria-controls', slider.id)
  })
  await user.click(prevButton)
  await waitFor(() => assertActiveSlideIndex(slides, 0))

  for (const indexButton of indexButtons) {
    await user.click(indexButton)

    await waitFor(() =>
      expect(indexButton).toHaveAttribute('aria-pressed', 'true'),
    )
    indexButtons
      .filter((b) => b !== indexButton)
      .forEach((b) => expect(b).toHaveAttribute('aria-pressed', 'false'))
  }

  expect(slider.slider?.getOption('autoScroll')).toBe(false)
  await user.click(playButton)
  expect(slider.slider?.getOption('autoScroll')).toBe(true)
}

test('default controls', async () => {
  const controls = document.createElement('bs-slider-controls')
  controls.innerHTML = `
    <bs-carousel auto-scroll="false" data-testid="slider" speed="0">
      <div>Slide one</div>
      <div>Slide two</div>
      <div>Slide three</div>
    </bs-carousel>
  `

  document.body.appendChild(controls)

  const container =
    controls.shadowRoot!.querySelector<HTMLDivElement>('[part="container"]')!
  await waitFor(() => getByRole(container, 'button', { name: 'View slide 1' }))

  await runAssertions({
    controls,
    indexButtons: Array.from(
      container
        .querySelector<HTMLSlotElement>('slot[name="index"]')!
        .assignedElements() as HTMLButtonElement[],
    ),
    nextButton: getByRole(container, 'button', { name: 'Next' }),
    prevButton: getByRole(container, 'button', { name: 'Previous' }),
    playButton: await findByRole(container, 'button', {
      name: 'Start slide auto scroll',
    }),
    slider: document.querySelector('bs-carousel')!,
    slides: [
      getByText(controls, 'Slide one'),
      getByText(controls, 'Slide two'),
      getByText(controls, 'Slide three'),
    ],
  })
})

test('custom controls', async () => {
  const controls = document.createElement('bs-slider-controls')
  controls.innerHTML = `
    <bs-carousel auto-scroll="false" data-testid="slider" speed="0" id="my-slider">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </bs-carousel>

    <button slot="play-btn" aria-controls="my-slider">Play</button>

    <button slot="prev-btn" aria-controls="my-slider">Backwards</button>
    <button slot="next-btn" aria-controls="my-slider">Forwards</button>

    <div slot="index">
      <button aria-controls="my-slider">1</button>
      <button aria-controls="my-slider">2</button>
      <button aria-controls="my-slider">3</button>
    </div>
  `

  document.body.appendChild(controls)

  await runAssertions({
    controls,
    indexButtons: [
      getByRole(controls, 'button', { name: '1' }),
      getByRole(controls, 'button', { name: '2' }),
      getByRole(controls, 'button', { name: '3' }),
    ],
    nextButton: getByRole(controls, 'button', { name: 'Forwards' }),
    prevButton: getByRole(controls, 'button', { name: 'Backwards' }),
    playButton: await findByRole(controls, 'button', { name: 'Play' }),
    slider: getByTestId(controls, 'slider'),
    slides: [
      getByText(controls, 'Slide 1'),
      getByText(controls, 'Slide 2'),
      getByText(controls, 'Slide 3'),
    ],
  })
})

test('button label attributes', async () => {
  const controls = document.createElement('bs-slider-controls')
  const nextBtnLabel = 'Next slide'
  const prevBtnLabel = 'Previous slide'
  const playBtnLabel = 'Start slideshow'
  const pauseBtnLabel = 'Stop slideshow'

  controls.setAttribute('prev-btn-label', prevBtnLabel)
  controls.setAttribute('next-btn-label', nextBtnLabel)
  controls.setAttribute('index-btn-label', 'Show slide %d')
  controls.setAttribute('play-btn-label', playBtnLabel)
  controls.setAttribute('pause-btn-label', pauseBtnLabel)
  controls.innerHTML = `
    <bs-carousel auto-scroll="false" data-testid="slider" speed="0">
      <div>Slide one</div>
      <div>Slide two</div>
      <div>Slide three</div>
    </bs-carousel>
  `
  document.body.appendChild(controls)

  const container =
    controls.shadowRoot!.querySelector<HTMLDivElement>('[part="container"]')!

  await waitFor(() => {
    expect(
      getByRole(container, 'button', { name: prevBtnLabel }),
    ).toBeInTheDocument()
    expect(
      getByRole(container, 'button', { name: nextBtnLabel }),
    ).toBeInTheDocument()
    expect(
      getByRole(container, 'button', { name: 'Show slide 1' }),
    ).toBeInTheDocument()
    expect(
      getByRole(container, 'button', { name: 'Show slide 2' }),
    ).toBeInTheDocument()
    expect(
      getByRole(container, 'button', { name: 'Show slide 3' }),
    ).toBeInTheDocument()
  })

  const playBtn = await findByRole(container, 'button', { name: playBtnLabel })
  await user.click(playBtn)
  expect(playBtn).toHaveAccessibleName(pauseBtnLabel)
})
