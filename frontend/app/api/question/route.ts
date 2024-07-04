import { NextResponse } from "next/server";
// import {prisma} from "@backend/prisma";
import { prisma } from "@/prisma";
export async function POST(req:Request){
    try{
        const body = await req.json();
        const {roomId, questionText, answers} = body;
        const newQuestion = await prisma.question.create({
            data: {
              questionText,
              room: { connect: { id: roomId } },
              answers: {
                create: answers.map((answer: { answerText: any; isCorrect: any; }) => ({
                  answerText: answer.answerText,
                  isCorrect: answer.isCorrect,
                })),
              },
            },
        });
        return NextResponse.json({data:newQuestion});
        
    }catch(error){
        return NextResponse.json({ error: error }, { status: 500 });
        // return NextResponse.json({ erro  r: 'An error occurred while creating the room and player' }, { status: 500 });
    }
}
