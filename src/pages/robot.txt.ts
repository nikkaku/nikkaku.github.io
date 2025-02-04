import type { APIRoute } from 'astro'

const getText = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`

export const GET: APIRoute = ({ site }) => {
  const url = new URL('sitemap-index.xml', site)
  return new Response(getText(url))
}