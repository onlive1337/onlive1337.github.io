import { NextResponse } from 'next/server';
import { getCurrentGame } from '@/lib/steam';

export async function GET() {
  try {
    const game = await getCurrentGame();
    
    if (!game) {
      return NextResponse.json(null);
    }

    return NextResponse.json(game);
  } catch (error) {
    console.error('Steam API error:', error);
    return NextResponse.json(null);
  }
}