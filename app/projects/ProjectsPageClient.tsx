"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, Play, X } from "lucide-react"
import Image from "next/image"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import Link from "next/link"
import projectsData from "@/data/project-details.json"

export default function ProjectsPageClient() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filteredProjects, setFilteredProjects] = useState(projectsData)

  // Extract all unique tags from projects
  const allTags = Array.from(new Set(projectsData.flatMap((project) => project.tags))).sort()

  // Update filtered projects when filters change
  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredProjects(projectsData)
    } else {
      setFilteredProjects(
        projectsData.filter((project) => activeFilters.some((filter) => project.tags.includes(filter))),
      )
    }
  }, [activeFilters])

  // Toggle filter
  const toggleFilter = (tag: string) => {
    if (activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter((filter) => filter !== tag))
    } else {
      setActiveFilters([...activeFilters, tag])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([])
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 relative z-10"
        >
          <div className="card-note bg-pastel-purple inline-block p-4 transform rotate-[-1deg] mb-4">
            <h1 className="text-3xl font-bold handwritten">My Projects</h1>

            {/* Lottie animation behind the heading */}
            <div className="absolute -top-40 -left-40 w-full h-64 z-0 pointer-events-none">
              <div className="w-64 h-64 mx-auto">
                <DotLottieReact
                  src="https://lottie.host/64a331d9-eb0f-415c-bf70-719e15ac82a6/N4kXDwKeLQ.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
          </div>
          <p className="text-gray-700 max-w-2xl">
            Browse through my portfolio of projects. Click on any project to see more details.
          </p>
        </motion.div>

        {/* Filter tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-pastel-yellow p-4 border-2 border-gray-200 shadow-md transform rotate-[0.5deg]">
            <h2 className="text-lg font-bold mb-3 handwritten">Filter by technology:</h2>
            <div className="flex flex-wrap gap-2">
              {activeFilters.length > 0 && (
                <Badge
                  variant="outline"
                  className="bg-pastel-pink cursor-pointer flex items-center"
                  onClick={clearFilters}
                >
                  Clear all filters
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}

              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`cursor-pointer ${activeFilters.includes(tag) ? "bg-pastel-green" : "bg-white"}`}
                  onClick={() => toggleFilter(tag)}
                >
                  {tag}
                  {activeFilters.includes(tag) && <X className="ml-1 h-3 w-3" />}
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{
                scale: 1.03,
                rotate: project.id % 2 === 0 ? 1 : -1,
                transition: { type: "spring", stiffness: 400 },
              }}
              className={`transform ${project.id % 2 === 0 ? "rotate-1" : "rotate-[-1deg]"}`}
            >
              <Card className="overflow-hidden h-full border-2 border-gray-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="cursor-pointer">
                  <Link href={`/projects/${project.slug}`} className="block">
                    <div className="relative w-full aspect-video">
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full h-full">
                        <Image
                          src={project.mainImage || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </motion.div>
                      {project.featured && (
                        <div className="absolute top-2 right-2 bg-pastel-pink px-2 py-1 rounded-md shadow-sm transform rotate-[-3deg]">
                          <span className="text-xs font-bold handwritten">Featured</span>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="handwritten text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className={`bg-pastel-yellow ${activeFilters.includes(tag) ? "ring-2 ring-green-500" : ""}`}
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && <Badge variant="outline">+{project.tags.length - 3}</Badge>}
                      </div>
                    </CardContent>
                  </Link>
                </div>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-pastel-green hover:bg-green-200 text-gray-800"
                      asChild
                    >
                        <Link
                        href={
                          project.demoUrl
                          ? `${project.demoUrl}${project.demoUrl.includes('?') ? '&' : '?'}utm_source=filszu_portfolio`
                          : ""
                        }
                        target="_blank"
                        // rel="noopener noreferrer"
                        >
                        <Play className="mr-2 h-4 w-4" />
                        Demo
                        </Link>
                    </Button>
                  </div>

                  <Button size="sm" className="bg-pastel-blue hover:bg-blue-200 text-gray-800" asChild>
                    <Link href={`/projects/${project.slug}`}>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-64 h-64 mx-auto">
              <DotLottieReact
                src="https://lottie.host/2f4a3dd8-8b62-41c9-8305-5837004543df/1q3usIpAjV.lottie"
                loop
                autoplay
              />
            </div>
            <div className="card-note bg-pastel-pink inline-block p-4 transform rotate-[-1deg] mt-4 mb-6">
              <h2 className="text-xl font-bold handwritten">No projects found with those filters!</h2>
            </div>
            <Button
              onClick={clearFilters}
              className="bg-pastel-blue hover:bg-blue-200 text-gray-800 border border-gray-300 shadow-sm handwritten"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
