import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import style from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow'

SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('markup', markup)
SyntaxHighlighter.registerLanguage('tsx', tsx)

type CodeExampleProps = {
  ts?: string
  react?: string
  html?: string
  css?: string
  shell?: string
  reactShell?: string
}

export default function CodeExample({
  css,
  html,
  react,
  reactShell,
  shell,
  ts,
}: CodeExampleProps) {
  const panes = []

  if (shell) {
    panes.push({
      codeString: shell,
      label: 'TypeScript',
      language: 'bash',
    })
  }
  if (reactShell) {
    panes.push({
      codeString: reactShell,
      label: 'React',
      language: 'bash',
    })
  }
  if (ts) {
    panes.push({
      codeString: ts,
      label: 'TypeScript',
      language: 'tsx',
    })
  }
  if (react) {
    panes.push({
      codeString: react,
      label: 'React',
      language: 'tsx',
    })
  }
  if (css) {
    panes.push({
      codeString: css,
      label: 'CSS',
      language: 'css',
    })
  }
  if (html) {
    panes.push({
      codeString: html,
      label: 'HTML',
      language: 'markup',
    })
  }

  const [selectedPane, setSelectedPane] = useState(panes[0])

  return (
    <div className="mb-8">
      {panes.length > 1 && (
        <div className="flex border-b-4 border-neutral-700">
          {panes.map((pane) => (
            <button
              key={pane.label}
              className={`block px-2 py-0.5 text-sm ${
                pane.label === selectedPane.label ? 'bg-neutral-800' : ''
              }`}
              onClick={() => setSelectedPane(pane)}>
              {pane.label}
            </button>
          ))}
        </div>
      )}
      <div className="bg-neutral-800">
        <SyntaxHighlighter
          language={selectedPane.language}
          style={style}
          customStyle={{ margin: 0, backgroundColor: 'transparent' }}>
          {selectedPane.codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
