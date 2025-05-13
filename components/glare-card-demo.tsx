"use client"

import { GlareCard } from "@/components/ui/glare-card"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function GlareCardDemo() {
  const [randomImage, setRandomImage] = useState<number>(1)
  const [randomGradient, setRandomGradient] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Generate a random number between 1 and 4 for images
    const randomNum = Math.floor(Math.random() * 4) + 1
    // Generate a random number between 0 and 4 for gradients
    const randomGradientNum = Math.floor(Math.random() * 5)

    setRandomImage(randomNum)
    setRandomGradient(randomGradientNum)
    setIsLoaded(true)
  }, [])

  const imageUrls = {
    1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1.jpg-CoAk05fkxBJciM7u1iKxBqFgZYbB7U.jpeg",
    2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.jpg-K0sj0fQS6bqVfI9vh41i9OxAQKyfZh.jpeg",
    3: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.jpg-6gf0MUIeFIkl7liy8DNRw8ohV2oyGC.jpeg",
    4: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.jpg-kkPmi8CTurkzwEQ4neMIZ19c9dRRNb.jpeg",
  }

  // Predefined gradient styles
  const gradients = [
    "from-amber-500 to-yellow-300", // Gold
    "from-blue-500 to-cyan-300", // Blue
    "from-purple-500 to-pink-300", // Purple/Pink
    "from-emerald-500 to-teal-300", // Green
    "from-rose-500 to-orange-300", // Sunset
  ]

  const gradientNames = ["Golden Filszu", "Ocean Filszu", "Cosmic Filszu", "Emerald Filszu", "Sunset Filszu"]

  return (
    <GlareCard
      className={`flex flex-col items-center justify-center p-0 bg-gradient-to-br ${gradients[randomGradient]} w-[400px] h-[500px]`}
    >
      {isLoaded && (
        <>
          <div className="relative w-full h-full rounded-[var(--radius)] overflow-hidden">
            <Image
              src={imageUrls[randomImage as keyof typeof imageUrls] || "/placeholder.svg"}
              alt="Filip Szumowski"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <p className="text-white font-bold text-2xl">{gradientNames[randomGradient]}</p>
              <p className="text-gray-200 text-sm mt-1">Shade #{randomImage} • Hover to see the magic ✨</p>
            </div>
          </div>
        </>
      )}
    </GlareCard>
  )
}
