import { useEffect, useState, memo } from 'react';
import Image from 'next/image';
import { Music, Volume2 } from 'lucide-react';

interface NowPlayingData {
  name: string;
  artists: string;
  album: string;
  albumImageUrl: string;
  url: string;
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
  explicit: boolean;
}

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

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

const ExplicitBadge = memo(function ExplicitBadge() {
  return (
    <div className="relative group">
      <span className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-800 text-gray-400 rounded cursor-help">
        E
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 px-2 py-1 text-[10px] font-medium bg-black text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
        Explicit
      </span>
    </div>
  );
});

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('https://portfolio-api-taupe-theta.vercel.app/api/statsfm');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setData(data);
        setCurrentTime(data.progressMs);
      } catch (error) {
        console.error('Failed to fetch now playing:', error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!data?.isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= (data.durationMs || 0)) return prev;
        return prev + 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.isPlaying, data?.durationMs]);

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

  if (!data?.isPlaying) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Now Playing
          <Volume2 className="w-4 h-4 text-green-500 animate-pulse" />
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
                Spotify is paused
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = (currentTime / data.durationMs) * 100;

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
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-medium text-gray-900 dark:text-white text-base truncate group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {data.name}
              </h3>
              {data.explicit && <ExplicitBadge />}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm truncate">
              {data.artists}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-[2px] w-full bg-gray-200 dark:bg-[#1a1b1e]">
            <div 
              className="h-full bg-green-500 transition-all duration-1000"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </a>
    </div>
  );
}