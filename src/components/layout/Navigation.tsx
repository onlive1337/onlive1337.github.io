"use client"
import Link from "next/link"
import { memo } from "react"
import dynamic from 'next/dynamic'
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
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-black supports-[backdrop-filter]:bg-white/75 supports-[backdrop-filter]:dark:bg-black/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-center px-4">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <NavLinks />
          <InitialFadeIn delay={400}>
            <ThemeToggle />
          </InitialFadeIn>
        </div>
      </nav>
    </header>
  );
}

export const Navigation = memo(NavigationComponent);