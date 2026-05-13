type Props = {
  label: string
  variant?: 'turquoise' | 'sun'
}

export default function CategoryBadge({ label, variant = 'turquoise' }: Props) {
  const styles = {
    turquoise: 'bg-eco-turquoise/10 border border-eco-turquoise/30 text-eco-turquoise-dk',
    sun:       'bg-eco-sun/[12%] border border-eco-sun/50 text-eco-sun',
  }

  return (
    <span className={`inline-block font-mono text-[10px] tracking-[0.02em] px-1.5 py-px rounded ${styles[variant]}`}>
      {label}
    </span>
  )
}
