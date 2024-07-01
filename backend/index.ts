require('dotenv').config();

import http from "http";
import { Server } from "socket.io";
import { prisma } from "./prisma";


const PORT = process.env.PORT || 8000;

const httpServer = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is running ...");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// const corsOrigins = [
//   process.env.CLIENT_URL ?? "http://localhost:3000",
//   "http://localhost:3000",
// ];
// console.log(`cors origins: `, corsOrigins);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    // origin: corsOrigins,
    methods: ["GET", "POST"],
    // credentials: true,
  },
});

let timerInterval: NodeJS.Timeout | null = null;
let timeLeft = 0;

io.on("connection",(socket)=>{
  console.log(`A new user connected: ${socket.id}`);
  
  socket.emit('updateTimer', timeLeft);

  socket.on("initializeTimer", (duration:number)=>{
    timeLeft = duration;
  })

  socket.on('start-timer', (duration:number)=>{
    if (timerInterval) clearInterval(timerInterval);
    timeLeft = duration * 60;
    timerInterval = setInterval(()=>{
      if (timeLeft > 0) {
        timeLeft--;
        io.emit('updateTimer', timeLeft);
      }
      else{
        clearInterval(timerInterval!);
        timerInterval = null;
      }
    }, 1000);
  })
})

httpServer.listen(PORT, async () => {
  console.log(`socket.io server is running on port ${PORT}`);
  await main(io);
});

process.on("SIGINT", () => {
  process.exit(0);
});

async function main(io: Server) {

  console.log("Working fine");
  const stream = await prisma.player.stream();
  
  process.on("exit", () => {
    stream.stop();
  });

  // await prisma.player.deleteMany()
  // await prisma.answer.deleteMany()
  // await prisma.question.deleteMany()
  // await prisma.room.deleteMany()

  for await (const event of stream) {
    console.log("just received an event:", event);  
    
    if (event.action === "update") {
      io.sockets.emit("player_points", event);
    }
    else if (event.action === "create"){
      io.sockets.emit("new_player", event);
    }
  }
}
