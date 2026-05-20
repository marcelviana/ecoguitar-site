'use client'

import { useState } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

const tiposInstituicao = [
  'Escola de música',
  'Estúdio',
  'Empresa',
  'ONG / projeto social',
  'Outro',
]

const modalidadesOpcoes = [
  'Sistema Leva e Traz',
  'Luteria in Loco',
  'Workshop na Escola',
  'Customizações em grupo',
  'Ainda não sei',
]

const inputClass =
  'bg-white/20 border border-white/30 rounded-lg px-4 py-3 font-sans text-body text-eco-white placeholder:text-white/50 focus:outline-none focus:border-eco-white transition-colors'

const labelClass = 'font-mono text-label uppercase tracking-widest text-white/80'

export default function ParceriasForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!FORMSPREE_ID) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-white/10 border border-white/30 p-8 text-center">
        <svg
          aria-hidden="true"
          className="mx-auto mb-4 w-12 h-12 text-eco-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-serif text-title text-eco-white mb-2">Mensagem enviada!</h3>
        <p className="font-sans text-body text-white/80">
          Obrigado pelo interesse. Retornaremos em alguns dias úteis.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 font-sans text-small text-eco-white/80 underline-offset-4 hover:underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Campo oculto para filtrar no Formspree */}
      <input type="hidden" name="origem" value="parcerias" />

      {/* Nome + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="pf-nome" className={labelClass}>
            Seu nome
          </label>
          <input
            id="pf-nome"
            name="nome"
            type="text"
            required
            placeholder="Nome completo"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pf-email" className={labelClass}>
            E-mail
          </label>
          <input
            id="pf-email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Telefone */}
      <div className="flex flex-col gap-2">
        <label htmlFor="pf-telefone" className={labelClass}>
          Telefone{' '}
          <span className="normal-case tracking-normal text-white/50">(opcional)</span>
        </label>
        <input
          id="pf-telefone"
          name="telefone"
          type="tel"
          placeholder="(11) 99999-9999"
          className={inputClass}
        />
      </div>

      {/* Instituição + Tipo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="pf-instituicao" className={labelClass}>
            Nome da instituição
          </label>
          <input
            id="pf-instituicao"
            name="instituicao"
            type="text"
            required
            placeholder="Ex: Escola de Música Viva"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pf-tipo" className={labelClass}>
            Tipo de instituição
          </label>
          <select
            id="pf-tipo"
            name="tipoInstituicao"
            required
            defaultValue=""
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>
              Selecione…
            </option>
            {tiposInstituicao.map((tipo) => (
              <option key={tipo} value={tipo} className="bg-eco-turquoise-dk text-white">
                {tipo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tamanho */}
      <div className="flex flex-col gap-2">
        <label htmlFor="pf-tamanho" className={labelClass}>
          Tamanho{' '}
          <span className="normal-case tracking-normal text-white/50">(opcional)</span>
        </label>
        <input
          id="pf-tamanho"
          name="tamanho"
          type="text"
          placeholder="Ex: 30 alunos, 8 instrumentos"
          className={inputClass}
        />
      </div>

      {/* Modalidades de interesse */}
      <fieldset className="flex flex-col gap-3">
        <legend className={labelClass}>Modalidades de interesse</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {modalidadesOpcoes.map((opcao) => (
            <label key={opcao} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="modalidades"
                value={opcao}
                className="w-4 h-4 rounded border-white/40 bg-white/10 text-eco-turquoise-dk focus:ring-eco-white focus:ring-offset-0 accent-eco-turquoise-dk"
              />
              <span className="font-sans text-small text-white/80 group-hover:text-eco-white transition-colors">
                {opcao}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Mensagem */}
      <div className="flex flex-col gap-2">
        <label htmlFor="pf-mensagem" className={labelClass}>
          Algo a mais que queira contar{' '}
          <span className="normal-case tracking-normal text-white/50">(opcional)</span>
        </label>
        <textarea
          id="pf-mensagem"
          name="mensagem"
          rows={4}
          placeholder="Conte sobre a instituição, a demanda, o momento…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="font-sans text-small text-red-200 bg-red-900/30 border border-red-400/30 rounded-lg px-4 py-3">
          Ocorreu um erro ao enviar a mensagem. Tente novamente ou entre em contato pelo WhatsApp.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center font-sans font-medium transition-colors duration-200 bg-eco-night text-eco-white hover:bg-eco-night/80 border border-eco-night hover:border-eco-night/80 px-6 py-3 text-body disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Enviando…' : 'Enviar proposta'}
        </button>
      </div>
    </form>
  )
}
