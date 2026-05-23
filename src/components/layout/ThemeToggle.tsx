"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Ripple } from "@/components/ui/Ripple"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, [])

  if (!mounted) return <div className="w-10 h-10" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-md-on-surface/8 text-md-on-surface focus-visible:ring-2 focus-visible:ring-md-primary/50 outline-none select-none transition-colors"
      aria-label="Toggle theme"
    >
      <Ripple />
      <div className="relative h-6 w-6 overflow-hidden pointer-events-none">
        <Sun 
          className={`absolute h-6 w-6 transform transition-all duration-300 cubic-bezier(0.2, 0, 0, 1) text-md-primary
            ${isDark 
              ? 'translate-y-0 rotate-0 opacity-100' 
              : 'translate-y-full rotate-90 opacity-0'
            }`}
        />
        <Moon 
          className={`absolute h-6 w-6 transform transition-all duration-300 cubic-bezier(0.2, 0, 0, 1) text-md-primary
            ${isDark 
              ? '-translate-y-full -rotate-90 opacity-0' 
              : 'translate-y-0 rotate-0 opacity-100'
            }`}
        />
      </div>
    </button>
  )
}