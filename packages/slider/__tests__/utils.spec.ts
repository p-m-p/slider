import { createProgressiveTransition } from '../src/utils'

describe('createProgressiveTransition', () => {
  describe('setProgress', () => {
    test('calls onProgress with the given value', () => {
      const onProgress = vi.fn()
      const state = createProgressiveTransition({
        elements: [],
        speed: 500,
        onProgress,
      })

      state.setProgress(0.5)
      expect(onProgress).toHaveBeenCalledWith(0.5)
    })

    test('does nothing when onProgress is not provided', () => {
      const state = createProgressiveTransition({
        elements: [],
        speed: 500,
      })

      expect(() => state.setProgress(0.5)).not.toThrow()
    })
  })

  describe('complete', () => {
    test('calls onComplete with fromProgress and remaining duration', async () => {
      const onComplete = vi.fn().mockResolvedValue()
      const state = createProgressiveTransition({
        elements: [],
        speed: 1000,
        onComplete,
      })

      await state.complete(0.4)

      expect(onComplete).toHaveBeenCalledWith(0.4, 600)
    })

    test('calls onFinish after onComplete', async () => {
      const order: string[] = []
      const onComplete = vi.fn().mockImplementation(async () => {
        order.push('complete')
      })
      const onFinish = vi.fn().mockImplementation(() => {
        order.push('finish')
      })
      const state = createProgressiveTransition({
        elements: [],
        speed: 500,
        onComplete,
        onFinish,
      })

      await state.complete(0)
      expect(order).toEqual(['complete', 'finish'])
    })

    test('cancels animations on elements after completing', async () => {
      const mockCancel = vi.fn()
      const el = document.createElement('div')
      el.getAnimations = vi.fn().mockReturnValue([{ cancel: mockCancel }])

      const state = createProgressiveTransition({
        elements: [el],
        speed: 500,
      })

      await state.complete(0)
      expect(mockCancel).toHaveBeenCalled()
    })

    test('does nothing when onComplete and onFinish are not provided', async () => {
      const state = createProgressiveTransition({
        elements: [],
        speed: 500,
      })

      await expect(state.complete(0)).resolves.toBeUndefined()
    })
  })

  describe('cancel', () => {
    test('calls onCancel with fromProgress and remaining duration', async () => {
      const onCancel = vi.fn().mockResolvedValue()
      const state = createProgressiveTransition({
        elements: [],
        speed: 1000,
        onCancel,
      })

      await state.cancel(0.3)

      expect(onCancel).toHaveBeenCalledWith(0.3, 300)
    })

    test('calls onReset after onCancel', async () => {
      const order: string[] = []
      const onCancel = vi.fn().mockImplementation(async () => {
        order.push('cancel')
      })
      const onReset = vi.fn().mockImplementation(() => {
        order.push('reset')
      })
      const state = createProgressiveTransition({
        elements: [],
        speed: 500,
        onCancel,
        onReset,
      })

      await state.cancel(0.5)
      expect(order).toEqual(['cancel', 'reset'])
    })

    test('cancels animations on elements after cancelling', async () => {
      const mockCancel = vi.fn()
      const el = document.createElement('div')
      el.getAnimations = vi.fn().mockReturnValue([{ cancel: mockCancel }])

      const state = createProgressiveTransition({
        elements: [el],
        speed: 500,
      })

      await state.cancel(0.5)
      expect(mockCancel).toHaveBeenCalled()
    })

    test('does nothing when onCancel and onReset are not provided', async () => {
      const state = createProgressiveTransition({
        elements: [],
        speed: 500,
      })

      await expect(state.cancel(0.5)).resolves.toBeUndefined()
    })
  })

  describe('abort', () => {
    test('calls onReset immediately', () => {
      const onReset = vi.fn()
      const state = createProgressiveTransition({
        elements: [],
        speed: 500,
        onReset,
      })

      state.abort()
      expect(onReset).toHaveBeenCalled()
    })

    test('cancels animations on elements', () => {
      const mockCancel = vi.fn()
      const el = document.createElement('div')
      el.getAnimations = vi.fn().mockReturnValue([{ cancel: mockCancel }])

      const state = createProgressiveTransition({
        elements: [el],
        speed: 500,
      })

      state.abort()
      expect(mockCancel).toHaveBeenCalled()
    })

    test('does nothing when onReset is not provided', () => {
      const state = createProgressiveTransition({
        elements: [],
        speed: 500,
      })

      expect(() => state.abort()).not.toThrow()
    })
  })
})
