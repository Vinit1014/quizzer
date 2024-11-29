// /app/api/getRoomAndPlayer/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function POST(req: Request) {
    try {
        const { roomName, userId } = await req.json();

        console.log("Inside backend testing "+ roomName, userId);
        
        // Fetch room information based on roomName
        const room = await prisma.room.findUnique({
        where: { roomName },
        });

        if (!room) {
        return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        // Fetch player information based on roomId and userId
        const player = await prisma.player.findFirst({
            where: {
                AND: [
                    { roomId: room.id },
                    { userId: userId },
                ],
            },
        });
        
        
        console.log("I am player "+player);
        
        // Return the room and player data
        return NextResponse.json({ room, player }, { status: 200 });
    } catch (error:any) {
        console.error("Got this error "+error.message);
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
}
