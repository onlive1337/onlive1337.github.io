"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { memo, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Share2, Cpu, Briefcase, FolderGit2, FileText } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Ripple } from "@/components/ui/Ripple"

const navigation = [
  { name: "Socials", href: "/#socials", hash: "#socials", icon: Share2 },
  { name: "Technologies", href: "/#technologies", hash: "#technologies", icon: Cpu },
  { name: "Experience", href: "/#experience", hash: "#experience", icon: Briefcase },
  { name: "Portfolio", href: "/#portfolio", hash: "#portfolio", icon: FolderGit2 },
  { name: "Resume", href: "/resume", hash: "/resume", icon: FileText },
] as const;

function NavigationComponent() {
  const pathname = usePathname();
  const isResumePage = pathname === '/resume';
  const [activeSection, setActiveSection] = useState<string>('');

  const [isMobileVisible, setIsMobileVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (scrollDelta > 5 && currentScrollY > 60) {
        setIsMobileVisible(false);
      } else if (scrollDelta < -5 || currentScrollY <= 60) {
        setIsMobileVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isResumePage) return;

    const sections = ['socials', 'technologies', 'experience', 'portfolio'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${id}`);
            }
          });
        },
        { threshold: 0.3, rootMargin: '-20% 0px -40% 0px' }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [isResumePage]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: typeof navigation[number]) => {
    if (item.hash === '/resume') return;

    if (!isResumePage) {
      e.preventDefault();
      const id = item.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setActiveSection(item.hash);
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isResumePage]);

  return (
    <>
      {/* Desktop Floating Pill Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden sm:flex h-14 max-w-2xl w-[90%] items-center justify-between px-6 rounded-full border border-md-outline-variant/30 bg-md-surface-container/80 backdrop-blur-lg shadow-md transition-all duration-300">
        <nav className="flex items-center gap-2 w-full justify-between">
          <div className="flex items-center gap-1.5">
            {navigation.map((item) => {
              const isActive = isResumePage 
                ? item.hash === '/resume' 
                : activeSection === item.hash;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative px-4 py-2 text-xs font-semibold select-none rounded-full transition-colors duration-300 ${
                    isActive ? "text-md-on-primary-container" : "text-md-on-surface-variant hover:text-md-on-surface"
                  }`}
                >
                  <Ripple color={isActive ? "var(--md-sys-color-on-primary-container)" : "var(--md-sys-color-on-surface)"} />
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill-desktop"
                      className="absolute inset-0 bg-md-primary-container rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 420, damping: 26 }}
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Mobile M3 Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isMobileVisible ? 0 : "200%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden h-20 border-t border-md-outline-variant/20 bg-md-surface-container/90 backdrop-blur-md shadow-lg pb-safe select-none"
      >
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = isResumePage 
            ? item.hash === '/resume' 
            : activeSection === item.hash;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="flex flex-col items-center justify-center flex-1 h-full py-1 text-center relative"
            >
              <Ripple color="var(--md-sys-color-on-surface)" />
              {/* Icon Container with active pill background */}
              <div className="relative flex items-center justify-center h-8 w-14 rounded-full transition-colors duration-300 text-md-on-surface-variant">
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill-mobile"
                    className="absolute inset-0 bg-md-secondary-container rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`relative z-10 h-5 w-5 transition-transform duration-300 ${
                  isActive ? "text-md-on-secondary-container scale-105" : "text-md-on-surface-variant"
                }`} />
              </div>
              {/* Text Label */}
              <span className={`mt-1 text-[10px] tracking-wide transition-all duration-300 ${
                isActive ? "text-md-on-surface font-bold" : "text-md-on-surface-variant font-medium"
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
        {/* Floating Mobile Theme Toggle (We put it in the bottom right corner or bottom nav) */}
        <div className="absolute right-4 bottom-24 bg-md-surface-container-high/90 border border-md-outline-variant/30 rounded-full shadow-lg h-12 w-12 flex items-center justify-center backdrop-blur-md">
          <ThemeToggle />
        </div>
      </motion.nav>
    </>
  );
}

export const Navigation = memo(NavigationComponent);