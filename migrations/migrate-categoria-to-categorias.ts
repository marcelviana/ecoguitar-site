/**
 * Migração: campo `categoria` (string) → `categorias` (array de referências)
 *
 * O que faz:
 *  1. Busca todos os documentos `modeloInstrumento` que tenham `categoria` preenchida.
 *  2. Para cada valor único de `categoria`, cria (ou reutiliza) um documento `categoria`
 *     cujo `title` é o label legível (ex: "Guitarra", "Baixo").
 *  3. Substitui o campo `categoria` string por `categorias` array de referências.
 *
 * Como executar (requer @sanity/client >= 6):
 *
 *   npx sanity@latest exec migrations/migrate-categoria-to-categorias.ts --with-user-token
 *
 * Ou via ts-node (ajuste as variáveis de ambiente primeiro):
 *
 *   SANITY_PROJECT_ID=<id> SANITY_DATASET=production \
 *   SANITY_TOKEN=<write-token> \
 *   npx ts-node migrations/migrate-categoria-to-categorias.ts
 *
 * ATENÇÃO: execute APENAS UMA VEZ. Verifique os dados no Sanity Studio antes e depois.
 */

import { createClient } from '@sanity/client'

const CATEGORIA_LABELS: Record<string, string> = {
  guitarra: 'Guitarra',
  'guitarra-7-cordas': 'Guitarra 7 Cordas',
  baritono: 'Guitarra Barítono',
  headless: 'Guitarra Headless',
  multiescala: 'Guitarra Multiescala',
  thinline: 'Guitarra Thinline',
  traveler: 'Guitarra Traveler',
  baixo: 'Baixo',
  violao: 'Violão',
}

async function run() {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET ?? 'production'
  const token = process.env.SANITY_TOKEN

  if (!projectId || !token) {
    throw new Error('Defina SANITY_PROJECT_ID e SANITY_TOKEN nas variáveis de ambiente.')
  }

  const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false })

  // 1. Busca todos os modelos com `categoria` ainda preenchida
  const modelos = await client.fetch<{ _id: string; categoria: string }[]>(
    `*[_type == "modeloInstrumento" && defined(categoria)]{ _id, categoria }`
  )

  if (!modelos.length) {
    console.log('Nenhum documento com campo `categoria` encontrado. Nada a migrar.')
    return
  }

  console.log(`Encontrados ${modelos.length} documento(s) para migrar.`)

  // 2. Resolve ou cria documentos `categoria` para cada valor único
  const valoresUnicos = [...new Set(modelos.map((m) => m.categoria))]
  const categoriaIdMap: Record<string, string> = {}

  for (const valor of valoresUnicos) {
    const title = CATEGORIA_LABELS[valor] ?? valor

    // Verifica se já existe
    const existente = await client.fetch<{ _id: string } | null>(
      `*[_type == "categoria" && title == $title][0]{ _id }`,
      { title }
    )

    if (existente) {
      categoriaIdMap[valor] = existente._id
      console.log(`Categoria já existente: "${title}" → ${existente._id}`)
    } else {
      const criada = await client.create({ _type: 'categoria', title })
      categoriaIdMap[valor] = criada._id
      console.log(`Categoria criada: "${title}" → ${criada._id}`)
    }
  }

  // 3. Atualiza cada modeloInstrumento
  const transaction = client.transaction()

  for (const modelo of modelos) {
    const categoriaId = categoriaIdMap[modelo.categoria]
    transaction.patch(modelo._id, (patch) =>
      patch
        .set({
          categorias: [{ _type: 'reference', _ref: categoriaId, _key: categoriaId }],
        })
        .unset(['categoria'])
    )
  }

  await transaction.commit()
  console.log('Migração concluída com sucesso.')
}

run().catch((err) => {
  console.error('Erro durante a migração:', err)
  process.exit(1)
})
