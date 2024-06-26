import { NextResponse } from "next/server";
import {prisma} from "@backend/prisma";

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {roomName, playerName} = body;
        console.log(roomName);
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
        return NextResponse.json({data:room});
        // return NextResponse.json({data:"Success"});
        // console.log("Successfull");
    
    }catch(error){
        // console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
        // return NextResponse.json({ erro  r: 'An error occurred while creating the room and player' }, { status: 500 });
    }
}
