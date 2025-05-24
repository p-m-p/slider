import styles from './styles.module.css'

export function CodePen({
  penId,
  title,
  tab = 'js',
}: {
  penId: string
  title: string
  tab?: string
}) {
  return (
    <>
      <p
        className={styles.codepen + ' codepen'}
        data-height="600"
        data-default-tab={`${tab},result`}
        data-slug-hash={penId}
        data-pen-title={`BoxSlider - ${title}`}
        data-user="p-m-p">
        See the Pen{' '}
        <a href={`https://codepen.io/p-m-p/pen/${penId}`}>
          BoxSlider - {title}
        </a>
      </p>
      <script
        async
        src="https://public.codepenassets.com/embed/index.js"></script>
    </>
  )
}
