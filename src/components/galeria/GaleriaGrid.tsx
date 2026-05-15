'use client'

import { useRef, useState } from 'react'
import type { InstrumentoGaleria } from '@/lib/queries'
import InstrumentoCard from './InstrumentoCard'
import Button from '@/components/ui/Button'

const ITEMS_PER_PAGE = 18

interface Props {
  instrumentos: InstrumentoGaleria[]
  cardBg?: string
}

export default function GaleriaGrid({ instrumentos, cardBg }: Props) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todos')
  const [pagina, setPagina] = useState(1)
  const topoRef = useRef<HTMLDivElement>(null)

  const categoriaMap = new Map<string, string>()
  instrumentos.forEach((i) => {
    i.modeloBase?.categorias?.forEach((cat) => {
      if (!categoriaMap.has(cat._id)) {
        categoriaMap.set(cat._id, cat.title)
      }
    })
  })
  const categorias = Array.from(categoriaMap.entries())

  const filtrados =
    categoriaAtiva === 'todos'
      ? instrumentos
      : instrumentos.filter((i) =>
          i.modeloBase?.categorias?.some((cat) => cat._id === categoriaAtiva)
        )

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
                : 'border border-eco-border text-eco-ink hover:border-eco-turquoise hover:text-eco-turquoise'
            }`}
          >
            Todos
          </button>
          {categorias.map(([id, title]) => (
            <button
              key={id}
              onClick={() => selecionarCategoria(id)}
              className={`font-mono text-label uppercase tracking-widest px-4 py-2 transition-colors ${
                categoriaAtiva === id
                  ? 'bg-eco-turquoise text-white'
                  : 'border border-eco-border text-eco-ink hover:border-eco-turquoise hover:text-eco-turquoise'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      )}

      {/* Contador */}
      <p className="font-mono text-label uppercase tracking-widest text-eco-ink mb-6">
        {filtrados.length} instrumento{filtrados.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {visiveis.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {visiveis.map((instrumento) => (
            <InstrumentoCard key={instrumento._id} instrumento={instrumento} cardBg={cardBg} />
          ))}
        </div>
      ) : (
        <p className="font-sans text-body text-eco-ink py-12 text-center">
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
          <span className="font-mono text-label uppercase tracking-widest text-eco-ink">
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
