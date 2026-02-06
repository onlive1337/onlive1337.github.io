export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-api-taupe-theta.vercel.app/api';

export async function fetchFromAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> {
  const url = `${API_BASE_URL}/${endpoint}`;
  const fetchOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  };

  let response: Response;
  try {
    response = await fetch(url, fetchOptions);
  } catch (error) {
    console.error(`Request error for ${endpoint}:`, error);
    throw error;
  }

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
}
