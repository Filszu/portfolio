"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Card } from "@/components/ui/card";
import ColourfulText from "@/components/ui/colourful-text";
import ContactFormModal from "@/components/contact-form-modal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      const elements = containerRef.current.querySelectorAll(".tilt-element");
      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `perspective(1000px) rotateY(${
          x * 5
        }deg) rotateX(${y * -5}deg)`;
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <header className="w-full relative overflow-visible bg-white">
      <div className="grid-bg w-full h-full absolute inset-0">
        <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]"></div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div
        className="container mx-auto px-4 py-16 relative z-10"
        ref={containerRef}
      >
        <div className="absolute -right-10 top-10 rotate-12 opacity-30 z-0">
          <Image
            src="/images/painting.png"
            alt="Decorative illustration"
            width={300}
            height={300}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="md:w-1/2">
            <motion.div
              className="tilt-element card-note mb-6 p-6 bg-pastel-yellow transform rotate-[-1deg]"
              whileHover={{ scale: 1.02, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2 handwritten flex items-center">
                Hi, I&apos;m filszu <span className="wave ml-2">👋</span>
              </h1>
              <p className="text-gray-600 text-lg mb-2 handwritten">
                my name is filip you can call me Filszu <i>/filʃu/</i>
              </p>
              <p className="text-gray-700 mt-3">
                I'm a{" "}
                <span className="font-bold text-blue-600">
                  full-stack website developer
                </span>{" "}
                💻 with a passion for programming since childhood. <br />I love
                creating websites, especially meaningful tools that bring value
                to people and communities 🌍.
                <br />
                For me, coding is not just a job — it's a way to build, improve
                , and make a positive impact on the world around me ✨.
              </p>
            </motion.div>

            <motion.div
              className="tilt-element card-note p-6 bg-pastel-blue transform rotate-[1deg]"
              whileHover={{ scale: 1.02, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 handwritten whitespace-nowrap">
                Let&apos;s build <ColourfulText text="together" />
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                If you have an idea <span className="text-yellow-500">💡</span>{" "}
                or a project you’re passionate about —
                <span className="font-semibold text-blue-700">
                  {" "}
                  I’d love to help you bring it to life.
                </span>{" "}
                <br />
                Whether it’s a <span className=" ">personal website</span>, a
                <span className=" ">tool for your community</span>, or something
                completely new, I’m here to support you with{" "}
                <span className="">full-stack development skills</span>,
                <span className="">creative thinking</span>, and
                <span className="">real dedication</span>
                . <br />
                Let’s turn your vision into reality —{" "}
                <span className="font-bold text-pink-600">together 🤝</span>.
              </p>

              <a href="#projects-section">
                <motion.button
                  className="bg-pastel-pink hover:bg-pink-200 text-gray-800 font-semibold py-2 px-6 rounded-md shadow-sm transition-all duration-300 handwritten"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.button>
              </a>
            </motion.div>
          </div>

          <div className="md:w-2/5 flex flex-col gap-6">
            <motion.div
              className="tilt-element relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative w-full h-[400px] transform rotate-[2deg]">
                {/* Large screens: show 10.jpg */}
                <Image
                  src="/img/profile/10.jpg"
                  alt="Filszu profile"
                  fill
                  className="object-contain rounded-md hidden lg:block"
                />
                {/* Medium screens: show 12e.png */}
                <Image
                  src="/img/profile/12e.png"
                  alt="Filszu profile"
                  fill
                  className="object-contain rounded-md hidden md:block lg:hidden"
                />
                {/* Small screens: show 10.jpg */}
                <Image
                  src="/img/profile/12.jpg"
                  alt="Filszu profile"
                  fill
                  className="object-contain rounded-md block md:hidden"
                />
                <div className="absolute -bottom-4 -right-4 bg-pastel-green p-3 rounded-md shadow-md transform rotate-[-3deg] handwritten">
                  That&apos;s me!
                  <div className="absolute -top-14 -left-20 z-10 w-24 h-24 rotate-[13deg] ">
                    <DotLottieReact
                      src="https://lottie.host/454407d5-b6a3-42f7-bf25-0cab97139801/8JOdLgvoGK.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Card className="mt-10 p-5 bg-pastel-pink transform rotate-[-1deg] shadow-md text-center md:text-left">
                <h3 className="text-xl font-bold mb-3 handwritten">
                  Let&apos;s Connect!
                </h3>

                <div className="flex  justify-center md:justify-between items-center  flex-wrap-reverse gap-4 md:flex-row ">
                  <div className=" justify-center">
                    <ContactFormModal />
                  </div>
                  <div className="flex space-x-3 justify-center ">
                    <motion.a
                      href="https://www.instagram.com/filip_kyokushin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Profile"
                      className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center"
                      whileHover={{
                        scale: [1, 1.2, 1.1],
                        rotate: [0, 10, -10, 0],
                        backgroundColor: "#E1306C",
                        color: "white",
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <Instagram size={20} />
                    </motion.a>

                    <motion.a
                      href="https://discord.com/users/filszu"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Discord Profile"
                      className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center"
                      whileHover={{
                        scale: [1, 1.2, 1.1],
                        rotate: [0, 10, -10, 0],
                        backgroundColor: "#5865F2",
                        color: "white",
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.7698 4.99991C18.3266 4.24464 16.7835 3.69489 15.1596 3.39991C15.1306 3.39522 15.1009 3.40304 15.0768 3.42191C14.8906 3.73771 14.6798 4.14489 14.5304 4.46991C12.7999 4.19522 11.0788 4.19522 9.37651 4.46991C9.22708 4.13771 9.00905 3.73771 8.82193 3.42191C8.79787 3.40351 8.76812 3.39569 8.73911 3.39991C7.11575 3.69489 5.57266 4.24464 4.12896 4.99991C4.10865 5.00929 4.09125 5.02522 4.08 5.04491C1.33849 9.29522 0.559636 13.4329 0.966545 17.5146C0.969909 17.5439 0.98463 17.5719 1.00489 17.5919C2.91594 18.9652 4.76178 19.7979 6.57651 20.3499C6.60552 20.3582 6.63624 20.3499 6.65655 20.3266C7.08048 19.7439 7.46187 19.1299 7.79115 18.4839C7.81718 18.4329 7.79211 18.3746 7.73911 18.3546C7.13673 18.1312 6.56187 17.8559 6.00905 17.5399C5.95031 17.5066 5.94651 17.4232 6.00151 17.3839C6.11575 17.2979 6.22999 17.2079 6.33849 17.1172C6.36073 17.0986 6.39068 17.0939 6.41687 17.1052C10.0768 18.7652 13.9653 18.7652 17.5788 17.1052C17.605 17.0932 17.635 17.0979 17.6579 17.1166C17.7664 17.2072 17.8806 17.2979 17.9955 17.3839C18.0505 17.4232 18.0474 17.5066 17.9887 17.5399C17.4358 17.8599 16.861 18.1312 16.2579 18.3539C16.2049 18.3739 16.1805 18.4329 16.2065 18.4839C16.5429 19.1292 16.9243 19.7432 17.3404 20.3259C17.36 20.3499 17.3914 20.3582 17.4204 20.3499C19.2444 19.7979 21.0903 18.9652 23.0013 17.5919C23.0222 17.5719 23.0363 17.5446 23.0396 17.5152C23.5256 12.7639 22.2896 8.66522 19.8161 5.04552C19.8055 5.02522 19.7881 5.00929 19.7678 4.99991H19.7698Z" />
                      </svg>
                    </motion.a>

                    <motion.a
                      href="https://www.linkedin.com/in/filshu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center"
                      whileHover={{
                        scale: [1, 1.2, 1.1],
                        rotate: [0, 10, -10, 0],
                        backgroundColor: "#0077B5",
                        color: "white",
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <Linkedin size={20} />
                    </motion.a>

                    <motion.a
                      href="https://github.com/filszu"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center"
                      whileHover={{
                        scale: [1, 1.2, 1.1],
                        rotate: [0, 10, -10, 0],
                        backgroundColor: "#333",
                        color: "white",
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <Github size={20} />
                    </motion.a>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* Scroll down arrow animation */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          })
        }
      >
        <div className="h-20" />
        <div className=" w-12 h-12 ">
          <DotLottieReact
            src="https://lottie.host/6511ee89-f4a5-446f-bfcb-08e5d8574d33/1KLwdsUN95.lottie"
            loop
            autoplay
          />
        </div>
      </motion.div>
    </header>
  );
}
