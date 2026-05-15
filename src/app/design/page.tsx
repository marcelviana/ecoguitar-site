import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionHeading from '@/components/ui/SectionHeading'
import CategoryBadge from '@/components/ui/CategoryBadge'

const colors = [
  { name: 'eco-sand-light', hex: '#FFF8EE', bg: 'bg-eco-sand-light', dark: false },
  { name: 'eco-sand-warm', hex: '#FFE9C2', bg: 'bg-eco-sand-warm', dark: false },
  { name: 'eco-night', hex: '#2B3A4A', bg: 'bg-eco-night', dark: true },
  { name: 'eco-sky', hex: '#6B8FA8', bg: 'bg-eco-sky', dark: true },
  { name: 'eco-ink', hex: '#4A6378', bg: 'bg-eco-ink', dark: true },
  { name: 'eco-turquoise', hex: '#1AACAC', bg: 'bg-eco-turquoise', dark: true },
  { name: 'eco-turquoise-dk', hex: '#0D7A7A', bg: 'bg-eco-turquoise-dk', dark: true },
  { name: 'eco-turquoise-lt', hex: '#E2F6F6', bg: 'bg-eco-turquoise-lt', dark: false },
  { name: 'eco-border', hex: '#E8D9BF', bg: 'bg-eco-border', dark: false },
  { name: 'eco-white', hex: '#FFFDF8', bg: 'bg-eco-white', dark: false },
  { name: 'eco-orange', hex: '#E8552E', bg: 'bg-eco-orange', dark: true },
  { name: 'eco-sun', hex: '#F5C842', bg: 'bg-eco-sun', dark: false },
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
          <h1 className="font-mono text-label uppercase tracking-widest text-eco-sky mb-2">
            Design System
          </h1>
          <p className="font-serif text-headline text-eco-night">Eco Guitar — Fundação Visual</p>
        </div>

        {/* ── Color Tokens ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-sky mb-8">
            01 — Cores
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col gap-2">
                <div
                  className={`${c.bg} h-20 border border-eco-border/50`}
                />
                <div>
                  <p className="font-mono text-label text-eco-night">{c.name}</p>
                  <p className="font-mono text-label text-eco-sky">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Type Scale ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-sky mb-8">
            02 — Tipografia
          </h2>
          <div className="flex flex-col gap-10">
            {typeScale.map((t) => (
              <div key={t.label} className="flex flex-col gap-1 border-b border-eco-border pb-8">
                <span className="font-mono text-label text-eco-sky mb-2">{t.label}</span>
                <p className={`${t.className} text-eco-night`}>{t.sample}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Buttons ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-sky mb-8">
            03 — Botões
          </h2>

          {/* Variants */}
          <div className="flex flex-col gap-8">
            {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
              <div key={variant} className="flex flex-col gap-3">
                <span className="font-mono text-label text-eco-sky">{variant}</span>
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
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-sky mb-8">
            04 — Section Heading
          </h2>
          <div className="flex flex-col gap-16">
            <div>
              <span className="font-mono text-label text-eco-sky block mb-6">Com label — alinhado à esquerda</span>
              <SectionHeading
                label="NOSSOS CURSOS"
                title="Aprenda a construir seu próprio instrumento"
                subtitle="Do zero ao instrumento acabado. Pedro Machado guia cada etapa do processo, do corte da madeira à afinação final."
                align="left"
              />
            </div>
            <div>
              <span className="font-mono text-label text-eco-sky block mb-6">Sem label — centralizado</span>
              <SectionHeading
                title="Galeria de Instrumentos"
                subtitle="Cada peça é única. Feita à mão, com amor e precisão."
                align="center"
              />
            </div>
            <div>
              <span className="font-mono text-label text-eco-sky block mb-6">Só título — à esquerda</span>
              <SectionHeading
                title="Depoimentos"
                align="left"
              />
            </div>
          </div>
        </section>

        {/* ── SectionLabel ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-sky mb-8">
            05 — Section Label
          </h2>
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-label text-eco-sky block mb-4">Sobre fundo claro (eco-sand-light)</span>
              <div className="bg-eco-sand-light px-8 py-6 flex flex-col gap-3 border border-eco-border">
                <SectionLabel>NOSSOS CURSOS</SectionLabel>
                <SectionLabel>GALERIA</SectionLabel>
                <SectionLabel>DEPOIMENTOS</SectionLabel>
              </div>
            </div>
            <div>
              <span className="font-mono text-label text-eco-sky block mb-4">Sobre fundo escuro (eco-night)</span>
              <div className="bg-eco-night px-8 py-6 flex flex-col gap-3">
                <SectionLabel>CLUBE DO LUTHIER</SectionLabel>
                <SectionLabel>CURSOS E WORKSHOPS</SectionLabel>
                <SectionLabel>SOBRE O PROJETO</SectionLabel>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <span className="font-mono text-label text-eco-sky block mb-4">Variantes tone</span>
            <div className="flex flex-col gap-4">
              <div className="bg-eco-sand-light p-4 rounded-lg flex flex-col gap-2">
                <SectionLabel tone="orange">Tom orange (padrão)</SectionLabel>
                <SectionLabel tone="turquoise">Tom turquoise</SectionLabel>
                <SectionLabel tone="sun">Tom sun</SectionLabel>
              </div>
              <div className="bg-eco-night p-4 rounded-lg flex flex-col gap-2">
                <SectionLabel tone="sand">Tom sand (sobre fundo escuro)</SectionLabel>
              </div>
            </div>
          </div>
        </section>

        {/* ── Spacing ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-sky mb-8">
            06 — Espaçamento de Seção
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-4 bg-eco-turquoise" style={{ height: '7rem' }} />
              <div>
                <p className="font-mono text-label text-eco-night">section</p>
                <p className="font-mono text-label text-eco-sky">7rem — py-section</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 bg-eco-turquoise/50" style={{ height: '4rem' }} />
              <div>
                <p className="font-mono text-label text-eco-night">section-sm</p>
                <p className="font-mono text-label text-eco-sky">4rem — py-section-sm</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Badges ── */}
        <section className="mb-20">
          <h2 className="font-mono text-label uppercase tracking-widest text-eco-sky mb-8">
            07 — Badges
          </h2>
          <div className="flex flex-col gap-10">

            {/* Variante turquoise */}
            <div>
              <span className="font-mono text-label text-eco-sky block mb-4">
                turquoise — uso atual (categorias de modelo)
              </span>
              <div className="flex flex-wrap gap-2">
                {['baixo', 'guitarra', '7 cordas', 'multiescala', 'thinline'].map((label) => (
                  <CategoryBadge key={label} label={label} variant="turquoise" />
                ))}
              </div>
            </div>

            {/* Variante sun */}
            <div>
              <span className="font-mono text-label text-eco-sky block mb-4">
                sun — hero do detalhe do instrumento (fundo escuro)
              </span>
              <div className="bg-eco-night rounded-xl px-5 py-4 flex flex-wrap gap-2">
                {['baixo', 'guitarra', '7 cordas', 'multiescala', 'thinline'].map((label) => (
                  <CategoryBadge key={label} label={label} variant="sun" />
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </PageLayout>
  )
}
