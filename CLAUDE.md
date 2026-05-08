@AGENTS.md

# Instruções para o Claude Code

## Regras de Git
- Pode trabalhar em worktrees ou branches temporários durante a sessão
- Commitar as alterações com mensagens descritivas em português
- ⚠️ OBRIGATÓRIO ao final de cada sessão: perguntar ao usuário "Deseja fazer o merge das alterações para o branch `main`?" e aguardar confirmação antes de executar

## Checklist de fim de sessão
Antes de encerrar qualquer sessão, executar nesta ordem:
1. Rodar `npm run build` e confirmar que não há erros
2. Commitar todas as alterações pendentes com mensagem descritiva
3. Perguntar ao usuário: "Deseja fazer o merge das alterações para o branch `main`?"
4. Aguardar confirmação antes de fazer o merge

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