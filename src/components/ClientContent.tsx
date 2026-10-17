"use client";
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ScrollFadeIn } from '@/utils/Animations'

const Technologies = dynamic(
  () => import('@/components/sections/Technologies').then(mod => mod.Technologies),
  {
    loading: () => <div className="h-96 opacity-0" />
  }
);

const Portfolio = dynamic(
  () => import('@/components/sections/Portfolio').then(mod => mod.Portfolio),
  {
    loading: () => <div className="h-96" />
  }
);

const NowPlaying = dynamic(
  () => import('@/components/sections/NowPlaying').then(mod => mod.NowPlaying),
  {
    loading: () => <div className="h-40" />
  }
);

const Gaming = dynamic(
  () => import('@/components/sections/Gaming').then(mod => mod.Gaming),
  {
    loading: () => <div className="h-40" />
  }
);

const Experience = dynamic(
  () => import('@/components/sections/Experience').then(mod => mod.Experience),
  {
    loading: () => <div className="h-96" />
  }
);

export function ClientContent() {
  return (
    <div className="space-y-16 pb-16">
      <Suspense>
        <Technologies />
      </Suspense>

      <Suspense>
        <ScrollFadeIn>
          <Experience />
        </ScrollFadeIn>
      </Suspense>

      <Suspense>
        <ScrollFadeIn>
          <Portfolio />
        </ScrollFadeIn>
      </Suspense>

      <ScrollFadeIn>
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="mb-8 text-center type-headline text-md-on-background">
              Live Activity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
  );
}