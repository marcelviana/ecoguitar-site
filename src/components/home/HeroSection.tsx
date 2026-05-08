import Image from 'next/image'
import Button from '@/components/ui/Button'
import { urlFor } from '@/lib/sanity'

interface HeroSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroBannerImagem?: any
}

export default function HeroSection({ heroBannerImagem }: HeroSectionProps) {
  const imageUrl = heroBannerImagem ? urlFor(heroBannerImagem)?.url() : null

  return (
    <section className="relative min-h-screen flex items-center bg-eco-charcoal overflow-hidden">
      {/* Noise texture overlay */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-eco-charcoal via-eco-charcoal to-eco-wood-dark opacity-90"
        />
      )}

      {/* Dark overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-eco-charcoal/60" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <div className="max-w-3xl">
          <p className="font-mono text-label uppercase tracking-widest text-eco-wood mb-6">
            Lutheria Artesanal
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-eco-cream leading-[1.05] tracking-[-0.02em] mb-6">
            Instrumentos feitos com alma, madeira e tempo
          </h1>
          <p className="font-sans text-body-lg text-eco-cream/75 max-w-xl mb-10">
            Guitarras e violões artesanais criados por Pedro Machado em São Paulo. Cada instrumento é único, do projeto ao acabamento.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/instrumentos" variant="primary" size="lg">
              Ver instrumentos
            </Button>
            <Button
              href="/#sobre"
              variant="secondary"
              size="lg"
              className="border-eco-cream/40 text-eco-cream hover:bg-eco-cream hover:text-eco-charcoal"
            >
              Conheça o Pedro
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
