import { use } from 'react'
import { Context } from '../Examples/Context'

export function useOptions() {
  return use(Context)
}
