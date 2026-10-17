"use client"
import { memo, useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Music, Volume2, ArrowUpRight } from 'lucide-react';
import { useMusic } from '@/hooks/use-music';
import { Ripple } from "@/components/ui/Ripple";

const coverCache = new Map<string, string>();

const AlbumCover = memo(function AlbumCover({
  alt,
  trackName,
  artistName
}: {
  alt: string;
  trackName?: string;
  artistName?: string;
}) {
  const [appleMusicUrl, setAppleMusicUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchCover = useCallback(async (track: string, artist: string) => {
    const cacheKey = `${track}-${artist}`;

    if (coverCache.has(cacheKey)) {
      setAppleMusicUrl(coverCache.get(cacheKey)!);
      setIsLoading(false);
      return;
    }

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    try {
      const query = encodeURIComponent(`${track} ${artist}`);
      const response = await fetch(
        `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`,
        { signal: abortControllerRef.current.signal }
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const artwork = data.results[0].artworkUrl100.replace('100x100bb', '300x300bb');
        coverCache.set(cacheKey, artwork);
        setAppleMusicUrl(artwork);
      } else {
        setAppleMusicUrl(null);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Failed to fetch Apple Music cover:', err);
      }
      setAppleMusicUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!trackName || !artistName) {
      setAppleMusicUrl(null);
      setIsLoading(false);
      return;
    }

    void fetchCover(trackName, artistName);

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [trackName, artistName, fetchCover]);

  if (isLoading || !appleMusicUrl) {
    return (
      <div className="relative h-18 w-18 shrink-0 bg-md-surface-container-highest rounded-m3-lg flex items-center justify-center">
        <Music className={`h-8 w-8 text-md-on-surface-variant ${isLoading ? 'animate-pulse' : ''}`} />
      </div>
    );
  }

  return (
    <div className="relative h-18 w-18 shrink-0 shadow-md rounded-m3-lg group-hover:rounded-m3-xl shape-morph overflow-hidden">
      <Image
        src={appleMusicUrl}
        alt={alt}
        width={300}
        height={300}
        className="object-cover absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        quality={80}
        sizes="72px"
      />
    </div>
  );
});

const PlayingBars = memo(function PlayingBars() {
  return (
    <div className="flex items-end gap-[2.5px] h-3.5 w-4 shrink-0 select-none pointer-events-none">
      <span className="w-0.75 bg-current rounded-full animate-bar-1" />
      <span className="w-0.75 bg-current rounded-full animate-bar-2" />
      <span className="w-0.75 bg-current rounded-full animate-bar-3" />
    </div>
  );
});

export const NowPlaying = memo(function NowPlaying() {
  const { music: data, isLoading, isError: error } = useMusic();

  if (isLoading) {
    return (
      <div className="p-5 rounded-m3-xl bg-md-surface-container">
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

  if (error || !data?.isPlaying) {
    return (
      <div className="p-5 rounded-m3-xl bg-md-surface-container select-none">
        <div className="flex items-center gap-4">
          <div className="h-18 w-18 shrink-0 bg-md-surface-container-highest rounded-m3-lg flex items-center justify-center">
            <Music className="h-8 w-8 text-md-on-surface-variant" />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-md-surface-container-highest text-md-on-surface-variant">
              <Volume2 className="w-3.5 h-3.5" />
              Now Playing
            </span>
            <p className="type-title text-md-on-surface text-base">
              {error ? 'Data unavailable' : 'Not Playing'}
            </p>
            <p className="text-md-on-surface-variant text-xs font-medium">
              {error ? "Music information couldn't be loaded" : 'Music is currently paused'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-m3-xl hover:rounded-m3-2xl active:rounded-m3-lg bg-md-secondary-container/75 hover:bg-md-secondary-container p-5 shape-morph overflow-hidden relative select-none"
    >
      <Ripple color="var(--md-sys-color-on-secondary-container)" />
      <div className="flex items-center gap-4">
        <AlbumCover 
          alt={data.album || 'Album Art'} 
          trackName={data.name}
          artistName={data.artists}
        />
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-md-primary text-md-on-primary px-2.5 py-0.5 rounded-full tracking-wide">
              <PlayingBars />
              <span>{data.platform || 'Now Playing'}</span>
            </span>
          </div>
          <h3 className="type-title text-md-on-secondary-container text-base sm:text-lg truncate">
            {data.name}
          </h3>
          <p className="text-md-on-secondary-container/80 font-medium text-xs sm:text-sm truncate">
            {data.artists}
          </p>
        </div>

        {/* Pixel Media Notification Action FAB */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-m3-md group-hover:rounded-3xl bg-md-primary text-md-on-primary shape-morph shadow-sm">
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
        </div>
      </div>
    </a>
  );
});
