
import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roomName, userId } = body;
    
    // Find the room
    const room = await prisma.room.findFirst({
      where: { roomName },
      include: { players: true },
    });

    // If the room doesn't exist, return an error
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }
    
    // Fetch the user from the database to get their name
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // If the user does not exist, return an error
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the player already exists in the room
    let player = room.players.find((player: any) => player.userId === userId);

    // If the player doesn't exist, create a new player and add to the room
    if (!player) {
      player = await prisma.player.create({
        data: {
          name: user.name,
          points: 0,
          role: "STUDENT", 
          room: {
            connect: { id: room.id },
          },
          user: {
            connect: { id: userId},
          }
        },
      });

      // Update the room with the new player
      await prisma.room.update({
        where: { id: room.id },
        data: {
          players: {
            connect: { id: player.id },
          },
        },
      });
    }

    return NextResponse.json({ data: player, room });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
