const WHATSAPP_URL = 'https://wa.me/5511976947027'

interface PrecoCardProps {
  preco?: string
  precoIndividual?: number
  maxAlunos?: number
  duracao?: string
  horarios?: string
  oQueEstaIncluido?: string[]
  oQueNaoEstaIncluido?: string[]
}

export default function PrecoCard({
  preco,
  precoIndividual,
  maxAlunos,
  duracao,
  horarios,
  oQueEstaIncluido,
  oQueNaoEstaIncluido,
}: PrecoCardProps) {
  const incluidos = oQueEstaIncluido ?? []
  const naoIncluidos = oQueNaoEstaIncluido ?? []
  return (
    <div className="bg-eco-night rounded-2xl overflow-hidden">
      <div className="p-8 lg:p-10">
        {preco && (
          <div className="mb-6">
            <p className="font-mono text-label uppercase tracking-widest text-eco-sky mb-1">
              Investimento
            </p>
            <p className="font-mono text-display text-eco-white leading-none">
              {preco}
            </p>
            <p className="font-sans text-small text-eco-sky mt-1">turma compartilhada</p>
            {precoIndividual && (
              <p className="font-sans text-small text-eco-sky mt-0.5">
                Individual: R$ {precoIndividual.toLocaleString('pt-BR')}
              </p>
            )}
          </div>
        )}

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {duracao && (
            <div>
              <dt className="font-mono text-label uppercase tracking-widest text-eco-sky">Duração</dt>
              <dd className="font-sans text-small text-eco-white mt-0.5">{duracao}</dd>
            </div>
          )}
          {horarios && (
            <div>
              <dt className="font-mono text-label uppercase tracking-widest text-eco-sky">Horário</dt>
              <dd className="font-sans text-small text-eco-white mt-0.5">{horarios}</dd>
            </div>
          )}
          {maxAlunos && (
            <div>
              <dt className="font-mono text-label uppercase tracking-widest text-eco-sky">Turma</dt>
              <dd className="font-sans text-small text-eco-white mt-0.5">Máx. {maxAlunos} alunos/professor</dd>
            </div>
          )}
        </dl>

        {incluidos.length > 0 && (
          <div className="mb-6">
            <p className="font-mono text-label uppercase tracking-widest text-eco-sky mb-3">
              Incluso
            </p>
            <ul className="flex flex-col gap-2">
              {incluidos.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-eco-turquoise flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-sans text-small text-eco-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {naoIncluidos.length > 0 && (
          <div className="mb-8">
            <p className="font-mono text-label uppercase tracking-widest text-eco-sky mb-3">
              Não incluso
            </p>
            <ul className="flex flex-col gap-2">
              {naoIncluidos.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg
                    className="w-4 h-4 text-eco-sky flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-sans text-small text-eco-sky">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full font-sans font-medium transition-colors duration-200 bg-eco-turquoise text-white hover:bg-eco-turquoise-dk px-6 py-4 text-body"
        >
          Quero me inscrever
        </a>
      </div>
    </div>
  )
}
