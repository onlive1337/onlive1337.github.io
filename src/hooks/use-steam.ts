import useSWR from 'swr';
import { fetchFromAPI } from '@/utils/api';

interface GameData {
    name: string;
    gameId: string;
    imageUrl: string;
    isPlaying: boolean;
    playTime2Weeks?: number;
}

const fetcher = (url: string) => fetchFromAPI<GameData>(url);

export function useSteam() {
    const { data, error, isLoading } = useSWR('steam', fetcher, {
        refreshInterval: 60000,
        dedupingInterval: 30000,
        fallbackData: null,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        errorRetryInterval: 10000,
        revalidateOnFocus: false,
    });

    return {
        game: data,
        isLoading,
        isError: error
    };
}
