export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-api-taupe-theta.vercel.app/api';

interface PlayableMedia {
  isPlaying: boolean;
}

export async function fetchFromAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      console.warn(`API error (${endpoint}): ${response.status}`);
      throw new Error(`API error: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn(`API returned non-JSON (${endpoint}): ${contentType}`);
      return null;
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Request error for ${endpoint}:`, error);
    throw error;
  }
}

export async function fetchMusicData<T extends PlayableMedia>(): Promise<T | null> {
  type LastFmTrack = {
    name: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    url: string;
    isNowPlaying?: boolean;
  };
  type LastFmResponse = { tracks: LastFmTrack[] };

  const resp = await fetchFromAPI<LastFmResponse>('lastfm');
  if (!resp || !Array.isArray(resp.tracks) || resp.tracks.length === 0) {
    return null;
  }

  const now = resp.tracks.find(t => t.isNowPlaying) || resp.tracks[0];

  const mapped = {
    name: now.name,
    artists: now.artist,
    album: now.album,
    albumImageUrl: now.albumImageUrl,
    url: now.url,
    isPlaying: !!now.isNowPlaying,
    platform: 'Last.fm',
  };

  return mapped as unknown as T;
}
