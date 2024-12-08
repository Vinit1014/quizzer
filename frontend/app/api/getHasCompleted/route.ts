import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const { roomId, playerId} = body;
        console.log("RoomId is "+roomId+" PlayerId is "+ playerId+" inside getHasCompleted");
        

        const player1 = await prisma.player.findFirst({
            where: {id: playerId} //Inside supabase it is id
        });

        return NextResponse.json({data:player1})

    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }
}