import { Server } from "socket.io";
import { prisma } from "./prisma";

export async function main(io: Server) {
    console.log("Initializing Prisma and setting up event listeners");

    // Start a Prisma stream to listen to changes on the 'Player' model
    const stream = await prisma.player.stream();

    process.on("exit", () => {
        stream.stop();
        console.log("Stream stopped and Prisma client disconnected.");
    });

    // Clear the database before starting (optional, based on your requirements)
    await prisma.player.deleteMany();
    await prisma.answer.deleteMany();
    await prisma.question.deleteMany();
    await prisma.room.deleteMany();

    console.log("Database cleaned. Waiting for Prisma stream events...");

    // Listen for events from the Prisma stream
    // for await (const event of stream) {
    //     console.log("Received event:", event);

    //     if (event.action === "update") {
    //     // Emit 'player_points' event when a 'Player' is updated
    //     io.sockets.emit("player_points", event);
    //     } else if (event.action === "create") {
    //     // Emit 'new_player' event when a new 'Player' is created
    //     io.sockets.emit("new_player", event);
    //     // Emit 'update-leaderboard' to refresh leaderboard on client side
    //     io.sockets.emit("update-leaderboard");
    //     }
    //     // You can add more event handling logic as needed
    // }
}
