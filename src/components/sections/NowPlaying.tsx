"use client"
import { memo, useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Music, Volume2 } from 'lucide-react';
import { useMusic } from '@/hooks/use-music';

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
      <div className="relative h-16 w-16 shrink-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50">
        <Music className={`h-8 w-8 text-gray-400 dark:text-gray-500 ${isLoading ? 'animate-pulse' : ''}`} />
      </div>
    );
  }

  return (
    <div className="relative h-16 w-16 shrink-0">
      <Image
        src={appleMusicUrl}
        alt={alt}
        width={300}
        height={300}
        className="rounded-lg object-cover absolute inset-0 w-full h-full"
        quality={75}
        sizes="64px"
      />
    </div>
  );
});

export const NowPlaying = memo(function NowPlaying() {
  const { music: data, isLoading, isError: error } = useMusic();

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Now Playing
          <Volume2 className="w-4 h-4 text-green-500 animate-pulse" />
        </h2>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md">
          <div className="animate-pulse flex items-center gap-4">
            <div className="h-16 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Now Playing
          <Volume2 className="w-4 h-4 text-gray-400" />
        </h2>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
              <Music className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Data unavailable
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
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
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Now Playing
          <Volume2 className="w-4 h-4 text-gray-400" />
        </h2>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
              <Music className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Not Playing
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Music is paused
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        Now Playing
        <Volume2 className="w-4 h-4 text-green-500 animate-pulse" />
      </h2>
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md hover:bg-white/40 dark:hover:bg-black/40 transition-all overflow-hidden relative"
      >
        <div className="flex items-center gap-4 p-4">
          <AlbumCover 
            alt={data.album || 'Album Art'} 
            trackName={data.name}
            artistName={data.artists}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center">
              <h3 className="font-medium text-gray-900 dark:text-white text-base truncate group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-1">
                {data.name}
              </h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm truncate mb-1">
              {data.artists}
            </p>
          </div>
        </div>

        {data.platform && (
          <div className="absolute top-2 right-2">
            <span className="text-xs font-medium bg-gray-800/60 text-white px-2 py-0.5 rounded-full">
              {data.platform}
            </span>
          </div>
        )}
      </a>
    </div>
  );
});
