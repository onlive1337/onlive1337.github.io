"use client"
import { useState } from "react"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = [
    { name: "Socials", href: "#socials" },
    { name: "Technologies", href: "#technologies" },
    { name: "Portfolio", href: "#portfolio" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link 
          href="/" 
          className="text-xl font-semibold text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors"
        >
          DM
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50"
            aria-label="Меню"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-black/95 backdrop-blur-lg">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}