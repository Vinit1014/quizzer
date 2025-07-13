import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const body = await req.json();
        const {roomId} = body;
        const updateRoomStatus = await prisma.room.update({
            where: {id: roomId},
            data: {
                isQuizCompleted: true
            }
        });
        return NextResponse.json({
            message: 'Quiz mark as completed',
            room: updateRoomStatus
        }, {status:200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}