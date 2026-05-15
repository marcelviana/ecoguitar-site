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

export default function QuizCurso({
  cursos,
  showCoursesLink,
}: {
  cursos: CursoListagem[]
  showCoursesLink?: boolean
}) {
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
    <section className="bg-eco-night py-section border-t border-eco-border/20">
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
            <h2 className="font-serif text-headline text-eco-sand-light" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>
              Qual curso é o seu?
            </h2>
            <p className="font-sans text-body text-eco-sky mt-2">
              Quatro perguntas. Uma recomendação feita para você.
            </p>
          </div>

          {/* Card */}
          <div
            className="bg-eco-sand-warm border border-eco-border rounded-2xl p-8 transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {!concluido ? (
              <>
                {/* Progresso */}
                <div className="mb-8 flex items-center gap-3">
                  <span className="font-mono text-label text-eco-ink shrink-0">
                    Pergunta {step + 1} de {PERGUNTAS.length}
                  </span>
                  <div
                    className="bg-eco-border overflow-hidden"
                    style={{ flex: 1, height: '4px', borderRadius: '99px' }}
                  >
                    <div
                      className="bg-eco-orange h-full"
                      style={{
                        width: `${(selected !== null ? step + 1 : step) / PERGUNTAS.length * 100}%`,
                        borderRadius: '99px',
                        transition: 'width 0.5s cubic-bezier(.4,0,.2,1)',
                      }}
                    />
                  </div>
                </div>

                {/* Pergunta */}
                <h3 key={`q-${step}`} className="font-serif text-title text-eco-night mb-6 quiz-q-enter">
                  {pergunta.texto}
                </h3>

                {/* Opções */}
                <div className="flex flex-col gap-3 mb-6">
                  {pergunta.opcoes.map((opcao, idx) => {
                    const isSelecionada = selected === idx
                    return (
                      <button
                        key={`${step}-${idx}`}
                        type="button"
                        onClick={() => handleSelect(idx)}
                        className={[
                          `quiz-opt-${idx} text-left flex items-center gap-4 px-5 py-4 cursor-pointer rounded-xl border`,
                          isSelecionada
                            ? 'bg-eco-sand-warm border-eco-orange'
                            : 'bg-eco-white border-eco-border hover:border-eco-orange hover:bg-eco-sand-warm/60 hover:translate-x-[3px]',
                        ].join(' ')}
                        style={{
                          borderWidth: '1.5px',
                          boxShadow: isSelecionada ? '0 0 0 3px rgba(212,129,58,0.15)' : 'none',
                          transform: isSelecionada ? 'translateX(4px)' : undefined,
                          transition: 'transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease',
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
                          className={[
                            'flex-shrink-0 flex items-center justify-center w-[22px] h-[22px] rounded-full',
                            isSelecionada
                              ? 'bg-eco-orange'
                              : 'bg-transparent border-2 border-eco-border',
                          ].join(' ')}
                          style={{ transition: 'background 0.15s ease, border-color 0.15s ease' }}
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

                {/* Rodapé: dots + botão */}
                <div className="flex items-center justify-between">
                  {/* Dots */}
                  <div className="flex gap-2">
                    {PERGUNTAS.map((_, i) => (
                      <div
                        key={i}
                        className={i <= step ? 'bg-eco-orange' : 'bg-eco-border'}
                        style={{
                          height: '4px',
                          borderRadius: '9999px',
                          width: i === step ? '18px' : '8px',
                          transition: 'width 0.3s ease, background-color 0.3s ease',
                        }}
                      />
                    ))}
                  </div>
                  {/* Botão */}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={selected === null}
                    className={[
                      'font-sans font-medium rounded-full',
                      selected === null
                        ? 'border border-eco-border text-eco-ink opacity-50 cursor-not-allowed'
                        : 'bg-eco-night text-white border border-eco-night cursor-pointer',
                    ].join(' ')}
                    style={{
                      fontSize: '14px',
                      padding: '11px 24px',
                      borderWidth: '1.5px',
                      transition: 'all 0.18s ease',
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
                  <p className="font-sans text-body text-eco-ink mt-3">{textoResultado}</p>
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
                  className="self-start font-sans text-small text-eco-ink underline-offset-4 hover:underline"
                >
                  Refazer o quiz
                </button>
              </div>
            )}
          </div>

          {/* Link para página de cursos — exibido apenas quando showCoursesLink=true */}
          {showCoursesLink && (
            <div className="text-center mt-6">
              <Link
                href="/cursos"
                className="font-sans text-small text-eco-sky hover:text-eco-night underline-offset-4 hover:underline transition-colors"
              >
                Prefere ver todos os cursos →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
