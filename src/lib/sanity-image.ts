export { urlFor } from './sanity'

export function sanityImg(url: string | undefined | null, width: number, quality = 80): string {
  if (!url?.includes('cdn.sanity.io')) return url ?? ''
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}w=${width}&auto=format&q=${quality}`
}
