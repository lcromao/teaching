import styles from './Slide.module.css'

export default function Slide({ title, subtitle, children, isActive, isFull }) {
  return (
    <section className={`${styles.slide} ${isActive ? styles.active : ''}`}>
      <div className={styles.slideTitle}>{title}</div>
      {subtitle && <p className={styles.slideSubtitle}>{subtitle}</p>}
      <div className={`${styles.slideBody} ${isFull ? styles.full : ''}`}>
        {children}
      </div>
    </section>
  )
}

export function SlideColumn({ children }) {
  return <div className={styles.col}>{children}</div>
}

export function Pill({ children }) {
  return (
    <span className={styles.pill}>
      <span className={styles.pillDot}></span>
      <span>{children}</span>
    </span>
  )
}

export function Note({ children }) {
  return <p className={styles.note}>{children}</p>
}

export function CodeBlock({ label, children }) {
  return (
    <div className={styles.codeBlock} data-label={label}>
      <pre><code>{children}</code></pre>
    </div>
  )
}
