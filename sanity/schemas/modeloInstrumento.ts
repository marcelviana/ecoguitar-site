import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'modeloInstrumento',
  title: 'Modelo de Instrumento',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome do modelo',
      type: 'string',
      description: 'Ex: Stratocaster 7 Cordas HSS',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categorias',
      title: 'Categorias',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categoria' }] }],
      description: 'Ex: Guitarra, 7 Cordas, Multiescala',
    }),
    defineField({
      name: 'imagem',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'disponivel',
      title: 'Disponível para construção',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'destaque',
      title: 'Exibir em destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'observacao',
      title: 'Observação',
      type: 'string',
      description: 'Ex: "Template sob encomenda +R$500"',
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'categorias.0.title',
      media: 'imagem',
    },
  },
  orderings: [
    {
      title: 'Nome',
      name: 'nomeAsc',
      by: [{ field: 'nome', direction: 'asc' }],
    },
  ],
})
