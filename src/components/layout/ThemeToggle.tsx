"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5 overflow-hidden">
        <Sun 
          className={`absolute h-5 w-5 transform transition-all duration-300 ease-spring text-white
            ${theme === 'dark' 
              ? 'translate-y-0 rotate-0 opacity-100' 
              : 'translate-y-full rotate-90 opacity-0'
            }`}
        />
        <Moon 
          className={`absolute h-5 w-5 transform transition-all duration-300 ease-spring text-black
            ${theme === 'dark' 
              ? '-translate-y-full -rotate-90 opacity-0' 
              : 'translate-y-0 rotate-0 opacity-100'
            }`}
        />
      </div>
    </button>
  )
}