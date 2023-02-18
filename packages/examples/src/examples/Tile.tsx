import type { ReactNode } from 'react'

type TileProps = {
  title: string
  children: ReactNode
}

export default function Tile({ children, title }: TileProps) {
  return (
    <div className="bg-neutral-800 rounded border border-neutral-600 p-4">
      <h2 className="text-2xl text-orange-500 mb-4">{title}</h2>
      <div className="">{children}</div>
    </div>
  )
}
