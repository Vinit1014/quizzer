import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
export async function POST(req:Request){
    try{
        const body = await req.json();
        const {userId} = body;
        console.log("I am userId "+userId);
        
        const quizz = await prisma.room.findMany({
            select: {
                id: true,
                quizTitle: true,
                roomName: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                userId: userId,
            },
        })
        
        return NextResponse.json({data:quizz});
        // return NextResponse.json({data:"Success"});
        // console.log("Successfull");
    
    }catch(error:any){
        // console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
        // return NextResponse.json({ erro  r: 'An error occurred while creating the room and player' }, { status: 500 });
    }
}
