import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import SectionLabel from '@/components/ui/SectionLabel'
import ContatoForm from '@/components/contato/ContatoForm'
import { getConfiguracao } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Contato — Eco Guitar',
  description: 'Entre em contato com a Eco Guitar para tirar dúvidas, agendar uma visita ou se inscrever em um curso.',
}

export default async function ContatoPage() {
  const config = await getConfiguracao()
  const waLink = config?.whatsapp ? `https://wa.me/${config.whatsapp}` : 'https://wa.me/5511999999999'
  const igHandle = config?.instagram ? config.instagram.replace(/^@/, '') : 'ecoguitar'
  const igUrl = `https://instagram.com/${igHandle}`
  return (
    <PageLayout>
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Info */}
            <div className="flex flex-col gap-8">
              <div>
                <SectionLabel>Fale conosco</SectionLabel>
                <h1 className="font-serif text-headline text-eco-night mt-3">Contato</h1>
                <p className="font-sans text-body-lg text-eco-sky mt-4">
                  Tem dúvidas sobre os cursos, quer encomendar um instrumento ou simplesmente quer
                  conhecer o ateliê? Envie uma mensagem e Pedro responde em breve.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-eco-turquoise/10 flex items-center justify-center">
                    <svg aria-hidden="true" className="w-5 h-5 text-eco-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-label uppercase tracking-widest text-eco-sky">Localização</p>
                    <p className="font-sans text-body text-eco-night mt-1">São Paulo — SP</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-eco-turquoise/10 flex items-center justify-center">
                    <svg aria-hidden="true" className="w-5 h-5 text-eco-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-label uppercase tracking-widest text-eco-sky">Instagram</p>
                    <a
                      href={igUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-body text-eco-turquoise hover:underline underline-offset-4 mt-1 inline-block"
                    >
                      @{igHandle}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-eco-turquoise/10 flex items-center justify-center">
                    <svg aria-hidden="true" className="w-5 h-5 text-eco-turquoise" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.051 23.925a.5.5 0 00.611.625l6.278-1.643A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 11.999 0zm0 21.818a9.808 9.808 0 01-5.031-1.386l-.36-.214-3.733.977.996-3.635-.235-.374A9.818 9.818 0 012.182 12c0-5.413 4.405-9.818 9.817-9.818 5.413 0 9.818 4.405 9.818 9.818 0 5.413-4.405 9.818-9.818 9.818z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-label uppercase tracking-widest text-eco-sky">WhatsApp</p>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-body text-eco-turquoise hover:underline underline-offset-4 mt-1 inline-block"
                    >
                      Chamar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div className="bg-eco-sand-warm border border-eco-border rounded-2xl p-8 lg:p-10">
              <ContatoForm />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
