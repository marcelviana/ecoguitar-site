import { groq } from 'next-sanity'
import { client } from './sanity'

export interface Configuracao {
  endereco?: string
  whatsapp?: string
  email?: string
  instagram?: string
  youtube?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroBannerImagem?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fotoPedro?: any
}

const configuracaoQuery = `*[_type == "configuracao"][0]{
  endereco, whatsapp, email, instagram, youtube,
  heroBannerImagem, fotoPedro
}`

export async function getConfiguracao(): Promise<Configuracao | null> {
  if (!client) return null
  try {
    return await client.fetch<Configuracao | null>(configuracaoQuery)
  } catch {
    return null
  }
}

export interface Instrumento {
  _id: string
  nome: string
  descricao?: string
  imagemUrl?: string
}

export interface Curso {
  _id: string
  titulo: string
  descricao?: string
  preco?: string
  modalidade?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imagem?: any
}

export interface Depoimento {
  _id: string
  nomeAluno: string
  texto: string
  cursoRealizado?: string
  fotoUrl?: string
}

const instrumentosDestaqueQuery = `*[_type == "instrumento" && destaque == true][0..2]{
  _id, nome, descricao, "imagemUrl": fotos[0].asset->url
}`

const cursosDestaqueQuery = `*[_type == "curso" && ativo == true][0..2]{
  _id, titulo, descricao, preco, modalidade, imagem
}`

const depoimentosQuery = `*[_type == "depoimento" && ativo == true][0..2]{
  _id, nomeAluno, texto, cursoRealizado, "fotoUrl": foto.asset->url
}`

export async function getInstrumentosDestaque(): Promise<Instrumento[]> {
  if (!client) return []
  try {
    return await client.fetch<Instrumento[]>(instrumentosDestaqueQuery)
  } catch {
    return []
  }
}

export async function getCursosDestaque(): Promise<Curso[]> {
  if (!client) return []
  try {
    return await client.fetch<Curso[]>(cursosDestaqueQuery)
  } catch {
    return []
  }
}

export async function getDepoimentos(): Promise<Depoimento[]> {
  if (!client) return []
  try {
    return await client.fetch<Depoimento[]>(depoimentosQuery)
  } catch {
    return []
  }
}

export interface CursoCompleto extends Curso {
  duracao?: string
  horarios?: string
}

export interface Workshop {
  _id: string
  titulo: string
  descricao?: string
  data?: string
  vagas?: number
  preco?: string
  linkInscricao?: string
}

const cursosTodosQuery = `*[_type == "curso" && ativo == true] | order(_createdAt asc){
  _id, titulo, descricao, preco, modalidade, duracao, horarios, imagem
}`

const workshopsQuery = `*[_type == "workshop" && ativo == true] | order(data asc){
  _id, titulo, descricao, data, vagas, preco, linkInscricao
}`

export async function getCursosTodos(): Promise<CursoCompleto[]> {
  if (!client) return []
  try {
    return await client.fetch<CursoCompleto[]>(cursosTodosQuery)
  } catch {
    return []
  }
}

export async function getWorkshops(): Promise<Workshop[]> {
  if (!client) return []
  try {
    return await client.fetch<Workshop[]>(workshopsQuery)
  } catch {
    return []
  }
}

export interface InstrumentoGaleria {
  _id: string
  nome: string
  descricao?: string
  destaque?: boolean
  materiais?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  foto?: any
}

export interface Clube {
  _id: string
  titulo: string
  descricao?: string
  beneficios?: string[]
  preco?: string
  periodo?: string
  vagas?: number
}

const instrumentosTodosQuery = `*[_type == "instrumento"] | order(_createdAt desc){
  _id, nome, descricao, destaque, materiais, "foto": fotos[0]
}`

const clubeQuery = `*[_type == "clube"][0]`

export async function getAllInstrumentos(): Promise<InstrumentoGaleria[]> {
  if (!client) return []
  try {
    return await client.fetch<InstrumentoGaleria[]>(instrumentosTodosQuery)
  } catch {
    return []
  }
}

