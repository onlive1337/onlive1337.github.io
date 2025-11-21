import useSWR from 'swr';
import { fetchFromAPI } from '@/utils/api';

interface PlayableMedia {
    isPlaying: boolean;
    name?: string;
    artists?: string;
    album?: string;
    albumImageUrl?: string;
    url?: string;
    platform?: string;
}

const fetcher = (url: string) => fetchFromAPI<any>(url);

export function useMusic() {
    const { data, error, isLoading } = useSWR('lastfm', fetcher, {
        refreshInterval: 10000,
        dedupingInterval: 5000,
        fallbackData: null,
    });

    const musicData: PlayableMedia | null = data?.tracks ? (() => {
        const tracks = data.tracks;
        if (!Array.isArray(tracks) || tracks.length === 0) return null;

        const now = tracks.find((t: any) => t.isNowPlaying) || tracks[0];

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
        isError: error
    };
}
