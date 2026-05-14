import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sobre',
  title: 'Sobre Pedro Machado',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      initialValue: 'Conheça a Pedro Machado',
    }),
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string',
      description: 'Frase curta de apoio exibida acima do título',
      initialValue: 'Luteria artesanal',
    }),
    defineField({
      name: 'heroImagem',
      title: 'Imagem de Fundo do Hero',
      type: 'image',
      description: 'Imagem de fundo exibida no topo da página Sobre. Opcional.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Texto longo editável com formatação',
    }),
    defineField({
      name: 'curiosidades',
      title: 'Curiosidades',
      type: 'array',
      description: 'Fatos rápidos sobre o Pedro (ex: "28 anos de experiência")',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icone', title: 'Ícone (emoji)', type: 'string' }),
            defineField({ name: 'texto', title: 'Texto', type: 'string' }),
          ],
          preview: {
            select: { title: 'texto', subtitle: 'icone' },
          },
        },
      ],
    }),
    defineField({
      name: 'fotoPrincipal',
      title: 'Foto Principal',
      type: 'image',
      description: 'Foto de destaque do Pedro',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fotosAtelier',
      title: 'Galeria do Ateliê',
      type: 'array',
      description: 'Galeria de fotos do ateliê (máx. 6)',
      validation: (Rule) => Rule.max(6),
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
