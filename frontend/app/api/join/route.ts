import { NextResponse } from "next/server";
import {prisma} from "@backend/prisma";

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {roomName, playerName} = body;
        console.log(roomName);

        const room = await prisma.room.findFirst({
            where:{
                roomName: roomName,
            }
        })

        if (!room){
            return NextResponse.json({error: "Room not found"},{ status: 404});
        }

        const player = await prisma.player.create({
            data:{
                name:playerName,
                points:0,
                roomId: room.id,
            }
        })
        
        const updatedRoom = await prisma.room.update({
            where: {
                id: room.id,
            },
            data: {
                players: {
                    connect:{
                        id: player.id,
                    },
                },
            },
            include:{
                players: true,  
            },
        });
        
        return NextResponse.json({data:player});
        // return NextResponse.json({data:"Success"});
        // console.log("Successfull");
    
    }catch(error){
        // console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
        // return NextResponse.json({ erro  r: 'An error occurred while creating the room and player' }, { status: 500 });
    }
}
