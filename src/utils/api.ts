export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-api-taupe-theta.vercel.app/api';

interface PlayableMedia {
  isPlaying: boolean;
}

export async function fetchFromAPI<T>(
  endpoint: string, 
  options?: RequestInit,
  timeout: number = 8000
): Promise<T | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn(`API error (${endpoint}): ${response.status}`);
      return null;
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn(`API returned non-JSON (${endpoint}): ${contentType}`);
      return null;
    }
    
    return await response.json() as T;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.warn(`Request timeout for ${endpoint}`);
    } else {
      console.error(`Request error for ${endpoint}:`, error);
    }
    
    return null;
  }
}

const durationCache = new Map<string, { durationMs: number; explicit: boolean }>();

export async function fetchMusicData<T extends PlayableMedia>(timeout: number = 8000): Promise<T | null> {
  type LastFmTrack = {
    name: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    url: string;
    isNowPlaying?: boolean;
    timestamp?: string;
  };
  type LastFmResponse = { tracks: LastFmTrack[] };

  const resp = await fetchFromAPI<LastFmResponse>('lastfm', undefined, timeout);
  if (!resp || !Array.isArray(resp.tracks) || resp.tracks.length === 0) {
    return null;
  }

  const now = resp.tracks.find(t => t.isNowPlaying) || resp.tracks[0];

  const startedAtMs = now.timestamp ? Number(now.timestamp) * 1000 : undefined;
  const progressMs = now.isNowPlaying && startedAtMs ? Math.max(0, Date.now() - startedAtMs) : 0;

  const cacheKey = `${now.artist} - ${now.name}`.toLowerCase();
  let durationMs = 0;
  let explicit = false;

  if (durationCache.has(cacheKey)) {
    const cached = durationCache.get(cacheKey)!;
    durationMs = cached.durationMs;
    explicit = cached.explicit;
  } else {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const term = encodeURIComponent(`${now.artist} ${now.name}`);
      const res = await fetch(`https://itunes.apple.com/search?term=${term}&media=music&limit=5`, { signal: controller.signal });
      clearTimeout(id);
      if (res.ok) {
        interface ITunesTrack {
          trackName?: string;
          artistName?: string;
          trackTimeMillis?: number;
          trackExplicitness?: 'explicit' | 'cleaned' | 'notExplicit' | string;
        }
        interface ITunesSearchResponse {
          results?: ITunesTrack[];
          resultCount?: number;
        }
        const json = await res.json() as ITunesSearchResponse;
        const results: ITunesTrack[] = Array.isArray(json?.results) ? (json.results as ITunesTrack[]) : [];
        const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
        const targetTrack = norm(now.name);
        const targetArtist = norm(now.artist);
        let best: ITunesTrack | null = null;
        let bestScore = -1;
        for (const r of results) {
          const rTrack = norm(r.trackName || '');
          const rArtist = norm(r.artistName || '');
          let score = 0;
          if (rTrack === targetTrack) score += 2; else if (rTrack.includes(targetTrack) || targetTrack.includes(rTrack)) score += 1;
          if (rArtist === targetArtist) score += 2; else if (rArtist.includes(targetArtist) || targetArtist.includes(rArtist)) score += 1;
          if (typeof r.trackTimeMillis === 'number') score += 1;
          if (score > bestScore) { bestScore = score; best = r; }
        }
        if (best && typeof best.trackTimeMillis === 'number') {
          durationMs = best.trackTimeMillis;
          explicit = (best.trackExplicitness === 'explicit');
          durationCache.set(cacheKey, { durationMs, explicit });
        }
      }
    } catch {
    }
  }

  const mapped = {
    name: now.name,
    artists: now.artist,
    album: now.album,
    albumImageUrl: now.albumImageUrl,
    url: now.url,
    isPlaying: !!now.isNowPlaying,
    progressMs,
    durationMs,
    explicit,
    platform: 'Last.fm',
  };

  return mapped as unknown as T;
}

export function useInterval(callback: () => void, delay: number, immediate: boolean = true) {
  const savedCallback = React.useRef<(() => void) | null>(null);
  
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  React.useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    
    if (immediate) {
      tick();
    }
    
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay, immediate]);
}

import React from 'react';