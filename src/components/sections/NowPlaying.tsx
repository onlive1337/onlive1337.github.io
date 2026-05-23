"use client"
import { memo, useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Music, Volume2 } from 'lucide-react';
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
      <div className="relative h-16 w-16 shrink-0 bg-md-surface-variant rounded-[16px] flex items-center justify-center border border-md-outline-variant/30">
        <Music className={`h-8 w-8 text-md-on-surface-variant ${isLoading ? 'animate-pulse' : ''}`} />
      </div>
    );
  }

  return (
    <div className="relative h-16 w-16 shrink-0 shadow-md rounded-[16px] overflow-hidden">
      <Image
        src={appleMusicUrl}
        alt={alt}
        width={300}
        height={300}
        className="object-cover absolute inset-0 w-full h-full hover:scale-105 transition-transform duration-300"
        quality={80}
        sizes="64px"
      />
    </div>
  );
});

const PlayingBars = memo(function PlayingBars() {
  return (
    <div className="flex items-end gap-[3px] h-4 w-5 shrink-0 select-none pointer-events-none">
      <span className="w-[3.5px] bg-md-primary rounded-full animate-bar-1" />
      <span className="w-[3.5px] bg-md-primary rounded-full animate-bar-2" />
      <span className="w-[3.5px] bg-md-primary rounded-full animate-bar-3" />
    </div>
  );
});

export const NowPlaying = memo(function NowPlaying() {
  const { music: data, isLoading, isError: error } = useMusic();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-md-on-background flex items-center gap-2.5">
          Now Playing
          <Volume2 className="w-5 h-5 text-md-primary animate-pulse" />
        </h2>
        <div className="p-4 rounded-[28px] border border-md-outline-variant/20 bg-md-surface-container-low shadow-sm">
          <div className="animate-pulse flex items-center gap-4">
            <div className="h-16 w-16 bg-md-surface-variant rounded-[16px]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-md-surface-variant rounded-full w-3/4" />
              <div className="h-3 bg-md-surface-variant rounded-full w-1/2" />
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
          Now Playing
          <Volume2 className="w-5 h-5 text-md-outline" />
        </h2>
        <div className="p-4 rounded-[28px] border border-md-outline-variant/20 bg-md-surface-container-low shadow-sm select-none">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 bg-md-surface-variant rounded-[16px] flex items-center justify-center border border-md-outline-variant/30">
              <Music className="h-8 w-8 text-md-on-surface-variant" />
            </div>
            <div>
              <p className="font-bold text-md-on-surface text-base">
                Data unavailable
              </p>
              <p className="text-md-on-surface-variant text-sm font-semibold">
                Music information couldn&apos;t be loaded
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.isPlaying) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-md-on-background flex items-center gap-2.5">
          Now Playing
          <Volume2 className="w-5 h-5 text-md-outline" />
        </h2>
        <div className="p-4 rounded-[28px] border border-md-outline-variant/20 bg-md-surface-container-low shadow-sm select-none">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 bg-md-surface-variant rounded-[16px] flex items-center justify-center border border-md-outline-variant/30">
              <Music className="h-8 w-8 text-md-on-surface-variant" />
            </div>
            <div>
              <p className="font-bold text-md-on-surface text-base">
                Not Playing
              </p>
              <p className="text-md-on-surface-variant text-sm font-semibold">
                Music is paused
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
        Now Playing
        <Volume2 className="w-5 h-5 text-md-primary animate-pulse" />
      </h2>
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-[28px] border border-md-outline-variant/30 bg-md-surface-container-low hover:bg-md-primary/5 hover:border-md-primary/30 transition-all duration-300 overflow-hidden relative shadow-sm hover:shadow-md"
      >
        <Ripple />
        <div className="flex items-center gap-4 p-4">
          <AlbumCover 
            alt={data.album || 'Album Art'} 
            trackName={data.name}
            artistName={data.artists}
          />
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-md-on-surface text-base truncate group-hover:text-md-primary transition-colors flex-1 font-display">
                {data.name}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-md-on-surface-variant font-medium text-sm truncate flex-1">
                {data.artists}
              </p>
              <PlayingBars />
            </div>
          </div>
        </div>

        {data.platform && (
          <div className="absolute top-2.5 right-2.5 select-none">
            <span className="text-[10px] font-bold bg-md-primary-container text-md-on-primary-container px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {data.platform}
            </span>
          </div>
        )}
      </a>
    </div>
  );
});
