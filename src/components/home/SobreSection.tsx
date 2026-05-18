import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { urlFor } from '@/lib/sanity'
import { sanityImg } from '@/lib/sanity-image'

const stats = [
  { value: '+150', label: 'cursos ministrados' },
  { value: '+300', label: 'alunos formados' },
  { value: 'Turmas', label: 'de até 4 pessoas' },
]

interface SobreSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fotoPedro?: any
}

export default function SobreSection({ fotoPedro }: SobreSectionProps) {
  const imageUrl = fotoPedro ? urlFor(fotoPedro)?.url() : null

  return (
    <section id="sobre" className="bg-eco-sand-warm py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            <div>
              <SectionLabel>Luteria artesanal</SectionLabel>
              <h2 className="font-serif text-headline text-eco-night mt-3">
                Pedro Machado
              </h2>
            </div>
            <p className="font-sans text-body-lg text-eco-ink max-w-lg">
              Há mais de 20 anos Pedro Machado constrói instrumentos que carregam a identidade de quem os toca. Fundador da Eco Guitar, ele é referência em madeiras brasileiras e precursor dos cursos Express de luteria no país — onde qualquer pessoa pode construir o próprio instrumento do zero.
            </p>

            {/* Social proof */}
            <div className="flex flex-wrap gap-6">
              {stats.map((stat) => (
                <div key={stat.value} className="flex flex-col gap-0.5">
                  <span className="font-mono text-label uppercase tracking-widest text-eco-night">
                    {stat.value}
                  </span>
                  <span className="font-sans text-small text-eco-ink">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Parceiros */}
            <p className="font-mono text-label uppercase tracking-widest text-eco-ink">
              Parceiros: School of Rock · Equilibrium · Santa Cruz
            </p>

            <Link
              href="/sobre"
              className="inline-flex items-center gap-1 font-sans text-body text-eco-turquoise-dk hover:underline underline-offset-4 transition-colors w-fit"
            >
              Ler mais →
            </Link>
          </div>

          {/* Image column */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-eco-turquoise-lt border border-eco-border rounded-2xl overflow-hidden flex items-center justify-center">
              {imageUrl ? (
                <Image
                  src={sanityImg(imageUrl, 900)}
                  alt="Pedro Machado"
                  fill
                  className="object-cover"
                />
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-16 h-16 text-eco-turquoise/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
