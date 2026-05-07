import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'depoimento',
  title: 'Depoimentos',
  type: 'document',
  fields: [
    defineField({
      name: 'nomeAluno',
      title: 'Nome do Aluno',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'texto',
      title: 'Texto',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cursoRealizado',
      title: 'Curso Realizado',
      type: 'string',
      description: 'Ex: Curso Extensivo',
    }),
    defineField({
      name: 'ativo',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
