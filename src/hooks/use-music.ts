import useSWR from 'swr';
import { fetchFromAPIWithMeta, FetchResult } from '@/utils/api';
import { LastFMData, Track } from '@/types';

interface PlayableMedia {
    isPlaying: boolean;
    name?: string;
    artists?: string;
    album?: string;
    albumImageUrl?: string;
    url?: string;
    platform?: string;
}

interface MusicState {
    music: PlayableMedia | null;
    isLoading: boolean;
    isError: Error | undefined;
}

const fetcher = async (url: string): Promise<FetchResult<LastFMData>> => {
    return fetchFromAPIWithMeta<LastFMData>(url);
};

export function useMusic(): MusicState {
    const { data, error, isLoading } = useSWR('lastfm', fetcher, {
        refreshInterval: 10000,
        dedupingInterval: 5000,
        fallbackData: undefined,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        revalidateOnFocus: false,
    });

    const musicData: PlayableMedia | null = data?.data?.tracks ? (() => {
        const tracks = data.data.tracks;
        if (!Array.isArray(tracks) || tracks.length === 0) return null;

        const now = tracks.find((t: Track) => t.isNowPlaying) || tracks[0];

        return {
            name: now.name,
            artists: now.artist,
            album: now.album,
            albumImageUrl: now.albumImageUrl,
            url: now.url,
            isPlaying: !!now.isNowPlaying,
            platform: 'Last.fm',
        };
    })() : null;

    return {
        music: musicData,
        isLoading,
        isError: error || (data?.error ? new Error(data.error) : undefined)
    };
}
