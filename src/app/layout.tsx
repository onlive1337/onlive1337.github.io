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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Background />
          <div className="relative bg-white dark:bg-black">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}