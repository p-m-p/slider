type TransitionFn = () => Promise<void>

export type TransitionQueue = {
  push: (fn: TransitionFn) => void
  clear: () => void
}

export const createQueue = (): TransitionQueue => {
  const queue: TransitionFn[] = []

  const run = () => {
    const fn = queue[0]

    if (fn) {
      fn().then(() => {
        queue.shift()
        run()
      })
    }
  }

  return {
    push(fn: TransitionFn) {
      queue.push(fn)

      if (queue.length === 1) {
        run()
      }
    },
    clear() {
      queue.length = 0
    },
  }
}
