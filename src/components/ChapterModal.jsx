import { motion, AnimatePresence } from 'framer-motion'
import ReadingProgress from './ReadingProgress'
import { highlightText } from './SearchHighlights'

export default function ChapterModal({ open, onClose, chapter, query }) {
  return (
    <AnimatePresence>
      {open && chapter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="w-full sm:max-w-3xl max-h-[90vh] overflow-hidden rounded-t-2xl sm:rounded-2xl bg-[#0b0b15] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {chapter?.cover_image?.url && (
                <img
                  src={chapter.cover_image.url}
                  alt={chapter.cover_image.alt_text || chapter.title}
                  className="h-48 w-full object-cover"
                />)
              }
              <button
                aria-label="Close"
                onClick={onClose}
                className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-12rem)]">
              <div className="mb-4">
                <ReadingProgress text={chapter.body || ''} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">{highlightText(chapter.title, query)}</h3>
              {chapter.subtitle && (
                <p className="mt-1 text-sm text-gray-400">{highlightText(chapter.subtitle, query)}</p>
              )}
              {chapter.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {chapter.tags.map((t) => (
                    <span key={t} className="text-xs text-cyan-300/90 bg-cyan-300/10 border border-cyan-300/20 rounded-full px-3 py-1">#{t}</span>
                  ))}
                </div>
              )}
              <div id="chapter-body" className="prose prose-invert mt-6 whitespace-pre-wrap leading-relaxed">
                {highlightText(chapter.body, query)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
