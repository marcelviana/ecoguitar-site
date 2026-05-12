import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionHeading from '@/components/ui/SectionHeading'

const colors = [
  { name: 'eco-cream', hex: '#F5F0E8', bg: 'bg-eco-cream', dark: false },
  { name: 'eco-paper', hex: '#EDE7D9', bg: 'bg-eco-paper', dark: false },
  { name: 'eco-charcoal', hex: '#1C1917', bg: 'bg-eco-charcoal', dark: true },
  { name: 'eco-muted', hex: '#78716C', bg: 'bg-eco-muted', dark: true },
  { name: 'eco-wood', hex: '#8B5E3C', bg: 'bg-eco-wood', dark: true },
  { name: 'eco-wood-dark', hex: '#6B4423', bg: 'bg-eco-wood-dark', dark: true },
  { name: 'eco-border', hex: '#D6CFC4', bg: 'bg-eco-border', dark: false },
  { name: 'eco-white', hex: '#FDFAF6', bg: 'bg-eco-white', dark: false },
  { name: 'eco-orange', hex: '#E8552E', bg: 'bg-eco-orange', dark: true },
]

const typeScale = [
  { label: 'Display', className: 'font-serif text-display', sample: 'Lutheria' },
  { label: 'Headline', className: 'font-serif text-headline', sample: 'Artesanato em madeira' },
  { label: 'Title', className: 'font-serif text-title', sample: 'Cursos e Workshops' },
  { label: 'Body LG', className: 'font-sans text-body-lg', sample: 'Cada instrumento conta uma história única, moldada pelas mãos do luthier.' },
  { label: 'Body', className: 'font-sans text-body', sample: 'Cada instrumento conta uma história única, moldada pelas mãos do luthier.' },
  { label: 'Small', className: 'font-sans text-small', sample: 'Cada instrumento conta uma história única, moldada pelas mãos do luthier.' },
  { label: 'Label', className: 'font-mono text-label uppercase tracking-widest', sample: 'NOSSOS CURSOS' },
  { label: 'Josefin', className: 'font-josefin text-title uppercase tracking-widest', sample: 'Eco Guitar' },
]

export default function DesignPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-section">

        {/* Header */}
        <div className="mb-20 border-b border-eco-border pb-8">
          <h1 className="font-mono text-label uppercase tracking-widest text-eco-muted mb-2">
            Design System
          </h1>
          <p className="font-serif text-headline text-eco-charcoal">Eco Guitar — Fundação Visual</p>
        </div>

        {/* ── Color Tokens ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-muted mb-8">
            01 — Cores
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div
                  className={`${c.bg} h-20 border border-eco-border/50`}
                />
                <div>
                  <p className="font-mono text-label text-eco-charcoal">{c.name}</p>
                  <p className="font-mono text-label text-eco-muted">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Type Scale ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-muted mb-8">
            02 — Tipografia
          </h2>
          <div className="flex flex-col gap-10">
            {typeScale.map((t) => (
              <div key={t.label} className="flex flex-col gap-1 border-b border-eco-border pb-8">
                <span className="font-mono text-label text-eco-muted mb-2">{t.label}</span>
                <p className={`${t.className} text-eco-charcoal`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Buttons ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-muted mb-8">
            03 — Botões
          </h2>

          {/* Variants */}
          <div className="flex flex-col gap-8">
            {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
              <div key={variant} className="flex flex-col gap-3">
                <span className="font-mono text-label text-eco-muted">{variant}</span>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant={variant} size="sm" href="#">Tamanho SM</Button>
                  <Button variant={variant} size="md" href="#">Tamanho MD</Button>
                  <Button variant={variant} size="lg" href="#">Tamanho LG</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SectionHeading ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-muted mb-8">
            04 — Section Heading
          </h2>
          <div className="flex flex-col gap-16">
            <div>
              <span className="font-mono text-label text-eco-muted block mb-6">Com label — alinhado à esquerda</span>
              <SectionHeading
                label="NOSSOS CURSOS"
                title="Aprenda a construir seu próprio instrumento"
                subtitle="Do zero ao instrumento acabado. Pedro Machado guia cada etapa do processo, do corte da madeira à afinação final."
                align="left"
              />
            </div>
            <div>
              <span className="font-mono text-label text-eco-muted block mb-6">Sem label — centralizado</span>
              <SectionHeading
                title="Galeria de Instrumentos"
                subtitle="Cada peça é única. Feita à mão, com amor e precisão."
                align="center"
              />
            </div>
            <div>
              <span className="font-mono text-label text-eco-muted block mb-6">Só título — à esquerda</span>
              <SectionHeading
                title="Depoimentos"
                align="left"
              />
            </div>
          </div>
        </section>

        {/* ── SectionLabel ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-muted mb-8">
            05 — Section Label
          </h2>
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-label text-eco-muted block mb-4">Sobre fundo claro (eco-cream)</span>
              <div className="bg-eco-cream px-8 py-6 flex flex-col gap-3 border border-eco-border">
                <SectionLabel>NOSSOS CURSOS</SectionLabel>
                <SectionLabel>GALERIA</SectionLabel>
                <SectionLabel>DEPOIMENTOS</SectionLabel>
              </div>
            </div>
            <div>
              <span className="font-mono text-label text-eco-muted block mb-4">Sobre fundo escuro (eco-charcoal)</span>
              <div className="bg-eco-charcoal px-8 py-6 flex flex-col gap-3">
                <SectionLabel>CLUBE DO LUTHIER</SectionLabel>
                <SectionLabel>CURSOS E WORKSHOPS</SectionLabel>
                <SectionLabel>SOBRE O PROJETO</SectionLabel>
              </div>
            </div>
          </div>
        </section>

        {/* ── Spacing ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-muted mb-8">
            06 — Espaçamento de Seção
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-4 bg-eco-wood" style={{ height: '7rem' }} />
              <div>
                <p className="font-mono text-label text-eco-charcoal">section</p>
                <p className="font-mono text-label text-eco-muted">7rem — py-section</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 bg-eco-wood/50" style={{ height: '4rem' }} />
              <div>
                <p className="font-mono text-label text-eco-charcoal">section-sm</p>
                <p className="font-mono text-label text-eco-muted">4rem — py-section-sm</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  )
}
