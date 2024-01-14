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
  let levelBarWidth = 'w-1/6'

  if (level === 'intermediate') {
    levelBarWidth = 'w-1/2'
  } else if (level === 'advanced') {
    levelBarWidth = 'w-5/6'
  }

  return (
    <div>
      <div className="text-right">
        <div className="h-1 bg-neutral-700">
          <div className={`${levelBarWidth} h-full bg-orange-700`}></div>
        </div>
        <span className="uppercase text-neutral-600 text-sm font-bold mx-2">
          {level}
        </span>
      </div>

      <div className="p-4 pt-0">
        <h3 className="text-xl mb-2">{title}</h3>
        <p className="text-neutral-300">{description}</p>

        <div className="mt-4">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-orange-600 transition-colors flex flex-row gap-2">
            <Codepen />
            View on Codepen
          </a>
        </div>
      </div>
    </div>
  )
}
