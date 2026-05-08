@AGENTS.md

# Instruções para o Claude Code

## Regras de Git
- Sempre trabalhar diretamente no branch `main`
- Nunca criar worktrees ou branches temporários
- Commitar ao final de cada sessão com mensagem descritiva

## Stack
- Next.js 16 + TypeScript + React 19
- Tailwind CSS v4 — tokens no `@theme` do `globals.css` (não existe `tailwind.config.ts`)
- Sanity CMS v5 — schemas em `/sanity/schemas/`
- Formspree — ID no `.env.local`
- Node mínimo: v23 (`.nvmrc` no repositório)

## Convenções
- Componentes em `src/components/`, nomeados em PascalCase
- Páginas em `src/app/` seguindo App Router do Next.js
- Imports com alias `@/`