"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-64 h-64 mx-auto">
            <DotLottieReact
              src="https://lottie.host/0abf08b6-dd1e-4766-a314-fa9d257b509e/QxdZlYc9TQ.lottie"
              loop
              autoplay
            />
          </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="card-note bg-pastel-yellow inline-block p-4 transform rotate-[1deg] mt-4">
            <h2 className="text-xl font-bold handwritten">Loading my notebook...</h2>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
