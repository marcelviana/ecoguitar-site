'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CursoListagem } from '@/lib/queries'

type Codigo = 'E' | 'I' | 'X'

const PERGUNTAS = [
  {
    texto: 'Quanto tempo você tem disponível?',
    opcoes: [
      { texto: 'Uma semana de férias', ponto: 'I' as Codigo, emoji: '🏖️' },
      { texto: 'Tenho dias ou horários fixos na semana', ponto: 'X' as Codigo, emoji: '📅' },
      { texto: 'Alguns dias concentrados', ponto: 'E' as Codigo, emoji: '⚡' },
    ],
  },
  {
    texto: 'O que você quer levar para casa?',
    opcoes: [
      { texto: 'Um instrumento completo que eu mesmo construí', ponto: 'X' as Codigo, emoji: '🎸' },
      { texto: 'Aprender uma parte específica do processo', ponto: 'E' as Codigo, emoji: '🔧' },
      { texto: 'Quero a experiência, o resultado é consequência', ponto: 'I' as Codigo, emoji: '✨' },
    ],
  },
  {
    texto: 'Você tem experiência com trabalhos manuais?',
    opcoes: [
      { texto: 'Sim, já mexi com madeira ou marcenaria', ponto: 'X' as Codigo, emoji: '🪵' },
      { texto: 'Tenho um pouco de experiência', ponto: 'I' as Codigo, emoji: '🙂' },
      { texto: 'Sou iniciante completo', ponto: 'E' as Codigo, emoji: '🌱' },
    ],
  },
  {
    texto: 'O que mais te atrai na ideia?',
    opcoes: [
      { texto: 'A experiência completa, do início ao fim', ponto: 'X' as Codigo, emoji: '🛠️' },
      { texto: 'Aprender rápido e ter um resultado concreto', ponto: 'E' as Codigo, emoji: '🎯' },
      { texto: 'Descomprimir e fazer algo diferente com as mãos', ponto: 'X' as Codigo, emoji: '🧘' },
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
  const pergunta = PERGUNTAS[step]
  const isUltimaPergunta = step === PERGUNTAS.length - 1

  function handleSelect(idx: number) {
    setSelected(idx)
  }

  function handleNext() {
    if (selected === null) return
    const ponto = pergunta.opcoes[selected].ponto
    const nextScores = { ...scores, [ponto]: scores[ponto] + 1 }

    setVisible(false)
    setTimeout(() => {
      setScores(nextScores)
      setStep((s) => s + 1)
      setSelected(null)
      setVisible(true)
    }, 200)
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

  return (
    <section className="bg-eco-white py-section border-t border-eco-border">
      <style>{`
        @keyframes quizSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .quiz-q-enter { animation: quizSlideIn 350ms ease both; }
        .quiz-opt-0 { animation: quizSlideIn 350ms ease 0ms both; }
        .quiz-opt-1 { animation: quizSlideIn 350ms ease 50ms both; }
        .quiz-opt-2 { animation: quizSlideIn 350ms ease 100ms both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Cabeçalho da seção */}
          <div className="mb-8">
            <p className="font-mono text-label uppercase tracking-widest text-eco-orange mb-2">
              Para o seu perfil
            </p>
            <h2 className="font-serif text-headline text-eco-night" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>
              Qual curso é o seu?
            </h2>
            <p className="font-sans text-body text-eco-sky mt-2">
              Quatro perguntas. Uma recomendação feita para você.
            </p>
          </div>

          {/* Card */}
          <div
            className="rounded-2xl p-8 transition-opacity duration-200"
            style={{
              opacity: visible ? 1 : 0,
              background: '#FDF6EC',
              border: '1.5px solid #F5DFB0',
            }}
          >
            {!concluido ? (
              <>
                {/* Progresso */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-label text-eco-sky">
                      Pergunta {step + 1} de {PERGUNTAS.length}
                    </span>
                  </div>
                  {/* Barra */}
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: '#EDD9B0' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${((step + 1) / PERGUNTAS.length) * 100}%`,
                        background: '#D4813A',
                        transition: 'width 0.5s cubic-bezier(.4,0,.2,1)',
                      }}
                    />
                  </div>
                  {/* Dots */}
                  <div className="flex gap-2 mt-3">
                    {PERGUNTAS.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          height: '4px',
                          borderRadius: '9999px',
                          background: i <= step ? '#D4813A' : '#EDD9B0',
                          width: i === step ? '18px' : '8px',
                          transition: 'width 0.3s ease, background 0.3s ease',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pergunta */}
                <h3 key={`q-${step}`} className="font-serif text-title text-eco-night mb-6 quiz-q-enter">
                  {pergunta.texto}
                </h3>

                {/* Opções */}
                <div className="flex flex-col gap-3 mb-8">
                  {pergunta.opcoes.map((opcao, idx) => {
                    const isSelecionada = selected === idx
                    return (
                      <button
                        key={`${step}-${idx}`}
                        type="button"
                        onClick={() => handleSelect(idx)}
                        className={`quiz-opt-${idx} text-left flex items-center gap-4 px-5 py-4 transition-all duration-200 cursor-pointer`}
                        style={{
                          borderRadius: '12px',
                          border: isSelecionada ? '1.5px solid #D4813A' : '1.5px solid #E8D5B0',
                          background: isSelecionada ? '#FFF3E0' : '#FFFDF8',
                          boxShadow: isSelecionada ? '0 0 0 3px rgba(212,129,58,0.15)' : 'none',
                          transform: isSelecionada ? 'translateX(4px)' : 'translateX(0)',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelecionada) {
                            const el = e.currentTarget
                            el.style.border = '1.5px solid #D4813A'
                            el.style.background = '#FFF8EE'
                            el.style.transform = 'translateX(3px)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelecionada) {
                            const el = e.currentTarget
                            el.style.border = '1.5px solid #E8D5B0'
                            el.style.background = '#FFFDF8'
                            el.style.transform = 'translateX(0)'
                          }
                        }}
                      >
                        {/* Emoji */}
                        <span
                          className="flex-shrink-0 flex items-center justify-center text-lg"
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: 'rgba(212,129,58,0.12)',
                          }}
                          aria-hidden="true"
                        >
                          {opcao.emoji}
                        </span>

                        {/* Texto */}
                        <span className="flex-1 font-sans text-body text-eco-night">
                          {opcao.texto}
                        </span>

                        {/* Check */}
                        <span
                          className="flex-shrink-0 flex items-center justify-center"
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            border: isSelecionada ? 'none' : '2px solid #D4B896',
                            background: isSelecionada ? '#D4813A' : 'transparent',
                            transition: 'background 0.15s ease, border 0.15s ease',
                          }}
                          aria-hidden="true"
                        >
                          {isSelecionada && (
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                              <path
                                d="M1 4L4.5 7.5L11 1"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Botão Próxima / Ver resultado */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={selected === null}
                    className="font-sans font-medium text-body text-white px-8 py-3 rounded-xl transition-opacity duration-150"
                    style={{
                      background: '#1E2D3A',
                      opacity: selected === null ? 0.4 : 1,
                      pointerEvents: selected === null ? 'none' : 'auto',
                    }}
                  >
                    {isUltimaPergunta ? 'Ver resultado' : 'Próxima'}
                  </button>
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
