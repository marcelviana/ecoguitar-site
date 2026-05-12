'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Clube do Luthier', href: '/clube' },
  { label: 'Contato', href: '/contato' },
]

const WA_LINK = 'https://wa.me/55XXXXXXXXXXX'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-eco-cream shadow-sm border-b border-eco-border'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Eco Guitar — página inicial"
            className="flex items-center gap-3"
          >
            <Image
              src="/logo.png"
              alt=""
              width={54}
              height={40}
              priority
              className="[mix-blend-mode:multiply]"
            />
            <span className="font-[family-name:var(--font-josefin)] font-light text-xl tracking-[0.15em] uppercase text-eco-charcoal">
              Eco Guitar
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-small text-eco-charcoal hover:text-eco-wood transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-eco-orange text-white text-small font-medium px-5 py-2.5 hover:bg-eco-orange/90 transition-colors"
          >
            <WhatsAppIcon />
            Fale pelo WhatsApp
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 text-eco-charcoal"
            aria-label="Abrir menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-eco-charcoal/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={[
          'fixed top-0 right-0 bottom-0 z-50 w-72 bg-eco-cream flex flex-col lg:hidden',
          'transform transition-transform duration-300 ease-in-out',
          menuOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        aria-modal="true"
        role="dialog"
        aria-label="Menu de navegação"
      >
        <div className="flex items-center justify-between px-6 h-18 border-b border-eco-border">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt=""
              width={54}
              height={40}
              className="[mix-blend-mode:multiply]"
            />
            <span className="font-[family-name:var(--font-josefin)] font-light text-xl tracking-[0.15em] uppercase text-eco-charcoal">
              Eco Guitar
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="p-2 text-eco-charcoal"
            aria-label="Fechar menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6 py-8 flex-1" aria-label="Menu mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-body text-eco-charcoal hover:text-eco-wood py-3 border-b border-eco-border/50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-8">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-eco-orange text-white text-small font-medium px-5 py-3 hover:bg-eco-orange/90 transition-colors"
          >
            <WhatsAppIcon />
            Fale pelo WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
