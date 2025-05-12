"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github, Play, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

type Screenshot = {
  image: string
  description: string
}

type Project = {
  id: number
  slug: string
  title: string
  description: string
  longDescription: string
  mainImage: string
  tags: string[]
  demoUrl: string
  githubUrl: string
  featured: boolean
  screenshots: Screenshot[]
}

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<Screenshot | null>(null)

  const openLightbox = (screenshot: Screenshot) => {
    setCurrentImage(screenshot)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const navigateToNextImage = () => {
    if (!project || !currentImage) return
    const currentIndex = project.screenshots.findIndex((s) => s.image === currentImage.image)
    const nextIndex = (currentIndex + 1) % project.screenshots.length
    setCurrentImage(project.screenshots[nextIndex])
  }

  const navigateToPrevImage = () => {
    if (!project || !currentImage) return
    const currentIndex = project.screenshots.findIndex((s) => s.image === currentImage.image)
    const prevIndex = (currentIndex - 1 + project.screenshots.length) % project.screenshots.length
    setCurrentImage(project.screenshots[prevIndex])
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeLightbox()
    }
    if (e.key === "ArrowRight") {
      navigateToNextImage()
    }
    if (e.key === "ArrowLeft") {
      navigateToPrevImage()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [currentImage, project])

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="bg-white hover:bg-gray-100 border border-gray-300 shadow-sm handwritten"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </motion.div>

        {/* Project title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="card-note bg-pastel-purple inline-block p-4 transform rotate-[-1deg] mb-4">
            <h1 className="text-3xl md:text-4xl font-bold handwritten">{project.title}</h1>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card
              className="overflow-hidden border-2 border-gray-200 shadow-lg rounded-xl transform rotate-[1deg] cursor-pointer"
              onClick={() =>
                project.mainImage && openLightbox({ image: project.mainImage, description: project.title })
              }
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={project.mainImage || "/placeholder.svg"}
                  alt={`${project.title} main screenshot`}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          </motion.div>

          {/* Project info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full border-2 border-gray-200 shadow-md bg-pastel-yellow transform rotate-[-1deg]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 handwritten">Project Details</h2>

                <p className="text-gray-700 mb-6">{project.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 handwritten">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    className="bg-pastel-green hover:bg-green-200 text-gray-800 border border-gray-300 shadow-sm w-full"
                    asChild
                  >
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Play className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-100 border border-gray-300 shadow-sm w-full"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Project description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="my-12"
        >
          <Card className="border-2 border-gray-200 shadow-md bg-pastel-blue transform rotate-[0.5deg]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 handwritten">About This Project</h2>
              <div className="prose max-w-none">
                {project.longDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Screenshots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-12"
        >
          <div className="sticky-note inline-block px-4 py-2 mb-6">
            <h2 className="text-2xl font-bold handwritten">Project Screenshots</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  rotate: index % 2 === 0 ? 1 : -1,
                  transition: { type: "spring", stiffness: 400 },
                }}
                className={`transform ${index % 2 === 0 ? "rotate-1" : "rotate-[-1deg]"}`}
                onClick={() => openLightbox(screenshot)}
              >
                <Card className="overflow-hidden border-2 border-gray-200 shadow-md cursor-pointer">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={screenshot.image || "/placeholder.svg"}
                      alt={screenshot.description || `${project.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-700 handwritten">{screenshot.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 mb-8 text-center"
        >
          <Card className="bg-pastel-green inline-block p-6 transform rotate-[1deg] border-2 border-gray-200 shadow-md">
            <h2 className="text-xl font-bold mb-4 handwritten">What's Next?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-pastel-pink hover:bg-pink-200 text-gray-800 border border-gray-300 shadow-sm handwritten"
                asChild
              >
                <Link href="/projects">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  View All Projects
                </Link>
              </Button>

              <Button
                className="bg-pastel-blue hover:bg-blue-200 text-gray-800 border border-gray-300 shadow-sm handwritten"
                asChild
              >
                <Link href="/contact">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Contact Me
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative w-full h-[70vh]">
                <Image
                  src={currentImage.image || "/placeholder.svg"}
                  alt={currentImage.description}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="bg-white p-4 mt-2 rounded-md">
                <p className="text-lg handwritten">{currentImage.description}</p>
              </div>

              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white rounded-full h-12 w-12 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateToPrevImage()
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>

              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white rounded-full h-12 w-12 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateToNextImage()
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
