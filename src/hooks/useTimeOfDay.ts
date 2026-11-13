import { useEffect, useState } from 'react'

export type TimeOfDay = 'day' | 'night'

const DAY_START_HOUR = 6
const DAY_END_HOUR = 18

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours()
  return hour >= DAY_START_HOUR && hour < DAY_END_HOUR ? 'day' : 'night'
}

export function useTimeOfDay(): TimeOfDay {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay)

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeOfDay((current) => {
        const next = getTimeOfDay()
        return next === current ? current : next
      })
    }, 60_000)

    return () => window.clearInterval(id)
  }, [])

  return timeOfDay
}
