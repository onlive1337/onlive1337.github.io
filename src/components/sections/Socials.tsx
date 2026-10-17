"use client"
import { memo } from 'react'
import dynamic from 'next/dynamic'
import { ArrowUpRight } from 'lucide-react'
import { Ripple } from "@/components/ui/Ripple"

const Github = dynamic(() => import('../icons/Github'))
const Steam = dynamic(() => import('../icons/Steam'))
const Discord = dynamic(() => import('../icons/Discord'))
const Telegram = dynamic(() => import('../icons/Telegram'))

const socials = [
  {
    name: "GitHub",
    handle: "@onlive1337",
    url: "https://github.com/onlive1337",
    icon: Github,
    iconBg: "bg-md-primary-container text-md-on-primary-container group-hover:bg-md-primary group-hover:text-md-on-primary",
  },
  {
    name: "Telegram",
    handle: "@onswix",
    url: "https://t.me/onswix",
    icon: Telegram,
    iconBg: "bg-md-secondary-container text-md-on-secondary-container group-hover:bg-md-secondary group-hover:text-md-on-secondary",
  },
  {
    name: "Discord",
    handle: "onlive",
    url: "https://discord.com/users/605732226201550892",
    icon: Discord,
    iconBg: "bg-md-tertiary-container text-md-on-tertiary-container group-hover:bg-md-tertiary group-hover:text-md-on-tertiary",
  },
  {
    name: "Steam",
    handle: "/id/onswix",
    url: "https://steamcommunity.com/id/onswix",
    icon: Steam,
    iconBg: "bg-md-primary-container text-md-on-primary-container group-hover:bg-md-primary group-hover:text-md-on-primary",
  },
] as const;

export const Socials = memo(function Socials() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 p-3.5 rounded-[38px] hover:rounded-m3-lg active:rounded-m3-md bg-md-surface-container-high hover:bg-md-surface-container-highest shape-morph relative overflow-hidden select-none"
          >
            <Ripple />
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-3xl group-hover:rounded-m3-md shape-morph ${social.iconBg}`}>
              <social.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="type-title text-sm text-md-on-surface truncate">
                {social.name}
              </p>
              <p className="text-xs font-medium text-md-on-surface-variant truncate">
                {social.handle}
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 mr-1.5 text-md-on-surface-variant opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </a>
        ))}
      </div>
    </div>
  )
});
