import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type ButtonAsLink = {
  href: string
  onClick?: never
}
type ButtonAsButton = {
  href?: never
  onClick?: () => void
}

type ButtonProps = (ButtonAsLink | ButtonAsButton) & {
  variant?: Variant
  size?: Size
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-eco-orange text-white hover:bg-eco-orange/90 border border-eco-orange hover:border-eco-orange/90',
  secondary:
    'border border-eco-night text-eco-night hover:bg-eco-night hover:text-white bg-transparent',
  ghost:
    'border-0 text-eco-turquoise underline-offset-4 hover:underline bg-transparent',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-small',
  md: 'px-6 py-3 text-body',
  lg: 'px-8 py-4 text-body-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  onClick,
  target,
  rel,
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center font-sans font-medium transition-colors duration-200 cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ')

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('https')
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={target ?? '_blank'}
          rel={rel ?? 'noopener noreferrer'}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
