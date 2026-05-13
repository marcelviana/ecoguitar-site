import SectionLabel from '@/components/ui/SectionLabel'
import { getDepoimentos, type Depoimento } from '@/lib/queries'

function DepoimentoCard({ depoimento }: { depoimento: Depoimento }) {
  return (
    <div className="flex flex-col gap-4 p-8 border border-eco-sand-light/10 rounded-xl bg-eco-night/50">
      <span aria-hidden="true" className="font-serif text-5xl leading-none text-eco-turquoise select-none">
        "
      </span>
      <p className="font-sans text-body text-eco-sand-light/80 -mt-4">{depoimento.texto}</p>
      <div className="mt-auto pt-4 border-t border-eco-sand-light/10">
        <p className="font-sans text-body font-medium text-eco-sand-light">{depoimento.nomeAluno}</p>
        {depoimento.cursoRealizado && (
          <p className="font-mono text-small text-eco-sky">{depoimento.cursoRealizado}</p>
        )}
      </div>
    </div>
  )
}

export default async function DepoimentosSection() {
  const depoimentos = await getDepoimentos()

  if (depoimentos.length === 0) return null

  return (
    <section className="bg-eco-night py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionLabel className="text-eco-turquoise">O que diz quem já fez</SectionLabel>
          <h2 className="font-serif text-headline text-eco-sand-light mt-3">Depoimentos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depoimentos.slice(0, 3).map((depoimento) => (
            <DepoimentoCard key={depoimento._id} depoimento={depoimento} />
          ))}
        </div>
      </div>
    </section>
  )
}
