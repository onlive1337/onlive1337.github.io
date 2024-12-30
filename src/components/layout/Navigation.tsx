"use client"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

export function Navigation() {
 const navigation = [
   { name: "Socials", href: "#socials" },
   { name: "Technologies", href: "#technologies" },
   { name: "Portfolio", href: "#portfolio" }
 ];

 return (
   <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-black/75 backdrop-blur-xl">
     <nav className="mx-auto flex h-16 max-w-7xl items-center justify-center px-4">
       <div className="flex items-center justify-center gap-4 sm:gap-8">
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
 );
}