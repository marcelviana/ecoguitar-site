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
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Guitarra', value: 'guitarra' },
          { title: 'Guitarra 7 Cordas', value: 'guitarra-7-cordas' },
          { title: 'Guitarra Barítono', value: 'baritono' },
          { title: 'Guitarra Headless', value: 'headless' },
          { title: 'Guitarra Multiescala', value: 'multiescala' },
          { title: 'Guitarra Thinline', value: 'thinline' },
          { title: 'Guitarra Traveler', value: 'traveler' },
          { title: 'Baixo', value: 'baixo' },
          { title: 'Violão', value: 'violao' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
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
    select: { title: 'nome', subtitle: 'categoria', media: 'imagem' },
  },
  orderings: [
    {
      title: 'Categoria',
      name: 'categoriaAsc',
      by: [{ field: 'categoria', direction: 'asc' }],
    },
  ],
})
