import { NextResponse } from 'next/server';
import { getCurrentGame } from '@/lib/steam';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  try {
    const game = await getCurrentGame();
    return NextResponse.json(game);
  } catch (error: unknown) {
    console.error('Steam API error:', error);
    return NextResponse.json(null);
  }
}