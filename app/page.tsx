import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import TechStack from "@/components/tech-stack"
import CareerPath from "@/components/career-path"
import { ScrollArea } from "@/components/ui/scroll-area"
import RegisterSW from "./register-sw"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <RegisterSW />
      <ScrollArea className="min-h-screen">
        <Hero />
        <div className="h-20" />
        <main className="container mx-auto px-4 py-8">
          <Projects />
          <TechStack />
          <CareerPath />
          <Contact />
        </main>
      </ScrollArea>
    </div>
  )
}
