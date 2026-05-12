import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'processo',
  title: 'Processo de Construção',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'imagem',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'ordem',
    },
  },
})
