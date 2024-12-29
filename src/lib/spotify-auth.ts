import { cookies } from 'next/headers';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

export async function ensureSpotifyToken() {
  if (process.env.NODE_ENV === 'production') {
    return refresh_token;
  }

  const cookieStore = await cookies();
  return cookieStore.get('spotify_refresh_token')?.value;
}