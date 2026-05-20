import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'parceria',
  title: 'Página Parcerias',
  type: 'document',

  groups: [
    { name: 'hero',       title: '1 — Hero' },
    { name: 'pitch',      title: '2 — Pitch B2B' },
    { name: 'modalidades', title: '3 — Modalidades' },
    { name: 'beneficios', title: '4 — Benefícios' },
    { name: 'etapas',     title: '5 — Como funciona' },
    { name: 'parceiros',  title: '6 — Parceiros atuais' },
    { name: 'faq',        title: '7 — FAQ' },
    { name: 'cta',        title: '8 — CTA Final' },
  ],

  fields: [

    // ── ABA 1: HERO ──────────────────────────────────────────────
    defineField({
      name: 'heroLabel',
      title: 'Label (acima do título)',
      type: 'string',
      group: 'hero',
      initialValue: 'Para escolas, empresas e instituições',
    }),
    defineField({
      name: 'heroTitulo',
      title: 'Título principal (H1)',
      type: 'string',
      group: 'hero',
      initialValue: 'Luteria para a sua instituição',
    }),
    defineField({
      name: 'heroSubtitulo',
      title: 'Subtítulo',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue: 'Coleta, devolução, atendimento no local e workshops feitos sob medida para escolas de música, estúdios, empresas e ONGs.',
    }),

    // ── ABA 2: PITCH B2B ─────────────────────────────────────────
    defineField({
      name: 'pitchLabel',
      title: 'Label',
      type: 'string',
      group: 'pitch',
      initialValue: 'O que propomos',
    }),
    defineField({
      name: 'pitchTitulo',
      title: 'Título (H2)',
      type: 'string',
      group: 'pitch',
      initialValue: 'Uma parceria que cuida dos seus instrumentos e da sua comunidade.',
    }),
    defineField({
      name: 'pitchParagrafo1',
      title: 'Parágrafo 1',
      type: 'text',
      rows: 4,
      group: 'pitch',
      initialValue: 'A Eco Guitar atua desde 2017 ao lado de músicos, professores e instituições que dependem de instrumentos sempre prontos para tocar. Sabemos que uma escola de música, um estúdio ou uma empresa cultural não pode parar a operação para levar e buscar guitarras em uma luteria.',
    }),
    defineField({
      name: 'pitchParagrafo2',
      title: 'Parágrafo 2',
      type: 'text',
      rows: 4,
      group: 'pitch',
      initialValue: 'Por isso desenhamos um modelo de parceria sem custo direto para a instituição: oferecemos 10% de desconto em qualquer serviço para seus alunos, professores ou funcionários, em troca de divulgação combinada caso a caso. Os termos são personalizados — cada parceria é construída no tamanho da realidade de quem está do outro lado.',
    }),

    // ── ABA 3: MODALIDADES ───────────────────────────────────────
    defineField({
      name: 'modalidades',
      title: 'Modalidades de parceria',
      type: 'array',
      group: 'modalidades',
      description: 'Mínimo 1, máximo 5 modalidades.',
      validation: (Rule) => Rule.min(1).max(5),
      of: [
        {
          type: 'object',
          name: 'modalidadeItem',
          fields: [
            defineField({ name: 'titulo',    title: 'Título',      type: 'string' }),
            defineField({ name: 'descricao', title: 'Descrição',   type: 'text', rows: 2 }),
            defineField({
              name: 'itens',
              title: 'Itens da modalidade',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: { select: { title: 'titulo', subtitle: 'descricao' } },
        },
      ],
    }),

    // ── ABA 4: BENEFÍCIOS ────────────────────────────────────────
    defineField({
      name: 'beneficiosLabel',
      title: 'Label',
      type: 'string',
      group: 'beneficios',
      initialValue: 'Por que faz sentido',
    }),
    defineField({
      name: 'beneficiosTitulo',
      title: 'Título (H2)',
      type: 'string',
      group: 'beneficios',
      initialValue: 'O que a sua instituição ganha com essa parceria.',
    }),
    defineField({
      name: 'beneficios',
      title: 'Lista de benefícios',
      type: 'array',
      group: 'beneficios',
      of: [{ type: 'string' }],
    }),

    // ── ABA 5: COMO FUNCIONA / ETAPAS ────────────────────────────
    defineField({
      name: 'etapasLabel',
      title: 'Label',
      type: 'string',
      group: 'etapas',
      initialValue: 'O caminho',
    }),
    defineField({
      name: 'etapasTitulo',
      title: 'Título (H2)',
      type: 'string',
      group: 'etapas',
      initialValue: 'Como começamos juntos.',
    }),
    defineField({
      name: 'etapas',
      title: 'Etapas',
      type: 'array',
      group: 'etapas',
      of: [
        {
          type: 'object',
          name: 'etapaItem',
          fields: [
            defineField({ name: 'titulo',    title: 'Título',    type: 'string' }),
            defineField({ name: 'descricao', title: 'Descrição', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'titulo', subtitle: 'descricao' } },
        },
      ],
    }),

    // ── ABA 6: PARCEIROS ATUAIS ──────────────────────────────────
    defineField({
      name: 'parceirosLabel',
      title: 'Label',
      type: 'string',
      group: 'parceiros',
      initialValue: 'Quem já está com a gente',
    }),
    defineField({
      name: 'parceirosTitulo',
      title: 'Título (H2)',
      type: 'string',
      group: 'parceiros',
      initialValue: 'Instituições que confiam na Eco Guitar.',
    }),
    defineField({
      name: 'parceiros',
      title: 'Parceiros atuais',
      type: 'array',
      group: 'parceiros',
      of: [
        {
          type: 'object',
          name: 'parceiroItem',
          fields: [
            defineField({ name: 'nome', title: 'Nome', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'logo',
              title: 'Logo (opcional)',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: 'nome' } },
        },
      ],
    }),

    // ── ABA 7: FAQ ───────────────────────────────────────────────
    defineField({
      name: 'faq',
      title: 'Perguntas frequentes',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'pergunta', title: 'Pergunta', type: 'string' }),
            defineField({ name: 'resposta', title: 'Resposta', type: 'text', rows: 4 }),
          ],
          preview: { select: { title: 'pergunta' } },
        },
      ],
    }),

    // ── ABA 8: CTA FINAL ─────────────────────────────────────────
    defineField({
      name: 'ctaLabel',
      title: 'Label',
      type: 'string',
      group: 'cta',
      initialValue: 'Vamos conversar',
    }),
    defineField({
      name: 'ctaTitulo',
      title: 'Título (H2)',
      type: 'string',
      group: 'cta',
      initialValue: 'Conta para a gente sobre a sua instituição.',
    }),
    defineField({
      name: 'ctaSubtitulo',
      title: 'Subtítulo',
      type: 'text',
      rows: 2,
      group: 'cta',
      initialValue: 'Responderemos em alguns dias úteis. Sem compromisso.',
    }),

  ],
})
