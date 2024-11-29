import { Server } from "socket.io";
import http from "http";
import { setupTimerEvents } from "./timer";

export function setupSocketServer(server: http.Server) {
    const corsOrigins = [
        process.env.CLIENT_URL ?? "http://localhost:3000",
        "http://localhost:3000",
    ];

    console.log(`CORS origins: `, corsOrigins);

    const io = new Server(server, {
        cors: {
        origin: corsOrigins,
        methods: ["GET", "POST"],
        },
    });

    setupSocketEvents(io);
    return io;
}

function setupSocketEvents(io:Server){
    io.on("connection", (socket)=>{
        console.log(`A new user connected: ${socket.id}`);
        setupTimerEvents(socket, io);
    })
}
