type Props = {
  label: string
  variant?: 'turquoise' | 'sun'
}

export default function CategoryBadge({ label, variant = 'turquoise' }: Props) {
  const styles = {
    turquoise: 'bg-eco-turquoise/10 border border-eco-turquoise/30 text-eco-turquoise-dk',
    sun: 'bg-eco-sun/15 border border-eco-sun/40 text-eco-night',
  }

  return (
    <span className={`inline-block font-mono text-label uppercase px-2 py-px rounded ${styles[variant]}`}>
      {label}
    </span>
  )
}
