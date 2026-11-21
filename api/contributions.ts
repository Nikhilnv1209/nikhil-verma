type ApiRequest = { method?: string }

type ApiResponse = {
  status: (code: number) => ApiResponse
  json: (body: unknown) => void
  setHeader: (name: string, value: string) => void
}

/* v2: the value changed shape of source (GitHub page rather than a third-party
   API), so a new key avoids serving the stale cached number for an hour. */
const CONTRIBUTIONS_KEY = 'portfolio:contributions:v2'
const CONTRIBUTIONS_TTL = 60 * 60
const GITHUB_USER = 'Nikhilnv1209'
const PROFILE_URL = `https://github.com/users/${GITHUB_USER}/contributions`

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

/* GitHub's own contribution calendar is the source of truth: it already applies
   the default-branch rule and includes private contributions. The daily cells
   carry their counts in tooltips, so summing them reproduces the profile number
   exactly — no token, no third-party lag. */
async function readContributions(): Promise<number | null> {
  const cached = await redisCommand<string>('get', CONTRIBUTIONS_KEY)
  if (typeof cached === 'string') {
    const total = Number(cached)
    if (Number.isFinite(total)) return total
  }

  try {
    const response = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent':
          'nikhil-verma-portfolio (+https://nikhil-verma-in.vercel.app)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) return null

    const html = await response.text()
    let total = 0
    let days = 0

    for (const match of html.matchAll(/(\d+) contributions? on /g)) {
      total += Number(match[1])
      days += 1
    }

    // No calendar cells means the markup changed; fail rather than report zero.
    if (days === 0) return null

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
