"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github, Play } from "lucide-react"
import Link from "next/link"
import projectsData from "@/data/project-details.json"

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

export default function ProjectDetail() {
  const router = useRouter()
  const { "project-id": projectId } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Find the project by slug
    const foundProject = projectsData.find((p) => p.slug === projectId)

    if (foundProject) {
      setProject(foundProject)
      setLoading(false)
    } else {
      setError(true)
      setLoading(false)
    }
  }, [projectId])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-64 h-64 mx-auto">
          <DotLottieReact
            src="https://lottie.host/0abf08b6-dd1e-4766-a314-fa9d257b509e/QxdZlYc9TQ.lottie"
            loop
            autoplay
          />
        </div>
        <div className="card-note bg-pastel-yellow inline-block p-4 transform rotate-[1deg] mt-4">
          <h2 className="text-xl font-bold handwritten">Loading project details...</h2>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="w-64 h-64 mx-auto">
          <DotLottieReact
            src="https://lottie.host/2f4a3dd8-8b62-41c9-8305-5837004543df/1q3usIpAjV.lottie"
            loop
            autoplay
          />
        </div>
        <div className="card-note bg-pastel-pink inline-block p-4 transform rotate-[-1deg] mt-4 mb-6">
          <h2 className="text-xl font-bold handwritten">Project not found!</h2>
        </div>
        <Button
          onClick={() => router.push("/projects")}
          className="bg-pastel-blue hover:bg-blue-200 text-gray-800 border border-gray-300 shadow-sm handwritten"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </div>
    )
  }

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
            <Card className="overflow-hidden border-2 border-gray-200 shadow-lg rounded-xl transform rotate-[1deg]">
              <div className="relative h-[400px] w-full">
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
              >
                <Card className="overflow-hidden border-2 border-gray-200 shadow-md">
                  <div className="relative h-[250px] w-full">
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

          {/* Animation at the bottom */}
          <div className="w-32 h-32 mx-auto mt-8">
          
          </div>
        </motion.div>
      </div>
    </div>
  )
}
