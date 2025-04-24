import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Background } from "@/components/Background"
import Script from 'next/script'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
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
    <html lang="en" suppressHydrationWarning className="js-loading">
      <head>
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
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Background />
          <main className="min-h-screen bg-white dark:bg-black">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}