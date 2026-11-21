const SESSION_KEY = 'portfolio:visited'

let visitsRequest: Promise<number | null> | null = null
let contributionsRequest: Promise<number | null> | null = null

function hasVisited(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) !== null
  } catch {
    return false
  }
}

function markVisited() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // sessionStorage can be unavailable in restricted browser modes.
  }
}

/** One POST per browser session; later loads only read. */
export function loadVisits(): Promise<number | null> {
  if (visitsRequest) return visitsRequest

  visitsRequest = (async () => {
    const seen = hasVisited()

    const response = await fetch('/api/visits', {
      method: seen ? 'GET' : 'POST',
    })

    if (!response.ok) return null

    const payload = (await response.json()) as { visits?: unknown }
    const visits = typeof payload.visits === 'number' ? payload.visits : null

    if (!seen && visits !== null) markVisited()

    return visits
  })().catch(() => null)

  return visitsRequest
}

/* Cached by the browser (5 min) and by Vercel's edge (1 hour), so this is
   usually served without touching the function or Redis at all. */
export function loadContributions(): Promise<number | null> {
  if (contributionsRequest) return contributionsRequest

  contributionsRequest = (async () => {
    const response = await fetch('/api/contributions')
    if (!response.ok) return null

    const payload = (await response.json()) as { total?: unknown }
    return typeof payload.total === 'number' ? payload.total : null
  })().catch(() => null)

  return contributionsRequest
}
