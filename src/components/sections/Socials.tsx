"use client"
import { Github } from "lucide-react"
import Steam from "../icons/Steam"
import Discord from "../icons/Discord"
import Telegram from "../icons/Telegram"

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/onlive1337",
    icon: Github,
  },
  {
    name: "Telegram",
    url: "https://t.me/onswix",
    icon: Telegram,
  },
  {
    name: "Discord",
    url: "https://discord.com/users/605732226201550892",
    icon: Discord,
  },
  {
    name: "Steam",
    url: "https://steamcommunity.com/id/onswix",
    icon: Steam,
  },
]

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
              className="group flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <social.icon className="h-6 w-6" />
              <span className="font-medium hidden sm:inline">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}