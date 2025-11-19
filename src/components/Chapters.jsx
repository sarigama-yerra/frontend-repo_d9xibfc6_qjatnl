import { useEffect, useState, useMemo } from 'react'
import ChapterCard from './ChapterCard'
import ChapterModal from './ChapterModal'
import MapOverlay from './MapOverlay'

export default function Chapters() {
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [active, setActive] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/chapters`, { signal: controller.signal })
        if (!res.ok) throw new Error(`Failed: ${res.status}`)
        const data = await res.json()
        setChapters(data)
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return chapters
    const q = query.toLowerCase()
    return chapters.filter((c) =>
      [c.title, c.subtitle, c.location, c.body].some((v) =>
        (v || '').toLowerCase().includes(q)
      ) || (c.tags || []).some((t) => t.toLowerCase().includes(q))
        || (c.themes || []).some((t) => t.toLowerCase().includes(q))
    )
  }, [chapters, query])

  return (
    <section id="chapters" className="relative w-full py-16 md:py-24 bg-gradient-to-b from-black to-[#0b0b15] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_60%)]" />
      <div className="relative container mx-auto px-6">
        <div className="mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Chapters</h2>
          <p className="mt-2 text-gray-300 max-w-2xl">Browse moments of the journey. Each chapter blends narrative with imagery, video, and sound.</p>
          <div className="mt-6 flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chapters, tags, themes..."
              className="w-full md:w-1/2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            />
            <span className="text-sm text-gray-400">{filtered.length} results</span>
          </div>
        </div>

        {loading && <p className="text-gray-400">Loading chapters...</p>}
        {error && <p className="text-red-400">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <ChapterCard key={`${c.slug || c.title}-${c.order}`} chapter={c} onOpen={setActive} />
          ))}
        </div>
      </div>

      {/* Floating live map that follows selection */}
      <MapOverlay chapters={filtered} active={active} onSelect={setActive} />

      <ChapterModal open={!!active} onClose={() => setActive(null)} chapter={active} query={query} />
    </section>
  )
}
