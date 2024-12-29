import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

interface SpotifyArtist {
  name: string;
}

interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
}

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 401) {
      return NextResponse.json({ isUnauthorized: true }, { status: 401 });
    }

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();

    if (!song.item) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = song.item as SpotifyTrack;

    return NextResponse.json({
      isPlaying: song.is_playing,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      album: track.album.name,
      albumImageUrl: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
    });
  } catch (error: unknown) {
    console.error('Spotify API error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}