export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-api-taupe-theta.vercel.app/api';

const DEFAULT_TIMEOUT = 10000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchFromAPI<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T | null> {
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

      if (!response.ok) {
        lastError = new Error(`API error: ${response.status}`);
        if (attempt < retries) {
          await delay(RETRY_DELAY * (attempt + 1));
          continue;
        }
        throw lastError;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn(`API returned non-JSON (${endpoint}): ${contentType}`);
        return null;
      }

      return await response.json() as T;
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error as Error;

      if (error instanceof Error && error.name === 'AbortError') {
        console.warn(`Request timeout for ${endpoint}`);
      } else if (!(error instanceof Error && error.message.startsWith('API error:'))) {
        console.error(`Request error for ${endpoint} (attempt ${attempt + 1}):`, error);
      }

      if (attempt < retries) {
        await delay(RETRY_DELAY * (attempt + 1));
      }
    }
  }

  throw lastError || new Error(`Failed to fetch ${endpoint}`);
}
