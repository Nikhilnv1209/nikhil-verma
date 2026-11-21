import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const CONTRIBUTIONS_URL =
  'https://github.com/users/Nikhilnv1209/contributions'
const CONTRIBUTIONS_TTL = 60 * 60 * 1000

/* Mirrors api/visits.ts and api/contributions.ts so `npm run dev` exercises the
   real UI without Redis. The counter is in memory and resets with the server. */
function devStats(): Plugin {
  let visits = 0
  let contributions: { total: number; at: number } | null = null

  return {
    name: 'dev-stats',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split('?')[0]

        if (path !== '/api/visits' && path !== '/api/contributions') {
          return next()
        }

        response.setHeader('Content-Type', 'application/json')
        const send = (body: unknown) => response.end(JSON.stringify(body))

        if (path === '/api/visits') {
          response.setHeader('Cache-Control', 'no-store')

          if (request.method === 'POST') visits += 1
          return send({ visits })
        }

        if (contributions && Date.now() - contributions.at < CONTRIBUTIONS_TTL) {
          return send({ total: contributions.total })
        }

        fetch(CONTRIBUTIONS_URL, {
          headers: { 'User-Agent': 'nikhil-verma-portfolio-dev' },
          signal: AbortSignal.timeout(8000),
        })
          .then((upstream) => (upstream.ok ? upstream.text() : null))
          .then((html) => {
            if (!html) return send({ total: null })

            let total = 0
            let days = 0

            for (const match of html.matchAll(/(\d+) contributions? on /g)) {
              total += Number(match[1])
              days += 1
            }

            if (days === 0) return send({ total: null })

            contributions = { total, at: Date.now() }
            send({ total })
          })
          .catch(() => send({ total: null }))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devStats()],
})
