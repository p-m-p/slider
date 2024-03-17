import { useContext } from 'react'
import { Context } from '../Examples/Context'

export function useOptions() {
  return useContext(Context)
}
