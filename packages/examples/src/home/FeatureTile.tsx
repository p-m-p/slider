type FeatureTileProps = {
  children: string
  title: string
}

export default function FeatureTile({ title, children }: FeatureTileProps) {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg">
      <h3 className="text-2xl mb-2 text-orange-500 font-bold">{title}</h3>
      <p className="text-lg text-neutral-200 font-light">{children}</p>
    </div>
  )
}
