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

## Design — Alternância de fundos entre seções

NUNCA coloque duas seções adjacentes com a mesma cor de fundo. Seções com o mesmo fundo se fundem visualmente e prejudicam a leitura da página.

Ao adicionar ou mover qualquer seção, SEMPRE verifique a cor da seção anterior e da posterior antes de definir o fundo da seção em questão.

### Cores de fundo em uso no projeto

Tons claros (texto escuro):
- `bg-eco-white` (#FFFDF8) — quase branco
- `bg-eco-sand-light` (#FFF8EE) — areia clara
- `bg-eco-sand-warm` (#FFE9C2) — areia quente
- `bg-eco-turquoise-lt` (#E2F6F6) — turquesa claro

Tons escuros (texto claro):
- `bg-eco-sky` (#6B8FA8) — azul médio
- `bg-eco-turquoise` (#1AACAC) — turquesa (CTAs)
- `bg-eco-turquoise-dk` (#0D7A7A) — turquesa escuro
- `bg-eco-night` (#2B3A4A) — escuro principal

### Sequências de fundo por página (referência)

**Home:**
1. Hero — `eco-night`
2. Serviços — `eco-white`
3. Quiz — `eco-night`
4. Depoimentos — `eco-sand-light`
5. Sobre — `eco-sand-warm`
6. Próximos Passos — `eco-turquoise`

**/ cursos:**
1. Hero — `eco-night`
2. Por quê construir — `eco-turquoise-lt`
3. Quiz — `eco-night`
4. Cards dos cursos — `eco-sand-warm`

**/cursos/[slug]:**
1. Hero — `eco-night`
2. Vídeo (se existir) — `eco-night`
3. Para quem — `eco-turquoise`
4. Descrição completa — `eco-sand-light`
5. Modelos disponíveis — `eco-sand-warm`
6. Galeria de alunos — `eco-night`
7. Investimento + CTA — `eco-sand-light`

**/galeria:**
1. Hero — `eco-night`
2. Destaques — `eco-sand-warm`
3. Acervo — `eco-sand-light`
4. Instagram CTA — `eco-turquoise-dk`

**/galeria/[slug]:**
1. Hero — `eco-night`
2. Fotos + specs — `eco-sand-light`
3. Vídeo (se existir) — `eco-sky`

**/sobre:**
1. Hero — `eco-night`
2. Apresentação — `eco-sand-warm`
3. Origem — `eco-sand-light`
4. Propósito — `eco-night`
5. Diferenciais — `eco-sand-light`
6. Cursos — `eco-sand-warm`
7. Pedro/Bio — `eco-night`
8. CTA final — `eco-turquoise`

**/clube:**
1. Hero — `eco-night`
2. Benefícios — `eco-sand-light`

## Linguagem e terminologia
- Usar sempre **Luteria** (não "Luthieria" nem "Lutheria") ao se referir à arte/ofício
- **Luthier** é correto apenas quando se referir ao profissional ou em nomes próprios (ex: "Clube do Luthier")