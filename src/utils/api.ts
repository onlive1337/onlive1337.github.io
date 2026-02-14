export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-api-taupe-theta.vercel.app/api';

const DEFAULT_TIMEOUT = 10000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

export interface FetchResult<T> {
  data: T | null;
  error?: string;
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchFromAPIWithMeta<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<FetchResult<T>> {
  const url = `${API_BASE_URL}/${endpoint}`;
  const { timeout = DEFAULT_TIMEOUT, retries = MAX_RETRIES, ...fetchInit } = options || {};

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchInit,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchInit.headers,
        },
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn(`API returned non-JSON (${endpoint}): ${contentType}`);
        if (attempt < retries) {
          await delay(RETRY_DELAY * (attempt + 1));
          continue;
        }
        return { data: null, error: 'Invalid response format' };
      }

      const data = await response.json();

      if (data && typeof data === 'object' && 'error' in data && !response.ok) {
        lastError = new Error(data.error || `API error: ${response.status}`);
        if (attempt < retries) {
          await delay(RETRY_DELAY * (attempt + 1));
          continue;
        }
        return { data: null, error: data.error };
      }

      if (!response.ok) {
        lastError = new Error(`API error: ${response.status}`);
        if (attempt < retries) {
          await delay(RETRY_DELAY * (attempt + 1));
          continue;
        }
        return { data: null, error: `HTTP ${response.status}` };
      }

      return { data: data as T };
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error as Error;

      if (error instanceof Error && error.name === 'AbortError') {
        console.warn(`Request timeout for ${endpoint}`);
      } else {
        console.error(`Request error for ${endpoint} (attempt ${attempt + 1}):`, error);
      }

      if (attempt < retries) {
        await delay(RETRY_DELAY * (attempt + 1));
      }
    }
  }

  return { data: null, error: lastError?.message || 'Unknown error' };
}

export async function fetchFromAPI<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T | null> {
  const result = await fetchFromAPIWithMeta<T>(endpoint, options);

  if (result.error) {
    console.error(`API Error (${endpoint}):`, result.error);
  }

  return result.data;
}
