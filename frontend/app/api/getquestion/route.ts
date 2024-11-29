import { NextResponse } from "next/server";
// import {prisma} from "@backend/prisma";
import { prisma } from "@/prisma";
export async function POST(req:Request){
    try{
        const body = await req.json();
        const {id} = body;
        console.log(id);
        
        const questions = await prisma.question.findMany({
            where: {
                roomId:id
            },
            include: {
                answers: true,
            },
        })
        
        return NextResponse.json({data:questions});
        // return NextResponse.json({data:"Success"});
        // console.log("Successfull");
        
    }catch(error){
        // console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
        // return NextResponse.json({ error: 'An error occurred while creating the room and player' }, { status: 500 });
    }
}
