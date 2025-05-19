"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import projectsData from "@/data/project-details.json";

type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  mainImage: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
};

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);

  const featuredProjects = projectsData.filter((project) => project.featured);
  const otherProjects = projectsData
    .filter((project) => !project.featured)
    .slice(0, 3);

  useEffect(() => {
    // Set up intersection observer to detect when the section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } 
    );

    const section = document.getElementById("projects-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="projects-section" className="py-16 relative">
      <div className="absolute -left-10 bottom-20 -rotate-12 opacity-30 z-0">
        <Image
          src="/images/penguins.png"
          alt="Decorative illustration"
          width={300}
          height={300}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12 relative z-10"
      >
        <div className="card-note bg-pastel-purple inline-block p-4 transform rotate-[-1deg] mb-4">
          <h2 className="text-3xl font-bold handwritten">My Projects</h2>

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
          Here are some of my favorite projects. Each one represents a unique
          challenge and learning experience.
        </p>
      </motion.div>

      <div className="mb-16">
        <h3 className="text-xl font-semibold mb-6 handwritten sticky-note inline-block px-4 py-2">
          Featured Projects
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.03,
                rotate: project.id % 2 === 0 ? 1 : -1,
                transition: { type: "spring", stiffness: 400 },
              }}
              className={`transform ${
                project.id % 2 === 0 ? "rotate-1" : "rotate-[-1deg]"
              }`}
            >
              <Card className="overflow-hidden h-full border-2 border-gray-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
                <div className="cursor-pointer">
                  <Link href={`/projects/${project.slug}`} className="block">
                    <div className="relative w-full aspect-video">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                      >
                        <Image
                          src={project.mainImage || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </motion.div>
                    </div>
                    <CardHeader>
                      <CardTitle className="handwritten text-xl">
                        {project.title}
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-pastel-yellow"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                </div>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    className="bg-pastel-blue hover:bg-blue-200 text-gray-800"
                    asChild
                  >
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
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 handwritten sticky-note inline-block px-4 py-2">
          Other Projects
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                transition: { type: "spring", stiffness: 400 },
              }}
              className="transform rotate-[-1deg]"
            >
              <Card className="overflow-hidden h-full border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow rounded-xl opacity-90 hover:opacity-100">
                <div className="cursor-pointer">
                  <Link href={`/projects/${project.slug}`} className="block">
                    <div className="relative w-full aspect-video">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                      >
                        <Image
                          src={project.mainImage || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </motion.div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="handwritten text-lg">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs bg-pastel-green"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                </div>
                <CardFooter className="pt-0 flex justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1 h-3 w-3" />
                        Code
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs bg-pastel-green/20"
                      asChild
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Play className="mr-1 h-3 w-3" />
                        Demo
                      </a>
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    className="bg-pastel-blue hover:bg-blue-200 text-gray-800"
                    asChild
                  >
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Button
            className="bg-pastel-blue hover:bg-blue-200 text-gray-800 border border-gray-300 shadow-sm handwritten"
            asChild
          >
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
