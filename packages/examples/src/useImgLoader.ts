import { useEffect, useState } from 'react'

export default function useImgLoader(srcList: string[]): boolean {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let toLoad = [...srcList]
    const listeners: { img: HTMLImageElement; listener: () => void }[] = []
    const timer = setTimeout(() => {
      srcList.map((src) => {
        const img = document.createElement('img')
        const listener = () => {
          toLoad = toLoad.filter((s) => s !== src)

          if (toLoad.length === 0) {
            setLoaded(true)
          }
        }
        img.addEventListener('load', listener, false)
        img.src = src
        listeners.push({ img, listener })
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      listeners.forEach(({ img, listener }) => img.removeEventListener('load', listener))
      listeners.length = 0
    }
  }, [srcList])

  return loaded
}
