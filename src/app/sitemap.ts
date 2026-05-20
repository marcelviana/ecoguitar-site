import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const base = 'https://ecoguitar.com.br'

const routes = ['/', '/sobre', '/servicos', '/cursos', '/workshops', '/galeria', '/clube', '/parcerias', '/contato']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'monthly' : 'monthly',
    priority: route === '/' ? 1.0 : 0.8,
  }))
}
