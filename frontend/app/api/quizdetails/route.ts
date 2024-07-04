import { NextResponse } from "next/server";
// import {prisma} from "@backend/prisma";
import { prisma } from "@/prisma";
export async function POST(req:Request){
    try{
        const body = await req.json();
        const {id} = body;
        console.log(id);
        
        const quizz = await prisma.room.findFirst({
            where: {
                id: id
            },
        })
        
        return NextResponse.json({data:quizz});
        // return NextResponse.json({data:"Success"});
        // console.log("Successfull");
    
    }catch(error){
        // console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
        // return NextResponse.json({ erro  r: 'An error occurred while creating the room and player' }, { status: 500 });
    }
}
