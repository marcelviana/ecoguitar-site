import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'configuracao',
  title: 'Configurações',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
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
  ],
})
