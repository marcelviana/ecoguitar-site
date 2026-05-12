@AGENTS.md

# ⚠️ LEIA ISTO PRIMEIRO — ANTES DE QUALQUER AÇÃO

## Confirmação obrigatória de início
ANTES de começar qualquer tarefa, responda exatamente:
"Li o CLAUDE.md. Confirmo que executarei o checklist de fim de sessão antes de encerrar."

---

# ⚠️ CHECKLIST DE FIM DE SESSÃO — NUNCA PULE ESTA ETAPA

OBRIGATÓRIO executar nesta ordem antes de encerrar:

1. Rodar `npm run build` — NUNCA encerre com erros de build
2. Commitar todas as alterações pendentes com mensagem descritiva em português
3. Perguntar ao usuário: "Deseja fazer o merge das alterações para o branch `main`?"
4. AGUARDAR confirmação antes de fazer o merge
5. APÓS O MERGE: verificar se os arquivos em `/Users/marcelviana/projects/ecoguitar-site/` refletem as mudanças — o merge pode retornar "Already up to date" sem atualizar os arquivos físicos. Se não baterem, copiar manualmente com `cp <worktree>/arquivo /projeto-principal/arquivo` e commitar novamente.

---

# Instruções gerais

## Regras de Git
- Pode trabalhar em worktrees ou branches temporários durante a sessão
- Commitar com mensagens descritivas em português

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

## Linguagem e terminologia
- Usar sempre **Luteria** (não "Luthieria" nem "Lutheria") ao se referir à arte/ofício
- **Luthier** é correto apenas quando se referir ao profissional ou em nomes próprios (ex: "Clube do Luthier")