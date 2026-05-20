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
  heroBannerCursos?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroBannerWorkshops?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroBannerGaleria?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroBannerContato?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroBannerServicos?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fotoPedro?: any
}

const configuracaoQuery = `*[_type == "configuracao"][0]{
  endereco, whatsapp, email, instagram, youtube,
  heroBannerImagem, heroBannerCursos, heroBannerWorkshops,
  heroBannerGaleria, heroBannerContato, heroBannerServicos,
  fotoPedro
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
  imagemCapa?: string
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
  _id, titulo, descricao, preco, modalidade, "imagemCapa": imagemCapa.asset->url
}`

const depoimentosQuery = `*[_type == "depoimento" && ativo == true][0..5]{
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

export interface Workshop {
  _id: string
  titulo: string
  descricao?: string
  data?: string
  vagas?: number
  preco?: string
  linkInscricao?: string
}

const workshopsQuery = `*[_type == "workshop" && ativo == true] | order(data asc){
  _id, titulo, descricao, data, vagas, preco, linkInscricao
}`

export async function getWorkshops(): Promise<Workshop[]> {
  if (!client) return []
  try {
    return await client.fetch<Workshop[]>(workshopsQuery)
  } catch {
    return []
  }
}

export interface SpecExtra {
  label: string
  valor: string
}

export interface CategoriaRef {
  _id: string
  title: string
}

export interface InstrumentoGaleria {
  _id: string
  nome: string
  slug: string
  descricao?: string
  destaque?: boolean
  fotoUrl?: string
  modeloBase?: { nome: string; categoria?: string; categorias?: CategoriaRef[] }
}

export interface InstrumentoDetalhe {
  _id: string
  nome: string
  slug: string
  descricao?: string
  destaque?: boolean
  fotos: string[]
  modeloBase?: { nome: string; categoria?: string; categorias?: CategoriaRef[] }
  corpo?: string
  braco?: string
  escala?: string
  tarraxas?: string
  ferragens?: string
  captacao?: string
  specsExtras?: SpecExtra[]
  videoYoutubeUrl?: string
  paginaGaleriaUrl?: string
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

const instrumentosTodosQuery = groq`
  *[_type == "instrumento" && ativo == true] | order(_createdAt desc) {
    _id,
    nome,
    "slug": slug.current,
    descricao,
    destaque,
    "fotoUrl": fotos[0].asset->url,
    "modeloBase": modeloBase->{ nome, "categorias": categorias[]->{_id, title}, "categoria": categorias[0]->title },
  }
`

const instrumentoBySlugQuery = groq`
  *[_type == "instrumento" && slug.current == $slug && ativo == true][0] {
    _id,
    nome,
    "slug": slug.current,
    descricao,
    destaque,
    "fotos": fotos[].asset->url,
    "modeloBase": modeloBase->{ nome, "categorias": categorias[]->{_id, title}, "categoria": categorias[0]->title },
    corpo,
    braco,
    escala,
    tarraxas,
    ferragens,
    captacao,
    specsExtras,
    videoYoutubeUrl,
    paginaGaleriaUrl,
  }
