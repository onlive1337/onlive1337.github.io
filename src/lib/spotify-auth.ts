import { cookies } from 'next/headers';

const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

export async function ensureSpotifyToken(): Promise<string | null> {
  if (process.env.NODE_ENV === 'production') {
    return refresh_token || null;
  }

  const cookieStore = await cookies();
  return cookieStore.get('spotify_refresh_token')?.value || null;
}