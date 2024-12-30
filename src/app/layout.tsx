import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Background } from "@/components/Background"
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
    <html lang="en" className="min-h-screen overscroll-none" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen overscroll-none`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Background />
          <div className="relative min-h-screen backdrop-blur-[2px]">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}