// import http from "http";
// import { Server } from "socket.io";
// import { prisma } from "./prisma";

// const PORT = process.env.PORT || 8000;

// const httpServer = http.createServer((req, res) => {
//     // Define the routes
//     if (req.method === "GET" && req.url === "/") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.end("Server is running ...");
//     } else {
//       // Handle 404 Not Found
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       res.end("404 Not Found");
//     }
// });

// const corsOrigins = [
//     process.env.CLIENT_URL ?? "http://localhost:3000",
//     "http://localhost:3000",
// ]
// console.log(`cors origins: `, corsOrigins)

// const io = new Server(httpServer, {
//     cors: {
//       origin: corsOrigins,
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
// });

// httpServer.listen(PORT, async () => {
//   console.log(`socket.io server is running on port ${PORT}`);
//   await main(io);
// });

// process.on('SIGINT', () => {
//   process.exit(0)
// })

// async function main(io:Server) {
//   const stream = await prisma.players.stream()

//   process.on('exit', (code) => {
//     stream.stop()
//   })

//   for await (const event of stream) {
//     console.log('just received an event:', event)

//     if (event.action === 'update') {
//         io.sockets.emit("player_points",event);
//     }
//   }
// }


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
    methods: ["GET", "POST"],
    // credentials: true,
  },
});

httpServer.listen(PORT, async () => {
  console.log(`socket.io server is running on port ${PORT}`);
  await main(io);
});

process.on("SIGINT", () => {
  process.exit(0);
});

async function main(io: Server) {
  const stream = await prisma.players.stream();

  process.on("exit", () => {
    stream.stop();
  });

  for await (const event of stream) {
    console.log("just received an event:", event);

    if (event.action === "update") {
      io.sockets.emit("player_points", event);
    }
  }
}