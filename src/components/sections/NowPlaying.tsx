"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Music, ExternalLink } from 'lucide-react';

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify');
        const data = await response.json();
        setData(data);
      } catch (error) {
        setData({ isPlaying: false });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Now Playing
        </h2>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212] shadow-sm">
          <div className="animate-pulse flex space-x-4">
            <div className="h-16 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center mb-6 text-xl font-bold text-gray-900 dark:text-white">
        Now Playing
      </h2>
      {!data?.isPlaying ? (
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 flex-shrink-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
                  <Music className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Not Playing
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Spotify is paused
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md transition-all hover:bg-white/40 dark:hover:bg-black/40"
            >
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={data.albumImageUrl!}
                alt={data.album!}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate font-medium text-gray-900 dark:text-white group-hover:text-[#1DB954] transition-colors">
                  {data.title}
                </h3>
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-[#1DB954] transition-colors" />
              </div>
              <p className="truncate text-gray-500 dark:text-gray-400">
                {data.artist}
              </p>
            </div>
          </div>
        </a>
      )}
    </div>
  );
}