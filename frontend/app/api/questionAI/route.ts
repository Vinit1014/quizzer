import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { roomId, questions } = body;

        const createdQuestions = [];

        // Insert each question with its answers individually
        for (const question of questions) {
            const createdQuestion = await prisma.question.create({
                data: {
                    questionText: question.questionText,
                    room: { connect: { id: roomId } },
                    answers: {
                        create: question.answers.map((answer: { answerText: string; isCorrect: boolean }) => ({
                            answerText: answer.answerText,
                            isCorrect: answer.isCorrect,
                        })),
                    },
                },
            });
            createdQuestions.push(createdQuestion);
        }        

        return NextResponse.json({ data: createdQuestions });
    } catch (error) { 
        console.error("Error saving questions:", error);
        return NextResponse.json({ error: 'Error saving questions' }, { status: 500 });
    }
}
