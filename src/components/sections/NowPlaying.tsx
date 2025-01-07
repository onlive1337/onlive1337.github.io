"use client"
import Image from 'next/image';
import { useEffect, useState, memo } from 'react';
import { Music } from 'lucide-react';

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

const AlbumCover = memo(function AlbumCover({ 
  url, 
  alt 
}: { 
  url: string; 
  alt: string;
}) {
  return (
    <div className="relative h-16 w-16 flex-shrink-0">
      <Image
        src={url}
        alt={alt}
        width={64}
        height={64}
        className="rounded-lg object-cover"
        quality={85}
        sizes="64px"
      />
    </div>
  );
});

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('https://portfolio-api-taupe-theta.vercel.app/api/spotify');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Failed to fetch now playing:', error);
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
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md">
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

  if (!data?.isPlaying) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Now Playing
        </h2>
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
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        Now Playing
      </h2>
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md group hover:bg-white/40 dark:hover:bg-black/40"
      >
        <div className="flex items-center gap-4">
          {data.albumImageUrl && (
            <AlbumCover url={data.albumImageUrl} alt={data.album || ''} />
          )}
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
              {data.title}
            </h3>
            <p className="truncate text-gray-500 dark:text-gray-400">
              {data.artist}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}