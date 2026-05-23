"use client"
import { memo } from 'react';
import Image from 'next/image';
import { Gamepad2 } from 'lucide-react';
import { useSteam } from '@/hooks/use-steam';
import { Ripple } from "@/components/ui/Ripple";

export const Gaming = memo(function Gaming() {
  const { game: data, isLoading, isError: error } = useSteam();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-md-on-background flex items-center gap-2.5">
          Gaming Activity
          <Gamepad2 className="w-5 h-5 text-md-primary animate-pulse" />
        </h2>
        <div className="p-4 rounded-[28px] border border-md-outline-variant/20 bg-md-surface-container-low shadow-sm w-full">
          <div className="animate-pulse flex space-x-4">
            <div className="h-16 w-16 bg-md-surface-variant rounded-[16px]" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-md-surface-variant rounded-full w-3/4" />
              <div className="h-4 bg-md-surface-variant rounded-full w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-md-on-background flex items-center gap-2.5">
          Gaming Activity
          <Gamepad2 className="w-5 h-5 text-md-outline" />
        </h2>
        <div className="p-4 rounded-[28px] border border-md-outline-variant/20 bg-md-surface-container-low shadow-sm w-full select-none">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 bg-md-surface-variant rounded-[16px] flex items-center justify-center border border-md-outline-variant/30">
              <Gamepad2 className="h-8 w-8 text-md-on-surface-variant" />
            </div>
            <div>
              <p className="font-bold text-md-on-surface text-base">
                Data unavailable
              </p>
              <p className="text-md-on-surface-variant text-sm font-semibold">
                Steam activity couldn&apos;t be loaded
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isInactive = !data || !data.imageUrl || !data.name || !data.gameId;

  if (isInactive) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-md-on-background flex items-center gap-2.5">
          Gaming Activity
          <Gamepad2 className="w-5 h-5 text-md-outline" />
        </h2>
        <div className="p-4 rounded-[28px] border border-md-outline-variant/20 bg-md-surface-container-low shadow-sm w-full select-none">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 bg-md-surface-variant rounded-[16px] flex items-center justify-center border border-md-outline-variant/30">
              <Gamepad2 className="h-8 w-8 text-md-on-surface-variant" />
            </div>
            <div>
              <p className="font-bold text-md-on-surface text-base">
                Not Playing
              </p>
              <p className="text-md-on-surface-variant text-sm font-semibold">
                No recent activity on Steam
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold font-display text-md-on-background flex items-center gap-2.5">
        Gaming Activity
        <Gamepad2 className="w-5 h-5 text-md-primary animate-bounce" />
      </h2>
      
      <a
        href={`https://store.steampowered.com/app/${data.gameId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-[28px] border border-md-outline-variant/30 bg-md-surface-container-low hover:bg-md-primary/5 hover:border-md-primary/30 transition-all duration-300 overflow-hidden w-full relative shadow-sm hover:shadow-md"
      >
        <Ripple />
        <div className="flex items-center gap-4 p-4">
          <div className="relative h-16 w-16 shrink-0 shadow-md rounded-[16px] overflow-hidden">
            <Image
              src={data.imageUrl!}
              alt={data.name!}
              width={300}
              height={140}
              className="object-cover absolute inset-0 w-full h-full hover:scale-105 transition-transform duration-300"
              sizes='64px'
              quality={80}
            />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <h3 className="font-bold text-md-on-surface text-base truncate group-hover:text-md-primary transition-colors font-display">
              {data.name!}
            </h3>
            <p className="text-sm font-semibold text-md-on-surface-variant">
              {data.isPlaying ? (
                <span className="text-emerald-500 animate-pulse">Currently Playing</span>
              ) : data.playTime2Weeks ? (
                `${Math.round(data.playTime2Weeks / 60)} hours past 2 weeks`
              ) : null}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
});
