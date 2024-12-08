import { NextResponse } from 'next/server';
// import { prisma } from '@backend/prisma';
import { prisma } from "@/prisma";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, roomId } = body;
    
    const player = await prisma.player.findUnique({
      where: { id, roomId },
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
