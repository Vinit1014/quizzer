import { NextResponse } from "next/server";
// import {prisma} from "@backend/prisma";
import { prisma } from "@/prisma";
export async function POST(req:Request){
    try{
        const body = await req.json();
        const {roomName, quizTitle, quizDescription, quizDuration} = body;
        console.log(roomName,quizDuration);
        
        const updatedRoom = await prisma.room.update({
            where: { roomName: roomName },
            data: {
              quizTitle,
              quizDescription,
              quizDuration: parseInt(quizDuration, 10),
            },
          });
          console.log('Updated room: ',updatedRoom);
          
        return NextResponse.json({data:updatedRoom});
        // return NextResponse.json({data:"Success"});
          
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 });
        // return NextResponse.json({ erro  r: 'An error occurred while creating the room and player' }, { status: 500 });
    }
}
