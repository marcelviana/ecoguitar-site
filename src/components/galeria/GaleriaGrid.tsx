'use client'

import { useRef, useState } from 'react'
import type { InstrumentoGaleria } from '@/lib/queries'
import InstrumentoCard from './InstrumentoCard'
import Button from '@/components/ui/Button'

const CATEGORIA_LABELS: Record<string, string> = {
  guitarra: 'Guitarra',
  'guitarra-7-cordas': 'Guitarra 7 Cordas',
  baritono: 'Guitarra Barítono',
  headless: 'Guitarra Headless',
  multiescala: 'Guitarra Multiescala',
  thinline: 'Thinline',
  traveler: 'Guitarra Traveler',
  baixo: 'Baixo',
  violao: 'Violão',
}

const ITEMS_PER_PAGE = 18

interface Props {
  instrumentos: InstrumentoGaleria[]
}

export default function GaleriaGrid({ instrumentos }: Props) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todos')
  const [pagina, setPagina] = useState(1)
  const topoRef = useRef<HTMLDivElement>(null)

  const categorias = Array.from(
    new Set(
      instrumentos
        .map((i) => i.modeloBase?.categoria)
        .filter((c): c is string => Boolean(c))
    )
  )

  const filtrados =
    categoriaAtiva === 'todos'
      ? instrumentos
      : instrumentos.filter((i) => i.modeloBase?.categoria === categoriaAtiva)

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / ITEMS_PER_PAGE))
  const paginaAtual = Math.min(pagina, totalPaginas)
  const inicio = (paginaAtual - 1) * ITEMS_PER_PAGE
  const visiveis = filtrados.slice(inicio, inicio + ITEMS_PER_PAGE)

  function selecionarCategoria(cat: string) {
    setCategoriaAtiva(cat)
    setPagina(1)
  }

  function mudarPagina(nova: number) {
    setPagina(nova)
    topoRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={topoRef}>
      {/* Filtros por categoria */}
      {categorias.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => selecionarCategoria('todos')}
            className={`font-mono text-label uppercase tracking-widest px-4 py-2 transition-colors ${
              categoriaAtiva === 'todos'
                ? 'bg-eco-turquoise text-white'
                : 'border border-eco-border text-eco-sky hover:border-eco-turquoise hover:text-eco-turquoise'
            }`}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => selecionarCategoria(cat)}
              className={`font-mono text-label uppercase tracking-widest px-4 py-2 transition-colors ${
                categoriaAtiva === cat
                  ? 'bg-eco-turquoise text-white'
                  : 'border border-eco-border text-eco-sky hover:border-eco-turquoise hover:text-eco-turquoise'
              }`}
            >
              {CATEGORIA_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>
      )}

      {/* Contador */}
      <p className="font-mono text-label uppercase tracking-widest text-eco-sky mb-6">
        {filtrados.length} instrumento{filtrados.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {visiveis.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {visiveis.map((instrumento) => (
            <InstrumentoCard key={instrumento._id} instrumento={instrumento} />
          ))}
        </div>
      ) : (
        <p className="font-sans text-body text-eco-sky py-12 text-center">
          Nenhum instrumento encontrado nessa categoria.
        </p>
      )}

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-6 mt-12">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => mudarPagina(paginaAtual - 1)}
            className={paginaAtual <= 1 ? 'opacity-40 pointer-events-none' : ''}
          >
            Anterior
          </Button>
          <span className="font-mono text-label uppercase tracking-widest text-eco-sky">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => mudarPagina(paginaAtual + 1)}
            className={paginaAtual >= totalPaginas ? 'opacity-40 pointer-events-none' : ''}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  )
}
