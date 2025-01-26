import app from '../dist/server/index.mjs'

export const runtime = 'nodejs'
export const GET = app.fetch
export const POST = app.fetch
