import Link from 'next/link'
import Image from 'next/image'
import { getConfiguracao } from '@/lib/queries'

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Clube do Luthier', href: '/clube' },
  { label: 'Contato', href: '/contato' },
]

const EMAIL_FALLBACK = 'contato@ecoguitar.com.br'

export default async function Footer() {
  const config = await getConfiguracao()
  const waLink = config?.whatsapp ? `https://wa.me/${config.whatsapp}` : null
  const email = config?.email ?? EMAIL_FALLBACK
  const igUrl = config?.instagram ? `https://instagram.com/${config.instagram.replace(/^@/, '')}` : null
  const ytUrl = config?.youtube ?? null
  return (
    <footer className="bg-eco-charcoal text-eco-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-section-sm lg:py-16">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-6">
            <Image
              src="/logo.png"
              alt="Eco Guitar"
              width={54}
              height={40}
              className="[filter:invert(1)] [mix-blend-mode:screen]"
            />
            <p className="font-serif text-body-lg text-eco-muted leading-relaxed">
              A sua guitarra é tão única quanto o som que você faz.
            </p>
            <div className="flex gap-4">
              {igUrl && (
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Eco Guitar no Instagram"
                  className="text-eco-muted hover:text-eco-cream transition-colors"
                >
                  <InstagramIcon />
                </a>
              )}
              {ytUrl && (
                <a
                  href={ytUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Eco Guitar no YouTube"
                  className="text-eco-muted hover:text-eco-cream transition-colors"
                >
                  <YouTubeIcon />
                </a>
              )}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-label tracking-widest uppercase text-eco-muted">
              Navegação
            </span>
            <nav aria-label="Rodapé — navegação">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-small text-eco-muted hover:text-eco-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-label tracking-widest uppercase text-eco-muted">
              Contato
            </span>
            <ul className="flex flex-col gap-3 text-eco-muted">
              {config?.endereco && (
                <li className="font-sans text-small leading-relaxed">
                  {config.endereco}
                </li>
              )}
              {waLink && (
                <li>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-small hover:text-eco-cream transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${email}`}
                  className="font-sans text-small hover:text-eco-cream transition-colors"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-eco-charcoal/50 border-white/10">
          <p className="font-mono text-label text-eco-muted">
            © 2025 Eco Guitar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}
