"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Modal, ModalTrigger, ModalBody, ModalContent } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send } from "lucide-react"
import Image from "next/image"

export default function ContactFormModal() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create mailto link with form data
    const subject = encodeURIComponent("Cooperation")
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`,
    )

    // Open email client with pre-filled data
    window.location.href = `mailto:filipszumowski05@gmail.com?subject=${subject}&body=${body}`

    // Show success message and reset form after a delay
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      setTimeout(() => {
        setSubmitSuccess(false)
        setFormState({ name: "", email: "", subject: "", message: "" })
      }, 3000)
    }, 1000)
  }

  return (
    <Modal>
      <ModalTrigger className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 shadow-sm handwritten flex justify-center group/modal-btn relative overflow-hidden">
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          Let&apos;s Chat
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-gray-800 z-20">
          <span className="handwritten text-lg">✉️ Message Me!</span>
        </div>
      </ModalTrigger>

      <ModalBody className="bg-transparent border-none">
        <div className="relative w-full h-full overflow-hidden">
          {/* Decorative elements */}
          <motion.div
            className="absolute -right-10 -top-10 z-0 opacity-30 hidden md:block"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 0.3, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/images/coding.png" alt="Decorative illustration" width={200} height={200} />
          </motion.div>

          <motion.div
            className="absolute -left-10 bottom-10 z-0 opacity-30 hidden md:block"
            initial={{ opacity: 0, rotate: 10 }}
            animate={{ opacity: 0.3, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/images/penguins.png" alt="Decorative illustration" width={200} height={200} />
          </motion.div>

          <ModalContent className="notebook-paper p-0 border-2 border-gray-300 shadow-lg transform rotate-[-1deg] h-full md:h-auto overflow-auto">
            <div className="bg-pastel-yellow p-6 transform rotate-[1deg] -mt-4 -ml-4 shadow-md">
              <h2 className="text-2xl font-bold handwritten mb-1">Let's Chat!</h2>
              <p className="text-gray-700 text-sm">Fill out this form and I'll get back to you soon.</p>
            </div>

            {submitSuccess ? (
              <div className="p-8 pt-10 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-pastel-green p-6 rounded-lg shadow-md text-center mb-6"
                >
                  <h3 className="text-xl font-bold handwritten mb-2">Message Sent!</h3>
                  <p>Thanks for reaching out. I'll get back to you soon!</p>
                </motion.div>
                <div className="sticky-note transform rotate-[3deg] p-3 text-sm">
                  <p className="handwritten">
                    Your email client should have opened with your message. If not, please email me directly at
                    filipszumowski05@gmail.com
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="mb-6 relative">
                    <label htmlFor="name" className="handwritten text-lg font-semibold mb-2 block">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-b-2 border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none px-2 py-1 focus:border-pastel-blue focus:ring-0 handwritten"
                      placeholder="What should I call you?"
                    />
                    <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gray-200"></div>
                  </div>

                  <div className="mb-6 relative">
                    <label htmlFor="email" className="handwritten text-lg font-semibold mb-2 block">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-b-2 border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none px-2 py-1 focus:border-pastel-blue focus:ring-0 handwritten"
                      placeholder="Where can I reach you?"
                    />
                    <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gray-200"></div>
                  </div>
                </div>

                <div className="mb-6 relative">
                  <label htmlFor="subject" className="handwritten text-lg font-semibold mb-2 block">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="bg-transparent border-b-2 border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none px-2 py-1 focus:border-pastel-blue focus:ring-0 handwritten"
                    placeholder="What's this about?"
                  />
                  <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gray-200"></div>
                </div>

                <div className="mb-6 relative">
                  <label htmlFor="message" className="handwritten text-lg font-semibold mb-2 block">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="bg-transparent border-2 border-gray-400 rounded-md px-3 py-2 min-h-[150px] focus:border-pastel-blue focus:ring-0 handwritten"
                    placeholder="What's on your mind?"
                  />
                  <div className="absolute -bottom-1 left-2 right-2 h-[1px] bg-gray-200"></div>
                </div>

                <div className="sticky-note transform rotate-[3deg] p-3 text-sm mb-6 ml-auto mr-4 w-fit">
                  <p className="handwritten">Can't wait to hear from you! 😊</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    className="bg-pastel-pink p-3 rounded-md shadow-sm transform rotate-[-1deg]"
                  >
                    <p className="handwritten text-sm">All messages are confidential!</p>
                  </motion.div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="bg-pastel-blue hover:bg-blue-200 text-gray-800 border border-gray-300 shadow-sm handwritten"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-gray-800 border-t-transparent rounded-full"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send It!
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </ModalContent>
        </div>
      </ModalBody>
    </Modal>
  )
}
