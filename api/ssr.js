import { renderPage } from 'vike/server'

// We use JSDoc instead of TypeScript because Vercel seems buggy with /api/**/*.ts files

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  const { url } = req
  if (url === undefined) throw new Error('req.url is undefined')

  const pageContextInit = { urlOriginal: req.url }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext

  if (!httpResponse) {
    res.statusCode = 200
    res.end()
    return
  }

  const { body, statusCode, headers } = httpResponse
  res.statusCode = statusCode
  for (const [name, value] of headers) {
    res.setHeader(name, value)
  }
  res.end(body)
}
