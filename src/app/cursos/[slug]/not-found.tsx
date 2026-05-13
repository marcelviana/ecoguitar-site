import Link from 'next/link'
import Button from '@/components/ui/Button'

const WHATSAPP_URL = 'https://wa.me/5511976947027'

export default function CursoNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-eco-sand-light px-6">
      <div className="max-w-md text-center flex flex-col items-center gap-6">
        <svg
          aria-hidden="true"
          className="w-16 h-16 text-eco-turquoise/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="font-serif text-headline text-eco-night">
          Curso não encontrado
        </h1>
        <p className="font-sans text-body text-eco-sky">
          Este curso não está disponível no momento. Veja os demais cursos ou entre em contato
          para saber das próximas turmas.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/cursos"
            className="inline-flex items-center justify-center font-sans font-medium transition-colors duration-200 border border-eco-night text-eco-night hover:bg-eco-night hover:text-white px-6 py-3 text-body"
          >
            Ver todos os cursos
          </Link>
          <Button href={WHATSAPP_URL} variant="primary" size="md">
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
