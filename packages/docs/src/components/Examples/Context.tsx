import { createContext } from 'react'

export const Context = createContext<{
  options: Record<string, string | boolean | number>
  setOption: (key: string, value: string | boolean) => void
}>({
  options: {},
  setOption: () => {},
})
