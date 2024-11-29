
import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roomName, quizTitle, quizDescription, quizDuration, playerName, userId } = body;
    
    console.log('Creating room with:', roomName, quizTitle, quizDuration);
    
    // Create a new room with the quiz details and the teacher as an initial player
    const room = await prisma.room.create({
      data: {
        roomName,
        quizTitle,
        quizDescription,
        quizDuration: parseInt(quizDuration, 10),
        userId,
        players: {
          create: [
            { name: playerName, points: 0, role: 'TEACHER', userId }, // Add teacher as the initial player
          ],
        },
      },
    });

    console.log('Created room:', room);

    return NextResponse.json({ data: room, message:"Created successfully" });

  } catch (error: any) {
    console.error('Error creating room:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
