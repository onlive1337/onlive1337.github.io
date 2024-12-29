import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-static';
export const revalidate = 0;

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_SITE_URL + '/api/spotify/callback';
const base_url = process.env.NEXT_PUBLIC_SITE_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error || !code) {
      console.error('Auth error:', error);
      return NextResponse.redirect(`${base_url}`);
    }

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Token error:', error);
      return NextResponse.redirect(`${base_url}`);
    }

    const data = await tokenResponse.json();

    if (!data.refresh_token) {
      console.error('No refresh token in response');
      return NextResponse.redirect(`${base_url}`);
    }

    const cookieStore = await cookies();
    cookieStore.set('spotify_refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.redirect(`${base_url}`);
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(`${base_url}`);
  }
}