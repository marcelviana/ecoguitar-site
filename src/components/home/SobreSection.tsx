import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { urlFor } from '@/lib/sanity'
import { sanityImg } from '@/lib/sanity-image'

const sobre = {
  titulo: 'Pedro Machado',
  subtitulo: 'Luteria',
  texto:
    'Pedro Machado dedica mais de vinte anos ao ofício da luteria, construindo instrumentos que traduzem a identidade de cada músico em madeira e corda. Formado em engenharia acústica e apaixonado pela floresta brasileira, ele combina técnica rigorosa com sensibilidade artística em cada projeto.',
}

interface SobreSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fotoPedro?: any
}

export default function SobreSection({ fotoPedro }: SobreSectionProps) {
  const imageUrl = fotoPedro ? urlFor(fotoPedro)?.url() : null

  return (
    <section id="sobre" className="bg-eco-paper py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            <div>
              <SectionLabel>{sobre.subtitulo}</SectionLabel>
              <h2 className="font-serif text-headline text-eco-charcoal mt-3">
                {sobre.titulo}
              </h2>
            </div>
            <p className="font-sans text-body-lg text-eco-muted max-w-lg">
              {sobre.texto}
            </p>
            <Link
              href="/sobre"
              className="inline-flex items-center gap-1 font-sans text-body text-eco-wood hover:underline underline-offset-4 transition-colors w-fit"
            >
              Ler mais →
            </Link>
          </div>

          {/* Image column */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-eco-wood/20 border border-eco-border rounded-2xl overflow-hidden flex items-center justify-center">
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
                  className="w-16 h-16 text-eco-wood/40"
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
