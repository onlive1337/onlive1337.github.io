"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Gamepad2 } from 'lucide-react';
import { fetchFromAPI } from '@/utils/api';

interface GameData {
  name: string;
  gameId: string;
  imageUrl: string;
  isPlaying: boolean;
  playTime2Weeks?: number;
}

export function Gaming() {
  const [data, setData] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const fetchGaming = async () => {
    try {
      setError(false);
      const gameData = await fetchFromAPI<GameData>('steam');
      setData(gameData);
    } catch (err) {
      console.error('Failed to fetch Steam activity:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGaming();
    const interval = setInterval(fetchGaming, 120000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Gaming
        </h2>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md" style={{ height: '111px' }}>
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

  if (error) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          Gaming
        </h2>
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md" style={{ height: '111px' }}>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 flex-shrink-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
              <Gamepad2 className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Data unavailable
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Steam activity couldn&apos;t be loaded
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
        Gaming
      </h2>
      {!data ? (
        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md" style={{ height: '111px' }}>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 flex-shrink-0 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
              <Gamepad2 className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Not Playing
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                No recent activity
              </p>
            </div>
          </div>
        </div>
      ) : (
        <a
          href={`https://store.steampowered.com/app/${data.gameId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md hover:bg-white/40 dark:hover:bg-black/40 transition-all overflow-hidden relative"
          style={{ height: '111px' }}
        >
          <div className="flex items-center gap-4 p-4 pb-6">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={data.imageUrl}
                alt={data.name}
                width={300}
                height={140}
                className="rounded-lg object-cover absolute inset-0 w-full h-full"
                sizes='64px'
                quality={75}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-500 transition-colors">
                {data.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {data.isPlaying ? (
                  'Currently Playing'
                ) : data.playTime2Weeks ? (
                  `${Math.round(data.playTime2Weeks / 60)} hours past 2 weeks`
                ) : null}
              </p>
              
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 font-mono">
                <span>{Math.round(data.playTime2Weeks || 0) ? `${Math.round((data.playTime2Weeks || 0) / 60)} ч` : ''}</span>
                <span>{data.isPlaying ? 'Currently in game' : ''}</span>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-[2px] w-full bg-gray-200 dark:bg-[#1a1b1e]">
              {data.isPlaying && (
                <div 
                  className="h-full bg-green-500 transition-all duration-1000"
                  style={{ width: '100%' }}
                />
              )}
            </div>
          </div>
        </a>
      )}
    </div>
  );
}