'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CursoListagem } from '@/lib/queries'

type Codigo = 'E' | 'I' | 'X'

const PERGUNTAS = [
  {
    texto: 'Quanto tempo você tem disponível?',
    opcoes: [
      { texto: 'Uma semana de férias', ponto: 'I' as Codigo },
      { texto: 'Tenho dias ou horários fixos na semana', ponto: 'X' as Codigo },
      { texto: 'Alguns dias concentrados', ponto: 'E' as Codigo },
    ],
  },
  {
    texto: 'O que você quer levar para casa?',
    opcoes: [
      { texto: 'Um instrumento completo que eu mesmo construí', ponto: 'X' as Codigo },
      { texto: 'Aprender uma parte específica do processo', ponto: 'E' as Codigo },
      { texto: 'Quero a experiência, o resultado é consequência', ponto: 'I' as Codigo },
    ],
  },
  {
    texto: 'Você tem experiência com trabalhos manuais?',
    opcoes: [
      { texto: 'Sim, já mexi com madeira ou marcenaria', ponto: 'X' as Codigo },
      { texto: 'Tenho um pouco de experiência', ponto: 'I' as Codigo },
      { texto: 'Sou iniciante completo', ponto: 'E' as Codigo },
    ],
  },
  {
    texto: 'O que mais te atrai na ideia?',
    opcoes: [
      { texto: 'A experiência completa, do início ao fim', ponto: 'X' as Codigo },
      { texto: 'Aprender rápido e ter um resultado concreto', ponto: 'E' as Codigo },
      { texto: 'Descomprimir e fazer algo diferente com as mãos', ponto: 'X' as Codigo },
    ],
  },
]

const FALLBACKS: Record<string, string> = {
  Express:
    'O Curso Express é ideal para você. Em poucos dias concentrados você aprende uma etapa específica e sai com resultado concreto.',
  Intensivo:
    'O Curso Intensivo é a escolha certa. Em uma semana você constrói seu instrumento do zero com acompanhamento total do Pedro.',
  Extensivo:
    'O Curso Extensivo combina com o seu perfil. Com encontros regulares ao longo de semanas, você vive o processo completo de construção.',
}

function resolverVencedor(scores: Record<Codigo, number>): string {
  const { E, I, X } = scores
  if (X >= I && X >= E) return 'Extensivo'
  if (I >= E) return 'Intensivo'
  return 'Express'
}

function buildWaLink(nomeCurso: string) {
  return `https://wa.me/5511976947027?text=${encodeURIComponent(
    `Olá Pedro! Fiz o quiz e me indicou o ${nomeCurso}. Quero saber mais!`
  )}`
}

export default function QuizCurso({ cursos }: { cursos: CursoListagem[] }) {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<Codigo, number>>({ E: 0, I: 0, X: 0 })
  const [selected, setSelected] = useState<number | null>(null)
  const [visible, setVisible] = useState(true)

  const concluido = step >= PERGUNTAS.length

  function handleOption(ponto: Codigo, idx: number) {
    if (selected !== null) return
    setSelected(idx)
    const nextScores = { ...scores, [ponto]: scores[ponto] + 1 }

    setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setScores(nextScores)
        setStep((s) => s + 1)
        setSelected(null)
        setVisible(true)
      }, 200)
    }, 300)
  }

  function reiniciar() {
    setVisible(false)
    setTimeout(() => {
      setStep(0)
      setScores({ E: 0, I: 0, X: 0 })
      setSelected(null)
      setVisible(true)
    }, 200)
  }

  const modalidadeVencedora = resolverVencedor(scores)
  const cursoResultado = cursos.find((c) => c.modalidade === modalidadeVencedora)
  const nomeCurso = cursoResultado?.titulo ?? `Curso ${modalidadeVencedora}`
  const slugCurso = cursoResultado?.slug ?? modalidadeVencedora.toLowerCase()
  const textoResultado = cursoResultado?.textoQuiz ?? FALLBACKS[modalidadeVencedora]

  const pergunta = PERGUNTAS[step]

  return (
    <section className="bg-eco-white py-section border-t border-eco-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <p className="font-mono text-label uppercase tracking-widest text-eco-orange mb-2">
              Descubra qual curso é o seu
            </p>
            <h2 className="font-serif text-headline text-eco-night">Quiz rápido</h2>
            <p className="font-sans text-body text-eco-sky mt-2">
              Quatro perguntas para encontrar a modalidade certa para o seu perfil.
            </p>
          </div>

          <div
            className="bg-eco-sand-warm border border-eco-border rounded-2xl p-8 transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {!concluido ? (
              <>
                {/* Progresso */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-label text-eco-sky">
                      Pergunta {step + 1} de {PERGUNTAS.length}
                    </span>
                  </div>
                  <div className="h-1 bg-eco-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-eco-orange rounded-full transition-all duration-300"
                      style={{ width: `${(step / PERGUNTAS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Pergunta */}
                <h3 className="font-serif text-title text-eco-night mb-6">
                  {pergunta.texto}
                </h3>

                {/* Opções */}
                <div className="flex flex-col gap-3">
                  {pergunta.opcoes.map((opcao, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOption(opcao.ponto, idx)}
                      disabled={selected !== null}
                      className={[
                        'text-left px-5 py-4 border rounded-xl font-sans text-body transition-colors duration-150 cursor-pointer disabled:cursor-default',
                        selected === idx
                          ? 'border-eco-orange bg-eco-orange/10 text-eco-night'
                          : selected !== null
                          ? 'border-eco-border text-eco-night opacity-40'
                          : 'border-eco-border text-eco-night hover:border-eco-orange hover:bg-eco-orange/5',
                      ].join(' ')}
                    >
                      {opcao.texto}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Resultado */
              <div className="flex flex-col gap-6">
                <div>
                  <p className="font-mono text-label uppercase tracking-widest text-eco-orange mb-1">
                    Curso indicado para você
                  </p>
                  <h3 className="font-serif text-headline text-eco-night">{nomeCurso}</h3>
                  <p className="font-sans text-body text-eco-sky mt-3">{textoResultado}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={buildWaLink(nomeCurso)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-sans font-medium text-body bg-eco-orange text-white hover:bg-eco-orange/90 border border-eco-orange hover:border-eco-orange/90 px-6 py-3 transition-colors"
                  >
                    Falar no WhatsApp
                  </a>
                  <Link
                    href={`/cursos/${slugCurso}`}
                    className="inline-flex items-center justify-center font-sans font-medium text-body border border-eco-night text-eco-night hover:bg-eco-night hover:text-white px-6 py-3 transition-colors"
                  >
                    Saber mais sobre este curso
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={reiniciar}
                  className="self-start font-sans text-small text-eco-sky underline-offset-4 hover:underline"
                >
                  Refazer o quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
