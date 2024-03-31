import { getByRole, getByText, waitFor } from '@testing-library/dom'
import user from '@testing-library/user-event'
import '..'

test('custom controls', async () => {
  const controls = document.createElement('bs-slider-controls')
  controls.innerHTML = `
    <bs-carousel auto-scroll="false" data-testid="slider" speed="0">
      <div>Slide one</div>
      <div>Slide two</div>
      <div>Slide three</div>
    </bs-carousel>

    <button slot="prev-btn">Prev</button>
    <button slot="next-btn">Next</button>

    <div slot="index">
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </div>
  `
  document.body.appendChild(controls)

  const slideOne = getByText(controls, 'Slide one')
  const slideTwo = getByText(controls, 'Slide two')
  const slideThree = getByText(controls, 'Slide three')

  expect(slideOne).toBeVisible()
  expect(slideTwo).not.toBeVisible()
  expect(slideThree).not.toBeVisible()

  await user.click(getByRole(controls, 'button', { name: 'Next' }))

  await waitFor(() => {
    expect(slideOne).not.toBeVisible()
    expect(slideTwo).toBeVisible()
    expect(slideThree).not.toBeVisible()
  })

  await user.click(getByRole(controls, 'button', { name: 'Prev' }))

  await waitFor(() => {
    expect(slideOne).toBeVisible()
    expect(slideTwo).not.toBeVisible()
    expect(slideThree).not.toBeVisible()
  })

  await user.click(getByRole(controls, 'button', { name: '3' }))

  await waitFor(() => {
    expect(slideOne).not.toBeVisible()
    expect(slideTwo).not.toBeVisible()
    expect(slideThree).toBeVisible()
  })
})
