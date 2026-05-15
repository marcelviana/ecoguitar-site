type Tone = 'orange' | 'turquoise' | 'sun' | 'sand'

type SectionLabelProps = {
  children: React.ReactNode
  tone?: Tone
  className?: string
}

const toneClasses: Record<Tone, string> = {
  orange:    'text-eco-orange',
  turquoise: 'text-eco-turquoise',
  sun:       'text-eco-sun',
  sand:      'text-eco-sand-light/70',
}

export default function SectionLabel({
  children,
  tone = 'orange',
  className = '',
}: SectionLabelProps) {
  return (
    <span
      className={`block font-mono text-label uppercase tracking-widest ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
