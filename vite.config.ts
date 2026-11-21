import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const CONTRIBUTIONS_URL =
  'https://github-contributions-api.jogruber.de/v4/Nikhilnv1209?y=last'
const CONTRIBUTIONS_TTL = 60 * 60 * 1000

/* Mirrors api/stats.ts so `npm run dev` exercises the real UI without Redis.
   The counter lives in memory and resets when the dev server restarts. */
function devStats(): Plugin {
  let visits = 0
  let contributions: { total: number; at: number } | null = null

  return {
    name: 'dev-stats',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split('?')[0]
        if (path !== '/api/stats') return next()

        response.setHeader('Content-Type', 'application/json')

        const send = (body: unknown) => response.end(JSON.stringify(body))

        if (request.method === 'POST') visits += 1

        if (contributions && Date.now() - contributions.at < CONTRIBUTIONS_TTL) {
          return send({ visits, contributions: contributions.total })
        }

        fetch(CONTRIBUTIONS_URL, { signal: AbortSignal.timeout(5000) })
          .then((upstream) => (upstream.ok ? upstream.json() : null))
          .then((payload) => {
            const total = (payload as { total?: { lastYear?: number } } | null)
              ?.total?.lastYear

            if (typeof total === 'number') {
              contributions = { total, at: Date.now() }
            }

            send({
              visits,
              contributions: typeof total === 'number' ? total : null,
            })
          })
          .catch(() => send({ visits, contributions: null }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devStats()],
})
