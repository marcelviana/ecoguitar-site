import SectionLabel from './SectionLabel'

type SectionHeadingProps = {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="font-serif text-headline text-eco-night">{title}</h2>
      {subtitle && (
        <p className="text-body-lg text-eco-sky max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}
