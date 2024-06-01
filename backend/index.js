// import { json } from "body-parser";
// import cors from "cors";
const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

io.on('connection', (socket)=>{
    console.log("A user connected");

    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
})

app.get("/", (req, res) => {
    res.send("Hello world Live");
});

app.post("/update-score",async(req,res)=>{
    const {userId,score} = req.body;
    const user = await prisma.users.update({
        where:{
            id:userId
        },
        data:{
            score:score
        }
    })
    console.log(user);
})

app.listen(8000, () => console.log("Server running on port 8000"));
