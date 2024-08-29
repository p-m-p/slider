import '@testing-library/jest-dom/vitest'

if (typeof HTMLElement.prototype.animate === 'undefined') {
  HTMLElement.prototype.animate = vi.fn(() => ({
    finished: Promise.resolve(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  })) as any
  HTMLElement.prototype.getAnimations = vi.fn(() => [])
}
