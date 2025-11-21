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
    });

    return {
        game: data,
        isLoading,
        isError: error
    };
}
