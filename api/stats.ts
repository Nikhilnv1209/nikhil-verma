type ApiRequest = { method?: string }

type ApiResponse = {
  status: (code: number) => ApiResponse
  json: (body: unknown) => void
  setHeader: (name: string, value: string) => void
}

const VISITS_KEY = 'portfolio:visits'
const CONTRIBUTIONS_KEY = 'portfolio:contributions'
const CONTRIBUTIONS_TTL = 60 * 60
const GITHUB_USER = 'Nikhilnv1209'

// Vercel's Upstash integration supplies either naming convention.
const redisUrl =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? ''
const redisToken =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
const storeReady = Boolean(redisUrl && redisToken)

async function redisCommand<T>(
  command: string,
  ...args: (string | number)[]
): Promise<T | null> {
  if (!storeReady) return null

  const path = [command, ...args]
    .map((part) => encodeURIComponent(String(part)))
    .join('/')

  try {
    const response = await fetch(`${redisUrl.replace(/\/+$/, '')}/${path}`, {
      headers: { Authorization: `Bearer ${redisToken}` },
      cache: 'no-store',
    })

    if (!response.ok) return null

    const payload = (await response.json()) as { result?: T }
    return payload.result ?? null
  } catch {
    return null
  }
}

/* Contributions are cached for an hour so a burst of visits costs one upstream
   request. Without Redis we still serve the live number, just uncached. */
async function readContributions(): Promise<number | null> {
  const cached = await redisCommand<string>('get', CONTRIBUTIONS_KEY)
  if (cached !== null) {
    const total = Number(cached)
    if (Number.isFinite(total)) return total
  }

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
      { signal: AbortSignal.timeout(5000) },
    )

    if (!response.ok) return null

    const payload = (await response.json()) as {
      total?: { lastYear?: number }
    }
    const total = payload.total?.lastYear
    if (typeof total !== 'number') return null

    await redisCommand('set', CONTRIBUTIONS_KEY, total, 'EX', CONTRIBUTIONS_TTL)
    return total
  } catch {
    return null
  }
}

export default async function handler(
  request: ApiRequest,
  response: ApiResponse,
) {
  response.setHeader('Cache-Control', 'no-store')

  const method = request.method ?? 'GET'

  if (method !== 'GET' && method !== 'POST') {
    response.setHeader('Allow', 'GET, POST')
    return response.status(405).json({ error: 'method-not-allowed' })
  }

  let visits: number | null = null

  if (storeReady) {
    if (method === 'POST') {
      const incremented = await redisCommand<number>('incr', VISITS_KEY)
      visits = typeof incremented === 'number' ? incremented : null
    } else {
      const stored = await redisCommand<string | number>('get', VISITS_KEY)
      const parsed = Number(stored ?? 0)
      visits = Number.isFinite(parsed) ? parsed : 0
    }
  }

  const contributions = await readContributions()

  return response.status(200).json({ visits, contributions })
}
