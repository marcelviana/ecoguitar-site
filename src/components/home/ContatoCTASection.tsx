import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const waLink = 'https://wa.me/5511999999999'

export default function ContatoCTASection() {
  return (
    <section className="bg-eco-turquoise py-section">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <SectionLabel tone="sand">Próximos passos</SectionLabel>
          <h2 className="font-serif text-headline text-white mt-3">
            Aprenda ou confie. O Pedro está aqui para os dois.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Cursos */}
          <div className="flex flex-col gap-5 p-8 bg-eco-turquoise-dk/20 rounded-xl border border-white/20">
            <div className="text-white text-3xl" aria-hidden="true">🎓</div>
            <div>
              <h3 className="font-serif text-title text-white mb-2">Quero aprender lutheria</h3>
              <p className="font-sans text-body text-eco-sand-light/80">
                Cursos Express, Intensivo e Extensivo com Pedro Machado em São Paulo.
              </p>
            </div>
            <div className="mt-auto">
              <Button href="/cursos" variant="primary" size="lg">
                Ver cursos
              </Button>
            </div>
          </div>

          {/* Card Regulagem */}
          <div className="flex flex-col gap-5 p-8 bg-eco-turquoise-dk/20 rounded-xl border border-white/20">
            <div className="text-white text-3xl" aria-hidden="true">🔧</div>
            <div>
              <h3 className="font-serif text-title text-white mb-2">Preciso de regulagem ou manutenção</h3>
              <p className="font-sans text-body text-eco-sand-light/80">
                Setup, troca de trastes, restauração e muito mais. Atendimento na oficina ou delivery em SP.
              </p>
            </div>
            <div className="mt-auto">
              <Button
                href="/servicos"
                variant="secondary"
                size="lg"
                className="border-white/40 text-white hover:bg-white hover:text-eco-turquoise"
              >
                Ver serviços
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-label uppercase tracking-widest text-eco-sand-light/70 hover:text-eco-sand-light transition-colors"
          >
            ou fale pelo WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}
