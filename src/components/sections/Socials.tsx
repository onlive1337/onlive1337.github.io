"use client"
import { memo } from 'react'
import dynamic from 'next/dynamic'
import { Ripple } from "@/components/ui/Ripple"

const Github = dynamic(() => import('../icons/Github'))
const Steam = dynamic(() => import('../icons/Steam'))
const Discord = dynamic(() => import('../icons/Discord'))
const Telegram = dynamic(() => import('../icons/Telegram'))

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/onlive1337",
    icon: Github,
    hoverColor: "group-hover:text-[#333] dark:group-hover:text-white",
    brandBg: "hover:border-[#333]/30 dark:hover:border-white/30"
  },
  {
    name: "Telegram",
    url: "https://t.me/onswix",
    icon: Telegram,
    hoverColor: "group-hover:text-[#229ED9]",
    brandBg: "hover:border-[#229ED9]/30"
  },
  {
    name: "Discord",
    url: "https://discord.com/users/605732226201550892",
    icon: Discord,
    hoverColor: "group-hover:text-[#5865F2]",
    brandBg: "hover:border-[#5865F2]/30"
  },
  {
    name: "Steam",
    url: "https://steamcommunity.com/id/onswix",
    icon: Steam,
    hoverColor: "group-hover:text-[#1b2838] dark:group-hover:text-sky-300",
    brandBg: "hover:border-[#1b2838]/30 dark:hover:border-sky-300/30"
  },
] as const;

export const Socials = memo(function Socials() {
  return (
    <section id="socials" className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight font-display text-md-on-background">
          Connect with me
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 px-5 py-4 rounded-[24px] border border-md-outline-variant bg-md-surface-container-low transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.03] select-none ${social.brandBg}`}
            >
              <Ripple />
              <social.icon 
                className={`h-7 w-7 text-md-on-surface-variant transition-colors duration-300 ${social.hoverColor}`} 
              />
              <span className={`font-semibold text-sm text-md-on-surface transition-colors duration-300 ${social.hoverColor}`}>
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
});
