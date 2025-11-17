export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 text-gray-400">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} Cosmic Autobiography. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm">
          <a className="hover:text-white" href="#about">About</a>
          <a className="hover:text-white" href="#chapters">Chapters</a>
          <a className="hover:text-white" href="/test">System</a>
        </div>
      </div>
    </footer>
  )
}
