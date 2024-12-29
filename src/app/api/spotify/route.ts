import { NextResponse } from 'next/server';
import { getNowPlaying } from '@/lib/spotify';

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

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return NextResponse.json({
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}