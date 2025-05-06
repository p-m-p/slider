import { BoxSliderOptions } from '@boxslider/slider'
import { createContext } from 'react'

export const Context = createContext<{
  options: Partial<BoxSliderOptions>
  setOption: (key: string, value: string | boolean | number) => void
}>({
  options: {},
  setOption: () => {},
})
