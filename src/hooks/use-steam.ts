import useSWR from 'swr';
import { fetchFromAPIWithMeta, FetchResult } from '@/utils/api';
import { SteamData } from '@/types';

interface SteamState {
    game: SteamData | null;
    isLoading: boolean;
    isError: Error | undefined;
}

const fetcher = async (url: string): Promise<FetchResult<SteamData>> => {
    return fetchFromAPIWithMeta<SteamData>(url);
};

export function useSteam(): SteamState {
    const { data, error, isLoading } = useSWR('steam', fetcher, {
        refreshInterval: 60000,
        dedupingInterval: 30000,
        fallbackData: undefined,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        errorRetryInterval: 10000,
        revalidateOnFocus: false,
    });

    return {
        game: data?.data ?? null,
        isLoading,
        isError: error || (data?.error ? new Error(data.error) : undefined)
    };
}
