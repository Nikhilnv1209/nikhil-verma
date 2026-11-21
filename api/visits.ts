type ApiRequest = { method?: string }

type ApiResponse = {
  status: (code: number) => ApiResponse
  json: (body: unknown) => void
  setHeader: (name: string, value: string) => void
}

const VISITS_KEY = 'portfolio:visits'

const redisUrl =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? ''
const redisToken =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
const storeReady = Boolean(redisUrl && redisToken)

/* `undefined` means the request failed (bad token, timeout, Upstash down);
   `null` means it succeeded but the key is missing. */
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

export default async function handler(
  request: ApiRequest,
  response: ApiResponse,
) {
  // A counter must never be cached.
  response.setHeader('Cache-Control', 'no-store')

  const method = request.method ?? 'GET'

  if (method !== 'GET' && method !== 'POST') {
    response.setHeader('Allow', 'GET, POST')
    return response.status(405).json({ error: 'method-not-allowed' })
  }

  if (method === 'POST') {
    const incremented = await redisCommand<number>('incr', VISITS_KEY)
    return response
      .status(200)
      .json({ visits: typeof incremented === 'number' ? incremented : null })
  }

  const stored = await redisCommand<string | number>('get', VISITS_KEY)
  if (stored === undefined) return response.status(200).json({ visits: null })

  const parsed = Number(stored ?? 0)
  return response
    .status(200)
    .json({ visits: Number.isFinite(parsed) ? parsed : 0 })
}
