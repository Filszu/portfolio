import ShootingStarsAndStarsBackgroundDemo from "@/components/shooting-stars-and-stars-background-demo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "50 Shades of Filszu | Easter Egg",
  description: "You found the secret page!",
}

export default function FiftyShades() {
  return <ShootingStarsAndStarsBackgroundDemo />
}
