import { useEffect, useMemo, useState } from 'react'

export default function ReadingProgress({ text, className = '' }) {
  const [progress, setProgress] = useState(0)
  const words = useMemo(() => (text ? text.trim().split(/\s+/).length : 0), [text])
  const minutes = Math.max(1, Math.round(words / 200))

  useEffect(() => {
    function onScroll() {
      const el = document.querySelector('#chapter-body')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height
      const visibleBottom = Math.min(window.innerHeight, Math.max(0, window.innerHeight - Math.max(0, rect.top)))
      const scrolled = Math.min(Math.max(visibleBottom, 0), total)
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0
      setProgress(pct)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`relative w-full ${className}`}>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-white/70">
        <span>{minutes} min read</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  )
}
