import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const clube = {
  titulo: 'Clube Eco Guitar',
  descricao:
    'Uma comunidade exclusiva para apaixonados por lutheria. Acesso antecipado a novos instrumentos, descontos em cursos e workshops, encontros presenciais e conteúdo exclusivo com Pedro Machado.',
}

export default function ClubeSection() {
  return (
    <section className="bg-eco-turquoise py-section">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <SectionLabel tone="sand">Exclusivo</SectionLabel>
        <h2 className="font-serif text-headline text-white mt-3 mb-6">
          {clube.titulo}
        </h2>
        <p className="font-sans text-body-lg text-white/80 mb-10">
          {clube.descricao}
        </p>
        <Button
          href="/clube"
          variant="secondary"
          size="lg"
          className="border-white text-white hover:bg-white hover:text-eco-turquoise"
        >
          Quero participar
        </Button>
      </div>
    </section>
  )
}
