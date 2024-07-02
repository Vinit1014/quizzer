import { prisma } from "@backend/prisma";
import RoomPage from "@/components/RoomPage";
import LeaderBoard from "@/components/LeaderBoard";
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000'; // Replace with your server URL
const socket: Socket = io(SOCKET_URL);

export default async function Page({ params }: { params: { room: string } }) {
    const player = await prisma.player.findUnique({
        where: { id: params.room[1] },
    });
    if (!player) {
        console.log("Error in finding it.");
        return <div>Error: Player not found</div>;
    }
    
    socket.on("update-leaderboard",async()=>{
        console.log("New user joineddddddddd");
        players = await getPlayers();
    })
    const roomm = await prisma.room.findUnique({
        where: {roomName: params.room[0]},
    })

    async function getPlayers(){
        const players = await prisma.player.findMany({
            where: {role: 'STUDENT', roomId:roomm?.id}
        });
        return players;
    }
    
    let players = await getPlayers();
    // const interval = setInterval(getPlayers, 10000);
    console.log(players);
    
    // return (
    //     <h1>{player.role}</h1>
    //     // <h1>Hi room</h1>
    // )

    return (
        <>
        <RoomPage
            roomId={roomm?.id}
            playerId={params.room[1]}
            playerRole={player.role}
            roomName={params.room[0]}
            />
        <LeaderBoard initialPlayers={players} roomId={roomm?.id}/>
        </>
    );
}
