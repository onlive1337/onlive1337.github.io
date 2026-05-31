"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { Ripple } from "@/components/ui/Ripple"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, [])

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = useCallback(() => {
    const next = isDark ? 'light' : 'dark'

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(next)
      return
    }

    const rect = buttonRef.current?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const root = document.documentElement
    root.style.setProperty('--vt-x', `${x}px`)
    root.style.setProperty('--vt-y', `${y}px`)
    root.style.setProperty('--vt-r', `${radius}px`)
    root.classList.add('theme-vt')

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })

    transition.finished.finally(() => {
      root.classList.remove('theme-vt')
    })
  }, [isDark, setTheme])

  if (!mounted) return <div className="w-10 h-10" />

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-md-on-surface/8 text-md-on-surface focus-visible:ring-2 focus-visible:ring-md-primary/50 outline-none select-none transition-colors"
      aria-label="Toggle theme"
    >
      <Ripple />
      <div className="relative h-6 w-6 overflow-hidden pointer-events-none">
        <Sun
          className={`absolute h-6 w-6 transform transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] text-md-primary
            ${isDark
              ? 'translate-y-0 rotate-0 opacity-100'
              : 'translate-y-full rotate-90 opacity-0'
            }`}
        />
        <Moon
          className={`absolute h-6 w-6 transform transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] text-md-primary
            ${isDark
              ? '-translate-y-full -rotate-90 opacity-0'
              : 'translate-y-0 rotate-0 opacity-100'
            }`}
        />
      </div>
    </button>
  )
}
