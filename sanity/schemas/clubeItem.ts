import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'clubeItem',
  title: 'Clube do Luthier — Itens',
  type: 'document',
  fields: [
    defineField({
      name: 'item',
      title: 'Item',
      type: 'string',
      description: 'Ex: Instrumento completo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preco',
      title: 'Preço',
      type: 'string',
      description: 'Ex: 6x R$ 1.000',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'observacao',
      title: 'Observação',
      type: 'text',
    }),
  ],
})
