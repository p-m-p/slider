import { useEffect, useState } from 'react'

export default function useImgLoader(srcList: string[]): boolean {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all(
      srcList.map(
        (src) =>
          new Promise((resolve, reject) => {
            const img = document.createElement('img')
            img.src = src
            img.onload = resolve
            img.onerror = reject
          }),
      ),
    ).then(() => setLoaded(true))
  }, [srcList])

  return loaded
}
