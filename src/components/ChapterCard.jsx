import { motion } from 'framer-motion'

export default function ChapterCard({ chapter }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 p-5 backdrop-blur-lg"
    >
      {chapter.cover_image && (
        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl">
          <img src={chapter.cover_image} alt={chapter.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-white">{chapter.title}</h3>
      {chapter.subtitle && <p className="text-sm text-gray-300 mt-1">{chapter.subtitle}</p>}
      {chapter.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {chapter.tags.map((t) => (
            <span key={t} className="text-xs text-cyan-300/90 bg-cyan-300/10 border border-cyan-300/20 rounded-full px-3 py-1">#{t}</span>
          ))}
        </div>
      )}
      <p className="mt-4 text-gray-200/90 line-clamp-3">{chapter.body}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-400">{chapter.media?.length || 0} media</span>
        <a href="#" className="text-sm font-medium text-cyan-300 hover:text-cyan-200">Open</a>
      </div>
    </motion.article>
  )
}
