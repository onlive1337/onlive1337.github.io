import type { Metadata } from "next"
import { Inter, Roboto_Flex } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Background } from "@/components/Background"
import Script from 'next/script'
import "./globals.css"
import React from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  axes: ["wdth", "GRAD", "opsz"],
})

export const metadata: Metadata = {
  title: "onlive - Full Stack Developer",
  description: "Personal portfolio website",
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoFlex.variable} antialiased`}>
        <Script id="prevent-flash" strategy="beforeInteractive">
          {`
            (function() {
              document.documentElement.classList.add('js-loading');
              
              function removeLoadingClass() {
                document.documentElement.classList.remove('js-loading');
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', removeLoadingClass);
              } else {
                removeLoadingClass();
              }

              window.addEventListener('load', removeLoadingClass);
            })();
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Background />
          <main className="min-h-screen bg-md-background text-md-on-background">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}