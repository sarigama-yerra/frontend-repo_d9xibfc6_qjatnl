import Hero from './components/Hero'
import Chapters from './components/Chapters'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Chapters />
      <section id="about" className="bg-[#0b0b15] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About this Journey</h2>
          <p className="mt-4 max-w-3xl text-gray-300 leading-relaxed">
            This is a living, multimedia edition of an autobiographical novel. It fuses manuscript text with images,
            video, and audio to evoke both the ancient and the futuristic. As you read, you’ll encounter embedded
            memories, artifacts, and soundscapes that deepen the experience.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default App
