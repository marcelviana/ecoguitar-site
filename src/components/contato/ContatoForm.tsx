'use client'

import { useState } from 'react'
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

export default function ContatoForm() {
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
      <div className="rounded-xl bg-eco-wood/10 border border-eco-wood/30 p-8 text-center">
        <svg
          aria-hidden="true"
          className="mx-auto mb-4 w-12 h-12 text-eco-wood"
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
        <h3 className="font-serif text-title text-eco-charcoal mb-2">Mensagem enviada!</h3>
        <p className="font-sans text-body text-eco-muted">
          Obrigado pelo contato. Pedro responderá em breve.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 font-sans text-small text-eco-wood underline-offset-4 hover:underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="font-mono text-label uppercase tracking-widest text-eco-muted">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            placeholder="Seu nome completo"
            className="bg-eco-white border border-eco-border rounded-lg px-4 py-3 font-sans text-body text-eco-charcoal placeholder:text-eco-muted/50 focus:outline-none focus:border-eco-wood transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-mono text-label uppercase tracking-widest text-eco-muted">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            className="bg-eco-white border border-eco-border rounded-lg px-4 py-3 font-sans text-body text-eco-charcoal placeholder:text-eco-muted/50 focus:outline-none focus:border-eco-wood transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="telefone" className="font-mono text-label uppercase tracking-widest text-eco-muted">
          Telefone <span className="normal-case tracking-normal text-eco-muted/60">(opcional)</span>
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          placeholder="(11) 99999-9999"
          className="bg-eco-white border border-eco-border rounded-lg px-4 py-3 font-sans text-body text-eco-charcoal placeholder:text-eco-muted/50 focus:outline-none focus:border-eco-wood transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mensagem" className="font-mono text-label uppercase tracking-widest text-eco-muted">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={5}
          placeholder="Como posso te ajudar?"
          className="bg-eco-white border border-eco-border rounded-lg px-4 py-3 font-sans text-body text-eco-charcoal placeholder:text-eco-muted/50 focus:outline-none focus:border-eco-wood transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="font-sans text-small text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          Ocorreu um erro ao enviar a mensagem. Tente novamente ou entre em contato pelo WhatsApp.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center font-sans font-medium transition-colors duration-200 bg-eco-orange text-white hover:bg-eco-orange/90 border border-eco-orange hover:border-eco-orange/90 px-6 py-3 text-body disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Enviando…' : 'Enviar mensagem'}
        </button>
      </div>
    </form>
  )
}
