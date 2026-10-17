"use client"
import { memo } from 'react';
import Image from 'next/image';
import { Gamepad2, ArrowUpRight } from 'lucide-react';
import { useSteam } from '@/hooks/use-steam';
import { Ripple } from "@/components/ui/Ripple";

export const Gaming = memo(function Gaming() {
  const { game: data, isLoading, isError: error } = useSteam();

  if (isLoading) {
    return (
      <div className="p-5 rounded-m3-xl bg-md-surface-container w-full">
        <div className="animate-pulse flex items-center gap-4">
          <div className="h-18 w-18 bg-md-surface-container-highest rounded-m3-lg shrink-0" />
          <div className="flex-1 space-y-2.5">
            <div className="h-4 bg-md-surface-container-highest rounded-full w-24" />
            <div className="h-5 bg-md-surface-container-highest rounded-full w-3/4" />
            <div className="h-3.5 bg-md-surface-container-highest rounded-full w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  const isInactive = error || !data || !data.imageUrl || !data.name || !data.gameId;

  if (isInactive) {
    return (
      <div className="p-5 rounded-m3-xl bg-md-surface-container w-full select-none">
        <div className="flex items-center gap-4">
          <div className="h-18 w-18 shrink-0 bg-md-surface-container-highest rounded-m3-lg flex items-center justify-center">
            <Gamepad2 className="h-8 w-8 text-md-on-surface-variant" />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-md-surface-container-highest text-md-on-surface-variant">
              <Gamepad2 className="w-3.5 h-3.5" />
              Steam Activity
            </span>
            <p className="type-title text-md-on-surface text-base">
              {error ? 'Data unavailable' : 'Not Playing'}
            </p>
            <p className="text-md-on-surface-variant text-xs font-medium">
              {error ? "Steam activity couldn't be loaded" : 'No recent activity on Steam'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={`https://store.steampowered.com/app/${data.gameId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-m3-xl hover:rounded-m3-2xl active:rounded-m3-lg bg-md-surface-container hover:bg-md-surface-container-high p-5 shape-morph overflow-hidden w-full relative select-none"
    >
      <Ripple />
      <div className="flex items-center gap-4">
        <div className="relative h-18 w-18 shrink-0 shadow-md rounded-m3-lg group-hover:rounded-m3-xl shape-morph overflow-hidden">
          <Image
            src={data.imageUrl!}
            alt={data.name!}
            width={300}
            height={140}
            className="object-cover absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            sizes="72px"
            quality={80}
          />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide ${
              data.isPlaying
                ? 'bg-md-tertiary text-md-on-tertiary'
                : 'bg-md-surface-container-highest text-md-on-surface-variant'
            }`}>
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>{data.isPlaying ? 'Playing on Steam' : 'Recent on Steam'}</span>
            </span>
          </div>
          <h3 className="type-title text-md-on-surface text-base sm:text-lg truncate group-hover:text-md-primary">
            {data.name!}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-md-on-surface-variant truncate">
            {data.isPlaying ? (
              <span className="text-emerald-500 font-semibold">In-game right now</span>
            ) : data.playTime2Weeks ? (
              `${Math.round(data.playTime2Weeks / 60)} hours past 2 weeks`
            ) : (
              'Recently launched'
            )}
          </p>
        </div>

        {/* Pixel Game Dashboard Action FAB */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-m3-md group-hover:rounded-3xl bg-md-tertiary-container text-md-on-tertiary-container group-hover:bg-md-tertiary group-hover:text-md-on-tertiary shape-morph">
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
        </div>
      </div>
    </a>
  );
});
