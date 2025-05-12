"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

interface AnimatedLottieProps {
  src: string
  threshold?: number // optional: customize how much needs to be visible
  loop?: boolean
  className?: string
}

const AnimatedLottie: React.FC<AnimatedLottieProps> = ({ src, threshold = 0.5, loop = false, className = "" }) => {
  const [dotLottie, setDotLottie] = useState<any>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  const dotLottieRefCallback = (instance: any) => {
    setDotLottie(instance)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed && dotLottie) {
          dotLottie.play()
          setHasPlayed(true)
        }
      },
      { threshold },
    )

    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [dotLottie, hasPlayed, threshold])

  return (
    <div ref={containerRef} className={className}>
      <DotLottieReact src={src} loop={loop} autoplay={false} dotLottieRefCallback={dotLottieRefCallback} />
    </div>
  )
}

export default AnimatedLottie
