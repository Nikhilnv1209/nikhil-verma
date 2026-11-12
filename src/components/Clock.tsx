import { useEffect, useState } from 'react'

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-GB', { hour12: false })
}

export function Clock() {
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  return <span className="tabular-nums">{time}</span>
}
