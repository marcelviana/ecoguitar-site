import Image from 'next/image'
import Button from '@/components/ui/Button'
import { urlFor } from '@/lib/sanity'
import { sanityImg } from '@/lib/sanity-image'

interface HeroSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroBannerImagem?: any
}

export default function HeroSection({ heroBannerImagem }: HeroSectionProps) {
  const imageUrl = heroBannerImagem ? urlFor(heroBannerImagem)?.url() : null

  return (
    <section className="relative min-h-screen flex items-center bg-eco-night overflow-hidden">
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
          src={sanityImg(imageUrl, 1600)}
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-eco-night via-eco-night to-eco-turquoise-dk opacity-90"
        />
      )}

      {/* Dark overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-eco-night/60" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <div className="max-w-3xl">
          <p className="font-mono text-label uppercase tracking-widest text-eco-sand-light mb-6 inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            Luteria Artesanal
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-eco-sand-light leading-[1.05] tracking-[-0.02em] mb-6">
            A sua guitarra é tão única quanto o som que você faz.
          </h1>
          <p className="font-sans text-body-lg text-eco-sand-light/75 max-w-xl mb-10">
            Instrumentos construídos sob medida por Pedro Machado em São Paulo. Do projeto ao acabamento, cada peça carrega a identidade de quem vai tocá-la.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/galeria" variant="primary" size="lg">
              Ver instrumentos
            </Button>
            <Button
              href="/#sobre"
              variant="secondary"
              size="lg"
              className="border-eco-sand-light/40 text-eco-sand-light hover:bg-eco-sand-light hover:text-eco-night"
            >
              Conheça o Pedro
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
