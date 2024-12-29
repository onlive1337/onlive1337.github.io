import { NextResponse } from 'next/server';
import { getCurrentGame } from '@/lib/steam';

export const dynamic = 'force-static';
export const revalidate = 0;

export async function GET() {
  try {
    const game = await getCurrentGame();
    return NextResponse.json(game);
  } catch (error) {
    console.error('Steam API error:', error);
    return NextResponse.json(null);
  }
}