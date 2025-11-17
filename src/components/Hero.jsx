import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Overlay gradients and copy */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70 pointer-events-none" />

      <div className="relative z-10 h-full container mx-auto px-6 flex flex-col items-start justify-end pb-14">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          A Cosmic Autobiography
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200"
        >
          A living manuscript woven with images, video, and sound — futuristic and ancient, intimate and vast.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-8 flex gap-3"
        >
          <a href="#chapters" className="inline-flex items-center rounded-full bg-white/10 backdrop-blur px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition">
            Explore Chapters
          </a>
          <a href="#about" className="inline-flex items-center rounded-full bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-black hover:brightness-110 transition">
            About the Project
          </a>
        </motion.div>
      </div>
    </section>
  )
}
