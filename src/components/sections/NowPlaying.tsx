"use client"
import { useEffect, useState, memo } from 'react';
import Image from 'next/image';
import { Music, Volume2 } from 'lucide-react';
import { fetchMusicData } from '@/utils/api';

interface NowPlayingData {
  name: string;
  artists: string;
  album: string;
  albumImageUrl: string;
  url: string;
  isPlaying: boolean;
  platform?: string;
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
        width={300}
        height={140}
        className="rounded-lg object-cover absolute inset-0 w-full h-full"
        quality={75}
        sizes="64px"
      />
    </div>
  );
});

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const fetchNowPlaying = async () => {
    try {
      setError(false);
      const trackData = await fetchMusicData<NowPlayingData>();
      setData(trackData);
    } catch (err) {
      console.error('Failed to fetch current track:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

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
            <div className="h-16 w-16 flex-shrink-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
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
            <div className="h-16 w-16 flex-shrink-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
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
          {data.albumImageUrl && (
            <AlbumCover url={data.albumImageUrl} alt={data.album} />
          )}
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
}