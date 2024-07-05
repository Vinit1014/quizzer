import { NextResponse } from "next/server";
// import {prisma} from "@backend/prisma";
import { prisma } from "@/prisma";
export async function POST(req:Request){
    try{
        const body = await req.json();
        const {roomName, playerName} = body;
        console.log(roomName);
        const room = await prisma.room.create({
            data:{
                roomName,
                quizDescription: '', // Initial value, to be updated later
                quizDuration: 0, // Initial value, to be updated later
                quizTitle: '', // Initial value, to be updated later
                players:{
                    create: [
                        { name: playerName, points: 0, role:'TEACHER' },
                    ],
                },
            },
            // include:{ players: true },
        })
        
        const player = await prisma.player.findFirst({
            where:{
                name: playerName
            }
        })

        // return NextResponse.json({data:room});
        return NextResponse.json({data:player,room});
        // return NextResponse.json({data:"Success"});
        // console.log("Successfull");
        
    }catch(error){
        // console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
        // return NextResponse.json({ erro  r: 'An error occurred while creating the room and player' }, { status: 500 });
    }
}
