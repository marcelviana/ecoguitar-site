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
      name: 'fotoPedro',
      title: 'Foto do Pedro',
      type: 'image',
      description: 'Retrato do Pedro Machado exibido na seção "Sobre" da home.',
      options: { hotspot: true },
    }),
  ],
})
