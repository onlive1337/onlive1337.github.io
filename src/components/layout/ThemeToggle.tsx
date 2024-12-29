"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5">
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-gray-900 dark:text-white transition-all" />
        ) : (
          <Moon className="h-5 w-5 text-gray-900 transition-all" />
        )}
      </div>
    </button>
  )
}