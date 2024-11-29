require('dotenv').config();

import http from "http";
import { setupSocketServer } from "./socket/socketServer";
import { checkGeminiAPI } from "./utils/checkGeminiApi";
import { main } from "./db/main"; // Import the main function

const PORT = process.env.PORT || 8000;

// Create HTTP server
const httpServer = http.createServer(requestHandler);

// Setup Socket.io server
const io = setupSocketServer(httpServer);

// Start the HTTP server
httpServer.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  checkGeminiAPI();
  
  // Run Prisma and socket.io integration when ready
  // await main(io);
});

// Function to handle server start
function onServerStart() {
  console.log(`Server is running on port ${PORT}`);
  checkGeminiAPI();
}

// Request handler function
function requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is running ...");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
}

// Handle SIGINT for graceful shutdown
process.on("SIGINT", () => {
  process.exit(0);
});
