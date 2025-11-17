import { useEffect, useState } from 'react'
import ChapterCard from './ChapterCard'

export default function Chapters() {
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/chapters`)
        if (!res.ok) throw new Error(`Failed: ${res.status}`)
        const data = await res.json()
        setChapters(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="chapters" className="relative w-full py-16 md:py-24 bg-gradient-to-b from-black to-[#0b0b15] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_60%)]" />
      <div className="relative container mx-auto px-6">
        <div className="mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Chapters</h2>
          <p className="mt-2 text-gray-300 max-w-2xl">Browse moments of the journey. Each chapter blends narrative with imagery, video, and sound.</p>
        </div>

        {loading && <p className="text-gray-400">Loading chapters...</p>}
        {error && <p className="text-red-400">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c) => (
            <ChapterCard key={`${c.title}-${c.order}`} chapter={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
