"use client"
import dynamic from 'next/dynamic'

const Github = dynamic(() => import('../icons/Github'))
const Steam = dynamic(() => import('../icons/Steam'))
const Discord = dynamic(() => import('../icons/Discord'))
const Telegram = dynamic(() => import('../icons/Telegram'))

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/onlive1337",
    icon: Github,
    hoverColor: "group-hover:text-[#333]"
  },
  {
    name: "Telegram",
    url: "https://t.me/onswix",
    icon: Telegram,
    hoverColor: "group-hover:text-[#229ED9]"
  },
  {
    name: "Discord",
    url: "https://discord.com/users/605732226201550892",
    icon: Discord,
    hoverColor: "group-hover:text-[#5865F2]"
  },
  {
    name: "Steam",
    url: "https://steamcommunity.com/id/onswix",
    icon: Steam,
    hoverColor: "group-hover:text-[#1b2838]"
  },
] as const;

export function Socials() {
  return (
    <section id="socials" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Connect with me
        </h2>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 p-2 text-gray-600 dark:text-gray-300 transition-colors duration-300"
            >
              <social.icon 
                className={`h-6 w-6 transition-colors duration-300 ${social.hoverColor}`} 
              />
              <span className={`font-medium hidden sm:inline transition-colors duration-300 ${social.hoverColor}`}>
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}