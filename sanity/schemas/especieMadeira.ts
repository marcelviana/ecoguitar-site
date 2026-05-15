import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'especieMadeira',
  title: 'Espécies de Madeira',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nomeCientifico',
      title: 'Nome Científico',
      type: 'string',
    }),
    defineField({
      name: 'fotos',
      title: 'Fotos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'usos',
      title: 'Usos',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Corpo', value: 'corpo' },
          { title: 'Tampo', value: 'tampo' },
          { title: 'Braço', value: 'braco' },
          { title: 'Escala', value: 'escala' },
          { title: 'Fundo e lateral', value: 'fundo_lateral' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags de caráter acústico',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Quente', value: 'quente' },
          { title: 'Brilhante', value: 'brilhante' },
          { title: 'Equilibrado', value: 'equilibrado' },
          { title: 'Percussivo', value: 'percussivo' },
          { title: 'Ataque rápido', value: 'ataque_rapido' },
          { title: 'Sustain longo', value: 'sustain_longo' },
        ],
      },
    }),
    defineField({
      name: 'origem',
      title: 'Origem',
      type: 'string',
      options: {
        list: [
          { title: 'Mata Atlântica', value: 'Mata Atlântica' },
          { title: 'Amazônia', value: 'Amazônia' },
          { title: 'Cerrado', value: 'Cerrado' },
          { title: 'Outras regiões', value: 'Outras regiões' },
        ],
      },
    }),
    defineField({
      name: 'curiosidade',
      title: 'Curiosidade',
      type: 'text',
      description: 'Texto livre do Pedro sobre a madeira',
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem',
      type: 'number',
      description: 'Ordem de exibição na página',
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      media: 'fotos.0',
    },
  },
})
