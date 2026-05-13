import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

// TODO Sessão 5: integrar feed @ecoguitar via Instagram Basic Display API

const placeholders = Array.from({ length: 6 }, (_, i) => i)

export default function GaleriaSection() {
  return (
    <section className="bg-eco-white py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionLabel>@ecoguitar</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3">Galeria</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {placeholders.map((i) => (
            <div
              key={i}
              className="aspect-square bg-eco-border/40 rounded-xl animate-pulse"
            />
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
