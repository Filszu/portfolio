import { Github, Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 border-t border-gray-200 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-600 mb-4 md:mb-0 flex items-center">
          <span>Made with</span>
          <Heart className="h-4 w-4 mx-1 text-pastel-pink inline fill-pastel-pink" />
          <span>by</span>
          <span className="font-nunito font-semibold ml-1"><Link href="/easter-egg/50-shades-of-filszu" className="cursor-zoom-in">filszu</Link></span>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/Filszu/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="h-4 w-4 mr-1" />
            <span>Leave a star on GitHub</span>
          </Link>

          <span className="text-sm text-gray-400">|</span>

          <Link
            href="https://filszu.vercel.app"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            © {new Date().getFullYear()} Filip Szumowski
          </Link>
        </div>
      </div>
    </footer>
  )
}
