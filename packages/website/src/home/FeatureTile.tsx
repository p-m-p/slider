import type { ReactNode } from 'react'

type FeatureTileProps = {
  children: string
  icon: ReactNode
  title: string
}

export default function FeatureTile({
  children,
  icon,
  title,
}: FeatureTileProps) {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg ring-1 ring-neutral-700">
      <h3 className="text-2xl mb-2 text-neutral-300 font-bold flex flex-row items-center justify-center gap-3">
        <span className="text-yellow-500">{icon}</span>
        {title}
      </h3>
      <p className="text-lg text-neutral-400 font-light text-center">
        {children}
      </p>
    </div>
  )
}
