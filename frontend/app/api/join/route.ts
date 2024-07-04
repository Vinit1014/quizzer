// import { NextResponse } from "next/server";
// import {prisma} from "@backend/prisma";

// export async function POST(req:Request){
//     try{
//         const body = await req.json();
//         const {roomName, playerName} = body;
//         console.log(roomName);
        
//         const room = await prisma.room.findFirst({
//             where:{
//                 roomName: roomName,
//             }
//         })

//         if (!room){
//             return NextResponse.json({error: "Room not found"},{ status: 404});
//         }
        
//         const player = await prisma.player.create({
//             data:{
//                 name:playerName,
//                 points:0,
//                 roomId: room.id,
//             }
//         })
        
//         const updatedRoom = await prisma.room.update({
//             where: {
//                 id: room.id,
//             },
//             data: {
//                 players: {
//                     connect:{
//                         id: player.id,
//                     },
//                 },
//             },
//             include:{
//                 players: true,  
//             },
//         });
        
//         return NextResponse.json({data:player});
//         // return NextResponse.json({data:"Success"});
//         // console.log("Successfull");
    
//     }catch(error){
//         // console.log(error);
//         return NextResponse.json({ error: error }, { status: 500 });
//         // return NextResponse.json({ erro  r: 'An error occurred while creating the room and player' }, { status: 500 });
//     }
// }


import { NextResponse } from "next/server";
// import { prisma } from "@backend/prisma";
import { prisma } from "@/prisma";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roomName, playerName } = body;

    // Find the room
    const room = await prisma.room.findFirst({
      where: { roomName },
      include: { players: true },
    });

    // If the room doesn't exist, return an error
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Check if the player already exists in the room
    let player = room.players.find((player) => player.name === playerName);

    // If the player doesn't exist, create a new player and add to the room
    if (!player) {
      player = await prisma.player.create({
        data: {
          name: playerName,
          points: 0,
          role: room.players.length === 0 ? "TEACHER" : "STUDENT", // Assign TEACHER role if it's the first player
          room: {
            connect: { id: room.id },
          },
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

    return NextResponse.json({ data: player });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
