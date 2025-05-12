"use client"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import type React from "react"
import { type ReactNode, createContext, useContext, useEffect, useRef, useState } from "react"

interface ModalContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)

  return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const { setOpen } = useModal()
  return (
    <button
      className={cn("px-4 py-2 rounded-md text-black dark:text-white text-center relative overflow-hidden", className)}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  )
}

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const { open } = useModal()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [open])

  const modalRef = useRef(null)
  const { setOpen } = useModal()
  useOutsideClick(modalRef, () => setOpen(false))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 h-full w-full flex items-center justify-center z-[100]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 bg-black"
            onClick={() => setOpen(false)}
          />

          <motion.div
            ref={modalRef}
            className={cn(
              "w-full h-full md:h-auto md:max-h-[90vh] md:max-w-[90%] lg:max-w-[80%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-[101] flex flex-col overflow-hidden",
              className,
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              y: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <div className={cn("flex flex-col flex-1 p-8 md:p-10 overflow-hidden", className)}>{children}</div>
}

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <div className={cn("flex justify-end p-4 bg-gray-100 dark:bg-neutral-900", className)}>{children}</div>
}

const CloseIcon = () => {
  const { setOpen } = useModal()
  return (
    <button onClick={() => setOpen(false)} className="absolute top-4 right-4 group z-[102]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  )
}

// Hook to detect clicks outside of a component.
export const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: Function) => {
  useEffect(() => {
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      callback(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, callback])
}
