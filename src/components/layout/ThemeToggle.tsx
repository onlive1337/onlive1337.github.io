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

  if (!mounted) return <div className="w-full h-full" />

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="relative inline-flex h-full w-full items-center justify-center text-current focus-visible:ring-2 focus-visible:ring-md-primary outline-none select-none cursor-pointer"
      aria-label="Toggle theme"
    >
      <Ripple color="currentColor" />
      <div className="relative h-6 w-6 overflow-hidden pointer-events-none">
        <Sun
          className={`absolute h-6 w-6 transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isDark
              ? 'translate-y-0 rotate-0 opacity-100'
              : 'translate-y-full rotate-90 opacity-0'
            }`}
        />
        <Moon
          className={`absolute h-6 w-6 transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${isDark
              ? '-translate-y-full -rotate-90 opacity-0'
              : 'translate-y-0 rotate-0 opacity-100'
            }`}
        />
      </div>
    </button>
  )
}
