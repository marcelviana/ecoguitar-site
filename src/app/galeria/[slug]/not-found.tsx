import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function InstrumentoNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-eco-cream px-6">
      <div className="max-w-md text-center flex flex-col items-center gap-6">
        <svg
          aria-hidden="true"
          className="w-16 h-16 text-eco-wood/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
        <h1 className="font-serif text-headline text-eco-charcoal">
          Instrumento não encontrado
        </h1>
        <p className="font-sans text-body text-eco-muted">
          Este instrumento não está disponível. Veja todos os instrumentos da galeria.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/galeria"
            className="inline-flex items-center justify-center font-sans font-medium transition-colors duration-200 border border-eco-charcoal text-eco-charcoal hover:bg-eco-charcoal hover:text-white px-6 py-3 text-body"
          >
            Ver galeria
          </Link>
          <Button href="https://wa.me/5511976947027" variant="primary" size="md">
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
