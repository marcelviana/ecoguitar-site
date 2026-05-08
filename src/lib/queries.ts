import { client } from './sanity'

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
  _id, titulo, descricao, preco, modalidade
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
  _id, titulo, descricao, preco, modalidade, duracao, horarios
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
