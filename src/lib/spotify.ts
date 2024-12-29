const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  error?: string;
}

async function getAccessToken(): Promise<SpotifyToken | null> {
  if (!refresh_token) {
    return null;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    return response.json();
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

export async function getNowPlaying() {
  const token = await getAccessToken();
  
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (token.error) {
    return new Response('Unauthorized', { status: 401 });
  }

  return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
}