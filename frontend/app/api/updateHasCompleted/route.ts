import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { roomId, playerId } = body;
        console.log("RoomId is "+roomId+" PlayerId is "+ playerId+" inside updateHasCompleted");
        
        // Step 2: Update the player using the ID
        await prisma.player.update({
        where: {
            id: playerId, 
        },
        data: { hasCompleted: true },
        });

        return NextResponse.json({ message: "Player marked as completed" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
