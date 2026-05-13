import type { ModeloInstrumento } from '@/lib/queries'
import ModeloCarousel from './ModeloCarousel'

const CATEGORIA_LABELS: Record<string, string> = {
  'guitarra': 'Guitarra',
  'guitarra-7-cordas': 'Guitarra 7 Cordas',
  'baritono': 'Guitarra Barítono',
  'headless': 'Guitarra Headless',
  'multiescala': 'Guitarra Multiescala',
  'thinline': 'Guitarra Thinline',
  'traveler': 'Guitarra Traveler',
  'baixo': 'Baixo',
  'violao': 'Violão',
}

export default function ModelosGrid({ modelos }: { modelos: ModeloInstrumento[] }) {
  if (!modelos.length) return null

  const grouped = modelos.reduce<Record<string, ModeloInstrumento[]>>((acc, m) => {
    const cat = m.categoria ?? 'outro'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(m)
    return acc
  }, {})

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
      {Object.entries(grouped).map(([categoria, items]) => (
        <div key={categoria}>
          <div className="inline-block mb-4 px-4 py-1.5 bg-eco-turquoise/10 border-l-4 border-eco-turquoise rounded-r-lg">
            <h3 className="font-mono text-label uppercase tracking-widest text-eco-turquoise-dk">
              {CATEGORIA_LABELS[categoria] ?? categoria}
            </h3>
          </div>
          <ModeloCarousel items={items} />
        </div>
      ))}
    </div>
  )
}
