import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Nunito } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
})

export const metadata: Metadata = {
  title: "Filip Szumowski | Full-Stack Web Developer",
  description:
    "Interactive notebook-style portfolio of Filip Szumowski, a full-stack web developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "Filip Szumowski",
    "Web Developer",
    "React",
    "Next.js",
    "Frontend Developer",
    "Full-Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Filip Szumowski", url: "https://github.com/filszu" }],
  creator: "Filip Szumowski",
  publisher: "Filip Szumowski",
  robots: "index, follow",
  metadataBase: new URL("https://filszu-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Filip Szumowski | Full-Stack Web Developer",
    description: "Interactive notebook-style portfolio showcasing my projects and skills in web development",
    url: "https://filszu-portfolio.vercel.app",
    siteName: "Filip Szumowski Portfolio",
    images: [
      {
        url: "/images/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Filip Szumowski Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filip Szumowski | Full-Stack Web Developer",
    description: "Interactive notebook-style portfolio showcasing my projects and skills in web development",
    images: ["/images/og-image.jpeg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.variable} ${nunito.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
