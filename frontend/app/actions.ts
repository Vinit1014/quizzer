"use server"
import { prisma } from "@backend/prisma";

export async function addPoints({ points, playerId }: { points: number; playerId: string }) {
  console.log(`addPoints, `, points, playerId);
  const updatedPlayer = await prisma.player.update({
    where: { id: playerId },
    data: { points: { increment: points } },
  });
  console.log(`Player ${updatedPlayer.name} now has ${updatedPlayer.points}.`);
}

export async function decPoints({ points, playerId }: { points: number; playerId: string }) {
  console.log(`addPoints, `, points, playerId);
  const updatedPlayer = await prisma.player.update({
    where: { id: playerId },
    data: { points: { decrement: points } },
  });
  console.log(`Player ${updatedPlayer.name} now has ${updatedPlayer.points}.`);
}