import { NextResponse } from "next/server";
import {prisma} from "../../../../backend/prisma";

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {roomName, playerName} = body;
        const room = await prisma.room.create({
            data:{
                roomName,
                players:{
                    create: [
                        { name: playerName, points: 0 },
                    ],
                },
            },
            include:{ players: true },
        })    
        // console.log("Successfull");
        return NextResponse.json({data:room});

    }catch(error){
        // console.log(error);
        return NextResponse.json({ error: 'An error occurred while creating the room and player' }, { status: 500 });
    }
}
