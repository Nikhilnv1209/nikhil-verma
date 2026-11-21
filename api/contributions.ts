type ApiRequest = { method?: string }

type ApiResponse = {
  status: (code: number) => ApiResponse
  json: (body: unknown) => void
  setHeader: (name: string, value: string) => void
}

const CONTRIBUTIONS_KEY = 'portfolio:contributions'
const CONTRIBUTIONS_TTL = 60 * 60
const GITHUB_USER = 'Nikhilnv1209'

const redisUrl =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? ''
const redisToken =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
const storeReady = Boolean(redisUrl && redisToken)

/* `undefined` means the request failed; `null` means the key is missing. */
async function redisCommand<T>(
  command: string,
  ...args: (string | number)[]
): Promise<T | null | undefined> {
  if (!storeReady) return undefined

  const path = [command, ...args]
    .map((part) => encodeURIComponent(String(part)))
    .join('/')

  try {
    const response = await fetch(`${redisUrl.replace(/\/+$/, '')}/${path}`, {
      headers: { Authorization: `Bearer ${redisToken}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(2500),
    })

    if (!response.ok) return undefined

    const payload = (await response.json()) as { result?: T | null }
    return payload.result ?? null
  } catch {
    return undefined
  }
}

async function readContributions(): Promise<number | null> {
  const cached = await redisCommand<string>('get', CONTRIBUTIONS_KEY)
  if (typeof cached === 'string') {
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
  /* This number moves a few times a day, so let the browser hold it briefly and
     let Vercel's edge hold it for an hour. Most page loads never reach this
     function, which is the cheapest possible Redis hit rate. */
  response.setHeader(
    'Cache-Control',
    'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
  )

  if ((request.method ?? 'GET') !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'method-not-allowed' })
  }

  const total = await readContributions()
  return response.status(200).json({ total })
}
