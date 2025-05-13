"use client"
import { ShootingStars } from "./ui/shooting-stars"
import { StarsBackground } from "./ui/stars-background"

export default function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <div className="h-screen rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">50 Shades of Filszu</h1>
        <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
          <GlareCardDemo />
        </div>
        <p className="text-gray-400 text-center max-w-md mx-auto mt-6">
          You found the secret page! Refresh to see a different shade of Filszu.
        </p>
      </div>
      <ShootingStars starColor="#FFD6E0" trailColor="#FFB6C1" minSpeed={15} maxSpeed={35} />
      <StarsBackground starDensity={0.0003} allStarsTwinkle={true} />
    </div>
  )
}

import GlareCardDemo from "./glare-card-demo"
