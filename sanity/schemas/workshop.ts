import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'workshop',
  title: 'Workshops',
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
      name: 'data',
      title: 'Data',
      type: 'datetime',
    }),
    defineField({
      name: 'vagas',
      title: 'Vagas',
      type: 'number',
    }),
    defineField({
      name: 'preco',
      title: 'Preço',
      type: 'string',
    }),
    defineField({
      name: 'linkInscricao',
      title: 'Link de Inscrição',
      type: 'url',
    }),
    defineField({
      name: 'ativo',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
