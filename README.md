# Eco Guitar — Site

Site institucional da Eco Guitar, luthieria do Pedro Machado em Vila Madalena, São Paulo.

## Stack
- Next.js 16 (static export) + TypeScript + React 19
- Tailwind CSS
- Sanity CMS v5 (schemas em /sanity/schemas/)
- Formspree (formulário de contato)
- Vercel (deploy)

## Variáveis de ambiente
Copie `.env.example` para `.env.local` e preencha os valores.
Nunca commite `.env.local`.

## Desenvolvimento local
```bash
npm install
npm run dev          # Next.js em localhost:3000
npx sanity dev       # Sanity Studio em localhost:3333
```

## Estrutura de páginas (planejada)
- / → Home
- /servicos → Regulagem e manutenção
- /cursos → Cursos (Express, Intensivo, Extensivo)
- /workshops → Agenda de workshops
- /galeria → Instrumentos construídos
- /clube → Clube do Luthier
- /contato → Formulário de contato

## Conteúdo gerenciável (Sanity)
Pedro Machado acessa o Studio para editar:
- Preços e descrições dos cursos
- Agenda de workshops
- Galeria de instrumentos
- Depoimentos de alunos
- Itens e preços do Clube do Luthier
- Dados de contato globais

## Sanity Project ID
4z7u83vm

## Estado atual
- [x] Setup inicial Next.js 16 + Tailwind + React 19
- [x] Schemas do Sanity criados
- [ ] Design system (tokens, componentes base)
- [ ] Páginas de conteúdo
- [ ] Galeria com Instagram feed
- [ ] Formulário de contato (Formspree)
- [ ] Deploy Vercel