`

const clubeQuery = `*[_type == "clube"][0]`

export async function getAllInstrumentos(): Promise<InstrumentoGaleria[]> {
  if (!client) return []
  try {
    return await client.fetch<InstrumentoGaleria[]>(instrumentosTodosQuery)
  } catch {
    return []
  }
}

export async function getInstrumentoBySlug(slug: string): Promise<InstrumentoDetalhe | null> {
  if (!client) return null
  try {
    return await client.fetch<InstrumentoDetalhe | null>(instrumentoBySlugQuery, { slug })
  } catch {
    return null
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
  // Hero
  subtitulo?:           string
  titulo?:              string
  heroSubtitulo?:       string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroImagem?:          any
  // Origem
  origemLabel?:         string
  origemTitulo?:        string
  origemParagrafo1?:    string
  origemParagrafo2?:    string
  origemParagrafo3?:    string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  origemFoto?:          any
  // Propósito
  propositoLabel?:      string
  propositoTitulo?:     string
  propositoParagrafo1?: string
  propositoParagrafo2?: string
  propositoCitacao?:    string
  propositoParagrafo3?: string
  // Diferenciais
  diferenciaisLabel?:   string
  diferenciaisTitulo?:  string
  diferenciais?:        { icone?: string; titulo?: string; texto?: string }[]
  // Zé Elias
  zeEliasLabel?:        string
  zeEliasTitulo?:       string
  zeEliasParagrafo1?:   string
  zeEliasParagrafo2?:   string
  zeEliasParagrafo3?:   string
  zeEliasCitacao?:      string
  zeEliasCitacaoAutor?: string
  zeEliasVideoId?:      string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  zeEliasFoto?:         any
  // Cursos
  cursosLabel?:         string
  cursosTitulo?:        string
  cursosParagrafo1?:    string
  cursosParagrafo2?:    string
  // Pedro
  pedroLabel?:          string
  pedroTitulo?:         string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio?:                 any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fotoPrincipal?:       any
  curiosidadesLabel?:   string
  curiosidadesTitulo?:  string
  curiosidades?:        { icone?: string; texto: string }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fotosAtelier?:        any[]
  // CTA
  ctaLabel?:            string
  ctaTitulo?:           string
  ctaTexto?:            string
  ctaBotaoTexto?:       string
}

const sobreQuery = `*[_type == "sobre"][0]{
  subtitulo, titulo, heroSubtitulo, heroImagem,
  origemLabel, origemTitulo,
  origemParagrafo1, origemParagrafo2, origemParagrafo3, origemFoto,
  propositoLabel, propositoTitulo,
  propositoParagrafo1, propositoParagrafo2, propositoCitacao, propositoParagrafo3,
  diferenciaisLabel, diferenciaisTitulo,
  diferenciais[]{icone, titulo, texto},
  zeEliasLabel, zeEliasTitulo,
  zeEliasParagrafo1, zeEliasParagrafo2, zeEliasParagrafo3,
  zeEliasCitacao, zeEliasCitacaoAutor, zeEliasVideoId, zeEliasFoto,
  cursosLabel, cursosTitulo, cursosParagrafo1, cursosParagrafo2,
  pedroLabel, pedroTitulo, bio, fotoPrincipal,
  curiosidadesLabel, curiosidadesTitulo, curiosidades[]{icone, texto},
  fotosAtelier,
  ctaLabel, ctaTitulo, ctaTexto, ctaBotaoTexto
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
  /** @deprecated derivado de categorias[0].title para compatibilidade */
  categoria?: string
  categorias?: CategoriaRef[]
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
  paraQuem?: string[]
  preco?: string
  duracao?: string
  horarios?: string
  maxAlunosPorProfessor?: number
  imagemCapa?: string
  textoQuiz?: string
}

export interface CursoDetalhe {
  _id: string
  titulo: string
  slug: string
  subtitulo?: string
  modalidade?: string
  paraQuem?: string[]
  duracao?: string
  horarios?: string
  maxAlunosPorProfessor?: number
  preco?: string
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
    horarios,
    maxAlunosPorProfessor,
    "imagemCapa": imagemCapa.asset->url,
    textoQuiz,
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
    horarios,
    maxAlunosPorProfessor,
    preco,
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
      "categorias": categorias[]->{_id, title},
      "categoria": categorias[0]->title,
      disponivel,
      destaque,
      observacao,
      "imagem": imagem.asset->url,
    },
  }
`

export const modelosQuery = groq`
  *[_type == "modeloInstrumento" && disponivel == true] | order(nome asc) {
    _id,
    nome,
    "categorias": categorias[]->{_id, title},
    "categoria": categorias[0]->title,
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

export interface ProcessoEtapa {
  _id: string
  titulo: string
  descricao?: string
  imagemUrl?: string
  ordem?: number
}

const processoEtapasQuery = groq`
  *[_type == "processo"] | order(ordem asc) {
    _id, titulo, descricao, "imagemUrl": imagem.asset->url, ordem
  }
`

export async function getProcessoEtapas(): Promise<ProcessoEtapa[]> {
  if (!client) return []
  try {
    return await client.fetch<ProcessoEtapa[]>(processoEtapasQuery)
  } catch {
    return []
  }
}

export interface EspecieMadeira {
  _id: string
  nome: string
  nomeCientifico?: string
  fotos: string[]
  usos?: string[]
  tags?: string[]
  origem?: string
  curiosidade?: string
  ordem?: number
}

const especiesMadeiraQuery = groq`
  *[_type == "especieMadeira"] | order(ordem asc) {
    _id,
    nome,
    nomeCientifico,
    "fotos": fotos[].asset->url,
    usos,
    tags,
    origem,
    curiosidade,
    ordem,
  }
`

export async function getEspeciesMadeira(): Promise<EspecieMadeira[]> {
  if (!client) return []
  try {
    return await client.fetch<EspecieMadeira[]>(especiesMadeiraQuery)
  } catch {
    return []
  }
}
