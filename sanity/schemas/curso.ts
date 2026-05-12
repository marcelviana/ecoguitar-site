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
    // ── Novos campos ──
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo / Tagline',
      type: 'string',
      description: 'Ex: "Para quem quer aproveitar o processo aos poucos"',
    }),
    defineField({
      name: 'descricaoCompleta',
      title: 'Descrição Completa',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Texto rico que aparece na página do curso',
    }),
    defineField({
      name: 'videoYoutubeId',
      title: 'ID do vídeo YouTube (hero)',
      type: 'string',
      description: 'Ex: WAiTIwQ3dQM (só o ID, não a URL completa)',
    }),
    defineField({
      name: 'maxAlunosPorProfessor',
      title: 'Máx. alunos por professor',
      type: 'number',
    }),
    defineField({
      name: 'paraQuem',
      title: 'Para quem é indicado',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Adicione um perfil por linha. Ex: "Quem tem pouco tempo mas quer o processo completo"',
    }),
    defineField({
      name: 'precoIndividual',
      title: 'Preço individual (R$)',
      type: 'number',
      description: 'Valor para aula individual com professor dedicado',
    }),
    defineField({
      name: 'oQueEstaIncluido',
      title: 'O que está incluído',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de itens inclusos no curso',
    }),
    defineField({
      name: 'oQueNaoEstaIncluido',
      title: 'O que NÃO está incluído',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'faq',
      title: 'Perguntas Frequentes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'perguntaResposta',
          fields: [
            { name: 'pergunta', title: 'Pergunta', type: 'string' },
            { name: 'resposta', title: 'Resposta', type: 'text', rows: 4 },
          ],
          preview: { select: { title: 'pergunta' } },
        },
      ],
    }),
    defineField({
      name: 'modelosDisponiveis',
      title: 'Modelos disponíveis',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'modeloInstrumento' }] }],
      description: 'Deixe vazio para exibir todos os modelos cadastrados',
      options: {
        modal: { type: 'popover' },
      },
    }),
    defineField({
      name: 'galeria',
      title: 'Galeria de instrumentos dos alunos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: 'imagemCapa',
      title: 'Imagem de capa',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ordem',
      title: 'Ordem de exibição',
      type: 'number',
      description: 'Menor número aparece primeiro na listagem',
    }),
    defineField({
      name: 'textoQuiz',
      title: 'Texto do resultado do quiz',
      type: 'text',
      rows: 3,
      description: 'Texto exibido quando este curso é indicado pelo quiz da página de cursos',
    }),
  ],
})
