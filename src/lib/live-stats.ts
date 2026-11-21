export type LiveStats = {
  visits: number | null
  contributions: number | null
}

const SESSION_KEY = 'portfolio:visited'
const ENDPOINT = '/api/stats'

// One request per page load, shared by every component that asks for stats.
let request: Promise<LiveStats | null> | null = null

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

export function loadLiveStats(): Promise<LiveStats | null> {
  if (request) return request

  request = (async () => {
    const seen = hasVisited()

    // POST counts a new session; GET only reads, so a refresh does not inflate.
    const response = await fetch(ENDPOINT, {
      method: seen ? 'GET' : 'POST',
    })

    if (!response.ok) return null

    const payload = (await response.json()) as {
      visits?: unknown
      contributions?: unknown
    }

    const visits = typeof payload.visits === 'number' ? payload.visits : null
    const contributions =
      typeof payload.contributions === 'number' ? payload.contributions : null

    if (!seen && visits !== null) markVisited()

    return { visits, contributions }
  })().catch(() => null)

  return request
}
