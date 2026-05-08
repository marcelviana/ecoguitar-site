import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'instrumento',
  title: 'Instrumentos',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nome', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'fotos',
      title: 'Fotos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'destaque',
      title: 'Destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'ativo',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    }),
    // ── Modelo de referência ──
    defineField({
      name: 'modeloBase',
      title: 'Modelo base',
      type: 'reference',
      to: [{ type: 'modeloInstrumento' }],
      description: 'Modelo de instrumento usado como base para a construção',
    }),
    // ── Especificações fixas ──
    defineField({
      name: 'corpo',
      title: 'Corpo',
      type: 'string',
      description: 'Ex: Cedro Rosa Fundo e Freijó Top',
      group: 'specs',
    }),
    defineField({
      name: 'braco',
      title: 'Braço',
      type: 'string',
      description: 'Ex: Jequitibá',
      group: 'specs',
    }),
    defineField({
      name: 'escala',
      title: 'Escala',
      type: 'string',
      description: 'Ex: Imbuia',
      group: 'specs',
    }),
    defineField({
      name: 'tarraxas',
      title: 'Tarraxas',
      type: 'string',
      description: 'Ex: Gotoh',
      group: 'specs',
    }),
    defineField({
      name: 'ferragens',
      title: 'Ferragens',
      type: 'string',
      description: 'Ex: Cromadas',
      group: 'specs',
    }),
    defineField({
      name: 'captacao',
      title: 'Captação',
      type: 'string',
      description: 'Ex: Malagoli Custom P90 (braço) + Hot P90 (ponte)',
      group: 'specs',
    }),
    // ── Especificações extras livres ──
    defineField({
      name: 'specsExtras',
      title: 'Especificações adicionais',
      type: 'array',
      group: 'specs',
      description: 'Campos livres para specs que não se encaixam nas categorias fixas acima',
      of: [
        {
          type: 'object',
          name: 'specExtra',
          fields: [
            { name: 'label', title: 'Nome da spec', type: 'string' },
            { name: 'valor', title: 'Valor', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'valor' } },
        },
      ],
    }),
  ],
  groups: [
    { name: 'specs', title: 'Especificações técnicas' },
  ],
  preview: {
    select: { title: 'nome', subtitle: 'corpo', media: 'fotos.0' },
  },
})
