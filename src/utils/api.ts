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

export async function fetchMusicData<T extends PlayableMedia>(timeout: number = 8000): Promise<T | null> {
  let data = await fetchFromAPI<T>('statsfm', undefined, timeout);
  if (data && data.isPlaying) {
    return data;
  }
  
  data = await fetchFromAPI<T>('yandex', undefined, timeout);
  if (data && data.isPlaying) {
    return data;
  }
  
  return data || null;
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