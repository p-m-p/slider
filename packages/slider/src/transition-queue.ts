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
      if (fn !== next) {
        console.log('has next')
        run()
      } else {
        console.log('no next')
        next = null
      }
    })
  }

  return {
    push(fn: TransitionFn) {
      const runNow = next === null

      next = fn

      if (runNow) {
        console.log('run now')
        run()
      } else {
        console.log('only set next')
      }
    },
    clear() {
      next = null
    },
  }
}
