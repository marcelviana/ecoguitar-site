type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`block font-mono text-label uppercase tracking-widest text-eco-orange ${className}`}
    >
      {children}
    </span>
  )
}
