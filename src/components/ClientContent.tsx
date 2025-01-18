"use client";
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { InitialFadeIn, ScrollFadeIn } from '../utils/Animations'

const Technologies = dynamic(
  () => import('@/components/sections/Technologies').then(mod => mod.Technologies),
  { 
    ssr: false,
    loading: () => <div className="h-96" />
  }
);

const Portfolio = dynamic(
  () => import('@/components/sections/Portfolio').then(mod => mod.Portfolio),
  { 
    ssr: false,
    loading: () => <div className="h-96" />
  }
);

const Socials = dynamic(
  () => import('@/components/sections/Socials').then(mod => mod.Socials),
  { ssr: false }
);

const NowPlaying = dynamic(
  () => import('@/components/sections/NowPlaying').then(mod => mod.NowPlaying),
  { 
    ssr: false,
    loading: () => <div className="h-40" />
  }
);

const Gaming = dynamic(
  () => import('@/components/sections/Gaming').then(mod => mod.Gaming),
  { 
    ssr: false,
    loading: () => <div className="h-40" />
  }
);

const Messages = dynamic(
  () => import('@/components/sections/Messages').then(mod => mod.Messages),
  { ssr: false }
);

const Analytics = dynamic(
  () => import('@/components/sections/Analytics').then(mod => mod.Analytics),
  { ssr: false }
);

export function ClientContent() {
  return (
    <>
      <Suspense>
        <InitialFadeIn delay={500}>
          <Socials />
        </InitialFadeIn>
      </Suspense>

      <div className="space-y-32">
        <Suspense>
          <Technologies />
        </Suspense>

        <Suspense>
          <ScrollFadeIn>
            <Portfolio />
          </ScrollFadeIn>
        </Suspense>

        <ScrollFadeIn>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <Suspense>
                  <NowPlaying />
                </Suspense>
                <Suspense>
                  <Gaming />
                </Suspense>
              </div>
            </div>
          </section>
        </ScrollFadeIn>
      </div>

      <div>
        <Suspense>
          <ScrollFadeIn>
            <Messages />
          </ScrollFadeIn>
        </Suspense>

        <Suspense>
          <ScrollFadeIn>
            <Analytics />
          </ScrollFadeIn>
        </Suspense>
      </div>
    </>
  );
}