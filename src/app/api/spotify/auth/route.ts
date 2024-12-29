import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_SITE_URL + '/api/spotify/callback';

export async function GET() {
  const scope = 'user-read-currently-playing user-read-playback-state';
  
  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: client_id!,
    scope: scope,
    redirect_uri: redirect_uri,
  });

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${queryParams.toString()}`);
}