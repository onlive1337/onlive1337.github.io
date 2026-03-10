"use client"
import Link from "next/link"
import React, { memo, useState, useCallback, useEffect } from "react"
import dynamic from 'next/dynamic'
import { Menu, X } from 'lucide-react'
import { InitialFadeIn } from '@/utils/Animations';

const ThemeToggle = dynamic(() => import('./ThemeToggle').then(mod => mod.ThemeToggle), {
  ssr: false,
  loading: () => <div className="w-8 h-8" />
})

const navigation = [
  { name: "Socials", href: "#socials" },
  { name: "Technologies", href: "#technologies" },
  { name: "Experience", href: "#experience" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Resume", href: "/resume" },
] as const;

const NavLinks = memo(() => (
  <>
    {navigation.map((item, index) => (
      <InitialFadeIn key={item.name} delay={100 + index * 100}>
        <Link
          href={item.href}
          className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
        >
          {item.name}
        </Link>
      </InitialFadeIn>
    ))}
  </>
));

NavLinks.displayName = 'NavLinks';

function NavigationComponent() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);

    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);

      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-black supports-backdrop-filter:bg-white/75 supports-backdrop-filter:dark:bg-black/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:justify-center">
        {/* Mobile: burger button (left) */}
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center justify-center gap-4 sm:gap-8">
          <NavLinks />
          <InitialFadeIn delay={400}>
            <ThemeToggle />
          </InitialFadeIn>
        </div>

        {/* Mobile: theme toggle (right) */}
        <div className="sm:hidden">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-80 border-t border-gray-200 dark:border-gray-800' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3 bg-white/95 dark:bg-black/95 backdrop-blur-xl">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export const Navigation = memo(NavigationComponent);