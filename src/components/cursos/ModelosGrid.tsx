import Image from 'next/image'
import type { ModeloInstrumento } from '@/lib/queries'

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

function GuitarSilhouette() {
  return (
    <svg
      viewBox="0 0 80 120"
      fill="none"
      className="w-full h-full text-eco-wood/20"
      aria-hidden="true"
    >
      <path
        d="M40 8 C32 8 26 14 26 22 C26 28 29 33 34 36 L30 70 C24 72 18 78 18 88 C18 102 28 112 40 112 C52 112 62 102 62 88 C62 78 56 72 50 70 L46 36 C51 33 54 28 54 22 C54 14 48 8 40 8Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

function ModeloCard({ modelo }: { modelo: ModeloInstrumento }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-eco-cream rounded-xl border border-eco-border hover:border-eco-wood/30 transition-colors duration-150">
      <div className="relative w-full aspect-square bg-eco-charcoal rounded-lg overflow-hidden flex items-center justify-center">
        {modelo.imagem ? (
          <Image
            src={modelo.imagem}
            alt={modelo.nome}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-contain [filter:sepia(1)_brightness(0.9)_saturate(1.4)]"
          />
        ) : (
          <div className="w-12 h-16">
            <GuitarSilhouette />
          </div>
        )}
        {modelo.destaque && (
          <span className="absolute top-2 right-2 font-mono text-label bg-eco-wood text-white px-2 py-0.5 rounded-full">
            Destaque
          </span>
        )}
      </div>
      <p className="font-sans text-small text-eco-charcoal text-center leading-tight">
        {modelo.nome}
      </p>
      {modelo.observacao && (
        <p className="font-mono text-label text-eco-muted text-center">{modelo.observacao}</p>
      )}
    </div>
  )
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
    <div className="flex flex-col gap-10">
      {Object.entries(grouped).map(([categoria, items]) => (
        <div key={categoria}>
          <div className="inline-block mb-4 px-4 py-1.5 bg-eco-wood/10 border-l-4 border-eco-wood rounded-r-lg">
            <h3 className="font-mono text-label uppercase tracking-widest text-eco-wood-dark">
              {CATEGORIA_LABELS[categoria] ?? categoria}
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((modelo) => (
              <ModeloCard key={modelo._id} modelo={modelo} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