export async function getClube(): Promise<Clube | null> {
  if (!client) return null
  try {
    return await client.fetch<Clube | null>(clubeQuery)
  } catch {
    return null
  }
}

export interface Sobre {
  titulo?: string
  subtitulo?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio?: any[]
  curiosidades?: { icone?: string; texto: string }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fotoPrincipal?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fotosAtelier?: any[]
}

const sobreQuery = `*[_type == "sobre"][0]{
  titulo, subtitulo, bio, curiosidades, fotoPrincipal, fotosAtelier
}`

export async function getSobre(): Promise<Sobre | null> {
  if (!client) return null
  try {
    return await client.fetch<Sobre | null>(sobreQuery)
  } catch {
    return null
  }
}

// ── Cursos dinâmicos (páginas /cursos e /cursos/[slug]) ──

export interface PerguntaResposta {
  pergunta: string
  resposta: string
}

export interface ModeloInstrumento {
  _id: string
  nome: string
  categoria: string
  imagem?: string
  disponivel: boolean
  destaque: boolean
  observacao?: string
}

export interface CursoListagem {
  _id: string
  titulo: string
  slug: string
  subtitulo?: string
  modalidade?: string
  ordem?: number
  paraQuem?: string
  preco?: string
  duracao?: string
  horario?: string
  maxAlunosPorProfessor?: number
  imagemCapa?: string
}

export interface CursoDetalhe {
  _id: string
  titulo: string
  slug: string
  subtitulo?: string
  modalidade?: string
  paraQuem?: string
  duracao?: string
  horario?: string
  maxAlunosPorProfessor?: number
  preco?: string
  precoNumerico?: number
  precoIndividual?: number
  oQueEstaIncluido?: string[]
  oQueNaoEstaIncluido?: string[]
  faq?: PerguntaResposta[]
  videoYoutubeId?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descricaoCompleta?: any[]
  imagemCapa?: string
  galeria?: string[]
  modelosDisponiveis?: ModeloInstrumento[]
}

export const cursosListagemQuery = groq`
  *[_type == "curso" && ativo == true] | order(ordem asc, titulo asc) {
    _id,
    titulo,
    "slug": slug.current,
    subtitulo,
    modalidade,
    ordem,
    paraQuem,
    preco,
    duracao,
    "horario": coalesce(horario, horarios),
    maxAlunosPorProfessor,
    "imagemCapa": imagemCapa.asset->url,
  }
`

export const cursoBySlugQuery = groq`
  *[_type == "curso" && slug.current == $slug && ativo == true][0] {
    _id,
    titulo,
    "slug": slug.current,
    subtitulo,
    modalidade,
    paraQuem,
    duracao,
    "horario": coalesce(horario, horarios),
    maxAlunosPorProfessor,
    preco,
    precoNumerico,
    precoIndividual,
    oQueEstaIncluido,
    oQueNaoEstaIncluido,
    faq,
    videoYoutubeId,
    descricaoCompleta,
    "imagemCapa": imagemCapa.asset->url,
    "galeria": galeria[].asset->url,
    "modelosDisponiveis": modelosDisponiveis[]->{
      _id,
      nome,
      categoria,
      disponivel,
      destaque,
      observacao,
      "imagem": imagem.asset->url,
    },
  }
`

export const modelosQuery = groq`
  *[_type == "modeloInstrumento" && disponivel == true] | order(categoria asc, nome asc) {
    _id,
    nome,
    categoria,
    disponivel,
    destaque,
    observacao,
    "imagem": imagem.asset->url,
  }
`

export async function getCursosListagem(): Promise<CursoListagem[]> {
  if (!client) return []
  try {
    return await client.fetch<CursoListagem[]>(cursosListagemQuery)
  } catch {
    return []
  }
}

export async function getCursoBySlug(slug: string): Promise<CursoDetalhe | null> {
  if (!client) return null
  try {
    return await client.fetch<CursoDetalhe | null>(cursoBySlugQuery, { slug })
  } catch {
    return null
  }
}

export async function getModelos(): Promise<ModeloInstrumento[]> {
  if (!client) return []
  try {
    return await client.fetch<ModeloInstrumento[]>(modelosQuery)
  } catch {
    return []
  }
}
