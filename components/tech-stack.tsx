"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"

type TechItem = {
  name: string
  emoji: string
  color: string
}

const techStack: TechItem[] = [
  { name: "React", emoji: "⚛️", color: "bg-pastel-blue" },
  { name: "Next.js", emoji: "▲", color: "bg-white" },
  { name: "TypeScript", emoji: "TS", color: "bg-pastel-blue" },
  { name: "TailwindCSS", emoji: "🌊", color: "bg-pastel-blue" },
  { name: "JavaScript", emoji: "JS", color: "bg-pastel-yellow" },
  { name: "HTML5", emoji: "🌐", color: "bg-pastel-pink" },
  { name: "CSS3", emoji: "🎨", color: "bg-pastel-blue" },
  { name: "Node.js", emoji: "🟢", color: "bg-pastel-green" },
  { name: "Git", emoji: "🔄", color: "bg-pastel-pink" },
  { name: "Figma", emoji: "🎭", color: "bg-pastel-purple" },
]

export default function TechStack() {
  return (
    <section className="py-16 relative">
      <div className="absolute -right-20 top-0 rotate-12 opacity-30 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Coding--Streamline-Dhaka-NeAKPCjiQVJHHNo2rMjGaMahrvJF0E.png"
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
        className="mb-12"
      >
        <div className="card-note bg-pastel-green inline-block p-4 transform rotate-[1deg] mb-4">
          <h2 className="text-3xl font-bold handwritten">My Tech Stack</h2>
        </div>
        <p className="text-gray-700 max-w-2xl">These are the technologies I work with to bring ideas to life.</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20, rotate: Math.random() * 6 - 3 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              transition: { type: "spring", stiffness: 400 },
            }}
            className={`transform rotate-${Math.floor(Math.random() * 3) - 1}deg`}
          >
            <Card
              className={`${tech.color} p-4 h-full flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-shadow`}
            >
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <span className="text-2xl">{tech.emoji}</span>
              </div>
              <p className="font-medium handwritten">{tech.name}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
