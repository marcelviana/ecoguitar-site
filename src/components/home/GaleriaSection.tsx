import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

// TODO Sessão 5: integrar feed @ecoguitar via Instagram Basic Display API

const placeholders = Array.from({ length: 6 }, (_, i) => i)

export default function GaleriaSection() {
  return (
    <section className="bg-eco-paper py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionLabel>@ecoguitar</SectionLabel>
          <h2 className="font-serif text-headline text-eco-charcoal mt-3">Galeria</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {placeholders.map((i) => (
            <div
              key={i}
              className="aspect-square bg-eco-wood/20 rounded-xl flex items-center justify-center"
            >
              <svg
                aria-hidden="true"
                className="w-10 h-10 text-eco-wood/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            href="https://instagram.com/ecoguitar"
            variant="ghost"
            size="md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver mais no Instagram
          </Button>
        </div>
      </div>
    </section>
  )
}
