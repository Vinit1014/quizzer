import { NextResponse } from "next/server";
import {prisma} from "@backend/prisma";

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {roommid} = body;
        console.log(roommid);
        
        const players = await prisma.player.findMany({
            where: {role: 'STUDENT', roomId:roommid}
        });
        
        return NextResponse.json({data:players});
        // return NextResponse.json({data:"Success"});
        // console.log("Successfull");
        
    }catch(error){
        // console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
        // return NextResponse.json({ erro  r: 'An error occurred while creating the room and player' }, { status: 500 });
    }
}
