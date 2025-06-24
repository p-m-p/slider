type TransitionFn = () => Promise<void>

export type TransitionQueue = {
  push: (fn: TransitionFn) => void
  clear: () => void
}

export const createQueue = (): TransitionQueue => {
  let next: TransitionFn | null = null

  function run() {
    const fn = next

    fn?.().then(() => {
      if (fn === next) {
        next = null
      } else {
        run()
      }
    })
  }

  return {
    push(fn: TransitionFn) {
      const runNow = next === null

      next = fn

      if (runNow) {
        run()
      }
    },
    clear() {
      next = null
    },
  }
}
