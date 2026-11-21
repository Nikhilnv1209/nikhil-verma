import { useEffect, useState } from 'react'
import { loadContributions, loadVisits } from './live-stats'

type LiveStats = {
  visits: number | null
  contributions: number | null
}

const initial: LiveStats = { visits: null, contributions: null }

export function useLiveStats(): LiveStats {
  const [stats, setStats] = useState<LiveStats>(initial)

  useEffect(() => {
    let active = true

    // Each number lands as soon as it is ready, so a slow one never blocks the
    // other from appearing.
    loadVisits().then((visits) => {
      if (active) setStats((current) => ({ ...current, visits }))
    })

    loadContributions().then((contributions) => {
      if (active) setStats((current) => ({ ...current, contributions }))
    })

    return () => {
      active = false
    }
  }, [])

  return stats
}
