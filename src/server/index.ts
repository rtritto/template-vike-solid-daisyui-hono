import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import vike from 'vike-node/hono'

const app = new Hono()

app.use(vike())

export const runtime = 'nodejs'

export const GET = handle(app)

export const POST = GET

export default process.env.NODE_ENV === 'production' ? undefined : app
