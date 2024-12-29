"use client"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { useEffect, useState } from "react"

export function Navigation() {
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    setIsLocal(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  }, []);

  const navigation = [
    { name: "Socials", href: "#socials" },
    { name: "Technologies", href: "#technologies" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Blog", href: "#blog" },
    ...(isLocal ? [{ name: "New Post", href: "/admin/new-post" }] : []),
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link 
          href="/" 
          className="text-xl font-semibold text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors"
        >
          DM
        </Link>
        
        <div className="flex items-center gap-8">
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
      </nav>
    </header>
  )
}