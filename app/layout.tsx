import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Filip Szumowski | Full-Stack Web Developer",
  description:
    "Filszu's Interactive notebook-style portfolio, a full-stack web developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "Filip Szumowski",
    "Web Developer",
    "React",
    "Next.js",
    "Frontend Developer",
    "Full-Stack Developer",
    "Portfolio",
    "hire me",
    "cooperation",
    "filszu",
    "filshu",
  ],
  authors: [{ name: "Filip Szumowski", url: "https://github.com/filszu" }],
  creator: "Filip Szumowski",
  publisher: "Filip Szumowski",
  robots: "index, follow",
  metadataBase: new URL("https://filszu.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Filip Szumowski | Full-Stack Web Developer",
    description:
      "Interactive notebook-style portfolio showcasing my projects and skills in web development",
    url: "https://filszu.vercel.app",
    siteName: "Filip Szumowski Portfolio",
    images: [
      {
        url: "/images/og-image.png",
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
    description:
      "Interactive notebook-style portfolio showcasing my projects and skills in web development",
    images: ["/images/og-image.png"],
  },
  manifest: "/manifest.json",
  themeColor: "#FFD6E0", // Pastel pink theme color
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Filip Szumowski Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#FFD6E0" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={`${inter.variable} ${nunito.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
        <Script
          // strategy='lazyOnload'
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
