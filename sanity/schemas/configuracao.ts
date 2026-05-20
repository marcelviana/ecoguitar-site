import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'configuracao',
  title: 'Configurações',
  type: 'document',
  fields: [
    defineField({
      name: 'endereco',
      title: 'Endereço',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
    }),
    defineField({
      name: 'heroBannerImagem',
      title: 'Imagem de Fundo do Hero',
      type: 'image',
      description: 'Imagem de fundo exibida na seção hero da home (tela inicial).',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroBannerCursos',
      title: 'Hero — Cursos (imagem de fundo)',
      type: 'image',
      description: 'Imagem de fundo do hero da página /cursos. Opcional.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroBannerWorkshops',
      title: 'Hero — Workshops (imagem de fundo)',
      type: 'image',
      description: 'Imagem de fundo do hero da página /workshops. Opcional.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroBannerGaleria',
      title: 'Hero — Galeria (imagem de fundo)',
      type: 'image',
      description: 'Imagem de fundo do hero da página /galeria. Opcional.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroBannerContato',
      title: 'Hero — Contato (imagem de fundo)',
      type: 'image',
      description: 'Imagem de fundo do hero da página /contato. Opcional.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroBannerServicos',
      title: 'Hero — Serviços (imagem de fundo)',
      type: 'image',
      description: 'Imagem de fundo do hero da página /servicos. Opcional.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroBannerParcerias',
      title: 'Hero — Parcerias (imagem de fundo)',
      type: 'image',
      description: 'Imagem de fundo do hero da página /parcerias. Opcional.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fotoPedro',
      title: 'Foto do Pedro',
      type: 'image',
      description: 'Retrato do Pedro Machado exibido na seção "Sobre" da home.',
      options: { hotspot: true },
    }),
  ],
})
