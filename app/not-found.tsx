"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="notebook-paper p-8 max-w-md w-full transform rotate-[-1deg] border-2 border-gray-300 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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

          <h1 className="text-3xl font-bold handwritten mt-4 mb-2">Oops! Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            Looks like you've wandered into uncharted territory. This page doesn't exist in my notebook.
          </p>

          <div className="sticky-note transform rotate-[3deg] p-3 text-sm mb-6 mx-auto w-fit">
            <p className="handwritten">Let's get you back on track! 📝</p>
          </div>

          <motion.div whileHover={{ scale: 1.05, rotate: 0 }} className="transform rotate-[-1deg] inline-block">
            <Button
              asChild
              className="bg-pastel-blue hover:bg-blue-200 text-gray-800 border border-gray-300 shadow-sm handwritten"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
