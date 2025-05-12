"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Instagram, Linkedin } from "lucide-react"
import ContactFormModal from "@/components/contact-form-modal"
import Image from "next/image"

export default function Contact() {
  return (
    <section className="py-16 relative">
      {/* Business Deal Success Image */}
      <div className="absolute -right-10 top-10 rotate-6 opacity-40 z-0">
        <Image
          src="/images/business-deal-success.png"
          alt="Business deal success illustration"
          width={250}
          height={250}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="card-note bg-pastel-blue inline-block p-4 transform rotate-[1deg] mb-4">
          <h2 className="text-3xl font-bold handwritten">Get In Touch</h2>
        </div>
        <p className="text-gray-700 max-w-2xl">
          Have a project in mind or just want to say hello? I'd love to hear from you!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="bg-pastel-yellow transform rotate-[-1deg] shadow-md">
            <CardHeader>
              <CardTitle className="handwritten text-2xl">Contact Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                Ready to start a project together? Have questions about my work? Click the button below to send me a
                message!
              </p>
              <ContactFormModal />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="bg-pastel-green transform rotate-[1deg] shadow-md">
            <CardHeader>
              <CardTitle className="handwritten text-2xl">Connect With Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">Follow me on social media to see my latest projects and updates.</p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white hover:bg-gray-100 border border-gray-300 shadow-sm"
                  asChild
                >
                  <a href="https://github.com/filszu" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white hover:bg-gray-100 border border-gray-300 shadow-sm"
                  asChild
                >
                  <a href="https://www.instagram.com/filip_kyokushin/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-5 w-5" />
                    Instagram
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white hover:bg-gray-100 border border-gray-300 shadow-sm"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/filshu/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
