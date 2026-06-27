import { useState, useCallback } from 'react'
import { Copy, Check, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { Button } from '../Button'
import styles from './styles.module.css'

interface CopyPromptProps {
  prompt: string
}

export function CopyPrompt({ prompt }: CopyPromptProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [prompt])

  return (
    <div className={styles.container}>
      <Button
        onClick={handleCopy}
        aria-label={
          copied ? 'Prompt copied to clipboard' : 'Copy AI prompt to clipboard'
        }>
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? 'Copied!' : 'Copy AI prompt'}
      </Button>
      <details
        className={styles.details}
        onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
        <summary className={styles.summary}>
          <ChevronDown
            className={clsx(styles.chevron, open && styles.chevronOpen)}
            size={14}
            aria-hidden
          />
          View prompt
        </summary>
        <pre className={styles.promptText}>{prompt}</pre>
      </details>
    </div>
  )
}
