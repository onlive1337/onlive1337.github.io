"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { memo, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { User, Cpu, Briefcase, FolderGit2, FileText } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Ripple } from "@/components/ui/Ripple"

const navigation = [
  { name: "About Me", href: "/#about", hash: "#about", icon: User },
  { name: "Technologies", href: "/#technologies", hash: "#technologies", icon: Cpu },
  { name: "Experience", href: "/#experience", hash: "#experience", icon: Briefcase },
  { name: "Portfolio", href: "/#portfolio", hash: "#portfolio", icon: FolderGit2 },
  { name: "Resume", href: "/resume", hash: "/resume", icon: FileText },
] as const;

function NavigationComponent() {
  const pathname = usePathname();
  const isResumePage = pathname === '/resume';
  const [activeSection, setActiveSection] = useState<string>('#about');

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

      if (currentScrollY < 180) {
        setActiveSection('#about');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isResumePage) return;

    const sectionIds = ['about', 'technologies', 'experience', 'portfolio'];
    const observedElements = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-15% 0px -45% 0px' }
    );

    const observeAvailableSections = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
      return observedElements.size === sectionIds.length;
    };

    if (!observeAvailableSections()) {
      const mutationObserver = new MutationObserver(() => {
        if (observeAvailableSections()) {
          mutationObserver.disconnect();
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        mutationObserver.disconnect();
        observer.disconnect();
      };
    }

    return () => {
      observer.disconnect();
    };
  }, [isResumePage]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: typeof navigation[number]) => {
    if (item.hash === '/resume') return;

    if (!isResumePage) {
      e.preventDefault();
      setActiveSection(item.hash);
      if (item.hash === '#about') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const id = item.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isResumePage]);

  return (
    <>
      {/* Desktop MD3E Floating Toolbar + Split Action Button */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden sm:flex items-center gap-2.5">
        <nav
          aria-label="Primary navigation"
          className="flex h-14 items-center gap-1 p-1.5 rounded-full bg-md-surface-container-highest/90 backdrop-blur-xl shadow-lg"
        >
          {navigation.map((item) => {
            const isActive = isResumePage
              ? item.hash === '/resume'
              : activeSection === item.hash;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                style={{
                  fontVariationSettings: isActive
                    ? "'wdth' 106, 'GRAD' 40, 'opsz' 16"
                    : "'wdth' 100, 'GRAD' 0, 'opsz' 16",
                }}
                className={`relative px-4 py-2.5 text-xs font-display font-bold select-none rounded-[20px] shape-morph ${
                  isActive
                    ? "text-md-on-primary"
                    : "text-md-on-surface-variant hover:text-md-on-surface active:rounded-m3-sm"
                }`}
              >
                <Ripple color={isActive ? "var(--md-sys-color-on-primary)" : "var(--md-sys-color-on-surface)"} />
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill-desktop"
                    className="absolute inset-0 bg-md-primary rounded-[20px] -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 200, damping: 28, mass: 1 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Separated MD3E Expressive Action FAB for Theme Toggle */}
        <div className="flex h-14 w-14 items-center justify-center rounded-m3-xl hover:rounded-[18px] active:rounded-[14px] bg-md-secondary-container text-md-on-secondary-container shadow-lg shape-morph overflow-hidden">
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile MD3E Floating Bottom Toolbar + Split FAB */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isMobileVisible ? 0 : "160%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-4 left-3 right-3 z-50 flex sm:hidden items-center gap-2 select-none"
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 h-16 items-center justify-around px-1.5 rounded-full bg-md-surface-container-highest/95 backdrop-blur-xl shadow-xl"
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
                className="flex flex-col items-center justify-center flex-1 h-12 rounded-full relative overflow-hidden"
              >
                <Ripple color={isActive ? "var(--md-sys-color-on-primary)" : "var(--md-sys-color-on-surface)"} />
                <div className="relative flex items-center justify-center h-8 w-12 rounded-full">
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill-mobile"
                      className="absolute inset-0 bg-md-primary rounded-full"
                      transition={{ type: "spring", stiffness: 200, damping: 28, mass: 1 }}
                    />
                  )}
                  <Icon
                    className={`relative z-10 h-4.5 w-4.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? "text-md-on-primary scale-105" : "text-md-on-surface-variant"
                    }`}
                  />
                </div>
                <span
                  className={`mt-0.5 text-[10px] font-display tracking-wide transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "text-md-primary font-bold" : "text-md-on-surface-variant font-medium"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-m3-lg active:rounded-[14px] bg-md-secondary-container text-md-on-secondary-container shadow-xl shape-morph overflow-hidden">
          <ThemeToggle />
        </div>
      </motion.div>
    </>
  );
}

export const Navigation = memo(NavigationComponent);