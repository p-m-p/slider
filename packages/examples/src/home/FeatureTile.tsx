type FeatureTileProps = {
  text: string
  title: string
}

export default function FeatureTile({ title, text }: FeatureTileProps) {
  return (
    <div className="bg-neutral-800 border border-neutral-600 p-4 rounded">
      <h3 className="text-2xl mb-2 text-orange-500 font-bold">{title}</h3>
      <p className="text-lg text-neutral-200">{text}</p>
    </div>
  )
}
