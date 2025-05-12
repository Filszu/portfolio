"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

type CareerStep = {
  id: number
  year: string
  title: string
  description: string
  color: string
}

const careerSteps: CareerStep[] = [
  {
    id: 1,
    year: "2017",
    title: "Getting know what programming is",
    description: "Priamry School: Began my journey with Scratch, learning the basics of programming.",
    color: "bg-pastel-green",
  },
  {
    id: 2,
    year: "2018",
    title: "Started Learning Web Development",
    description: "Began my journey with HTML, CSS, and JavaScript fundamentals.",
    color: "bg-pastel-yellow",
  },
   {
    id: 3,
    year: "2020",
    title: "Education - programming technician",
    description: "Started studying at CKZiU Elektronik as a technician in computer science.",
    color: "bg-pastel-pink",
  },
  {
    id: 4,
    year: "2021",
    title: "Learned React & Modern Frameworks",
    description: "Expanded my skills with React, Next.js, and modern frontend tools.",
    color: "bg-pastel-blue",
  },
  {
    id: 5,
    year: "2022",
    title: "Full-Stack Development",
    description: "Mastered backend technologies and database management.",
    color: "bg-pastel-green",
  },
  {
    id: 6,
    year: "2023",
    title: "First Freelance Projects",
    description: "Started working on small websites and applications for clients.",
    color: "bg-pastel-pink",
  },
  {
    id: 7,
    year: "2023-now",
    title: "Advanced Projects & Specialization",
    description: "Fullfilling my passion of crating proceess and created my own projects.",
    color: "bg-pastel-purple",
  },
]

export default function CareerPath() {
  return (
    <section className="py-16 relative">
      <div className="absolute -left-10 top-20 -rotate-6 opacity-30 z-0">
        <Image src="/images/profile.png" alt="Decorative illustration" width={300} height={300} />
      </div>

      {/* Work-Life Balance Image */}
      <div className="absolute -right-10 bottom-20 rotate-6 opacity-40 z-0">
        <Image src="/images/work-life-balance.png" alt="Work-life balance illustration" width={300} height={200} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="card-note bg-pastel-pink inline-block p-4 transform rotate-[-1deg] mb-4">
          <h2 className="text-3xl font-bold handwritten">My Career Path</h2>
        </div>
        <p className="text-gray-700 max-w-2xl">The journey that brought me to where I am today.</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

        {careerSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative mb-12 md:mb-24 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
          >
            <div className={`flex items-center ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
              <div
                className={`
                absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 border-white shadow-md z-10
                transform -translate-x-1/2 ${step.color}
              `}
              ></div>

              <Card
                className={`
                relative ml-12 md:ml-0 ${step.color} shadow-md
                ${index % 2 === 0 ? "md:mr-8 transform rotate-1" : "md:ml-8 transform rotate-[-1deg]"}
                w-full md:w-[calc(50%-2rem)] 
              `}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="handwritten text-xl">{step.title}</CardTitle>
                    <span className="text-sm font-bold bg-white px-2 py-1 rounded-full shadow-sm">{step.year}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{step.description}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
