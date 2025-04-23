
require('dotenv').config();
import http from "http";
import { Server } from "socket.io";
import { createClient } from "@supabase/supabase-js";

const PORT = process.env.PORT || 8000;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

// initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const httpServer = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is running ...");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let timerInterval: NodeJS.Timeout | null = null;
let timeLeft = 0;

// socket.io handlers
io.on("connection", (socket) => {
  console.log(`A new user connected: ${socket.id}`);
  socket.emit("updateTimer", timeLeft);

  socket.on("initializeTimer", (duration: number) => {
    timeLeft = duration;
  });

  socket.on("start-timer", (duration: number) => {
    if (timerInterval) clearInterval(timerInterval);
    timeLeft = duration * 60;
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        io.emit("updateTimer", timeLeft);
      } else {
        clearInterval(timerInterval!);
        timerInterval = null;
        io.emit("quiz-ended");
      }
    }, 1000);
  });
});

httpServer.listen(PORT, () => {
  console.log(`socket.io server is running on port ${PORT}`);

  // --- SUPABASE REALTIME SUBSCRIPTION ---
  supabase
    .channel("public:player_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "player" },
      (payload) => {
        console.log("Realtime payload:", payload);
        if (payload.eventType === "UPDATE") {
          io.emit("player_points", payload.new);
        } else if (payload.eventType === "INSERT") {
          io.emit("new_player", payload.new);
          io.emit("update-leaderboard");
        }
        // handle DELETE if you need to remove players
      }
    )
    .subscribe();
});

