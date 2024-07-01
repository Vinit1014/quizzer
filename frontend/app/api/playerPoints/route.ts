import { NextResponse } from 'next/server';
import { prisma } from '@backend/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    
    const player = await prisma.player.findUnique({
      where: { id },
      select: { points: true }
    });
    
    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    return NextResponse.json({ data: player });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'An error occurred while fetching player points' }, { status: 500 });
  }
}
