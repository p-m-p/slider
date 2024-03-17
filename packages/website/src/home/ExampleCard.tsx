import { Codepen } from 'lucide-react'

export interface ExampleCardProps {
  title: string
  description: string
  url: string
  level: 'easy' | 'intermediate' | 'advanced'
}

export default function ExampleCard({
  description,
  level,
  title,
  url,
}: ExampleCardProps) {
  return (
    <div>
      <div className="text-right">
        <div className="h-0.5 bg-neutral-700">
          <div
            className={`h-full bg-gradient-to-r from-neutral-800 to-neutral-600`}></div>
        </div>
        <span className="uppercase text-neutral-500 text-sm font-bold mx-2 bg-clip-text bg-gradient-to-tr from-green-800 to-green-500 text-transparent">
          {level}
        </span>
      </div>

      <div className="p-4 pt-0">
        <h3 className="text-xl mb-2">{title}</h3>
        <p className="text-neutral-300">{description}</p>

        <div className="mt-4 flex flex-row gap-2">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 hover:text-blue-600 transition-colors">
            <Codepen className="text-white" />
            View on Codepen
          </a>
        </div>
      </div>
    </div>
  )
}
