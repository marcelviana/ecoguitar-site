import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'curso',
  title: 'Cursos',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagem',
      title: 'Imagem do curso',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'modalidade',
      title: 'Modalidade',
      type: 'string',
      options: {
        list: [
          { title: 'Express', value: 'Express' },
          { title: 'Intensivo', value: 'Intensivo' },
          { title: 'Extensivo', value: 'Extensivo' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'preco',
      title: 'Preço',
      type: 'string',
      description: 'Ex: 6x R$ 500,00',
    }),
    defineField({
      name: 'duracao',
      title: 'Duração',
      type: 'string',
      description: 'Ex: 5-6 dias',
    }),
    defineField({
      name: 'horarios',
      title: 'Horários',
      type: 'string',
      description: 'Ex: Terças 19h-22h ou Sábados 9h-13h',
    }),
    defineField({
      name: 'ativo',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
