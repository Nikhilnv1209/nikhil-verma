import { useEffect, useState } from 'react'
import { loadLiveStats, type LiveStats } from './live-stats'

const initial: LiveStats = { visits: null, contributions: null }

export function useLiveStats(): LiveStats {
  const [stats, setStats] = useState<LiveStats>(initial)

  useEffect(() => {
    let active = true

    loadLiveStats().then((value) => {
      if (active && value) setStats(value)
    })

    return () => {
      active = false
    }
  }, [])

  return stats
}
