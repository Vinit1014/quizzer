import { prisma } from "@backend/prisma";
import RoomPage from "@/components/RoomPage";
import LeaderBoard from "@/components/LeaderBoard";

export default async function Page({ params }: { params: { room: string } }) {
    const player = await prisma.player.findUnique({
        where: { id: params.room[1] },
    });
    if (!player) {
        console.log("Error in finding it.");
        return <div>Error: Player not found</div>;
    }
    
    const roomm = await prisma.room.findUnique({
        where: {roomName: params.room[0]},
    })

    async function getPlayers(){
        const players = await prisma.player.findMany({
            where: {role: 'STUDENT'}
        });
        return players;
    }
    const players = await getPlayers();
    console.log(players);

    // return (
    //     <h1>{player.role}</h1>
    //     // <h1>Hi room</h1>
    // )

    return (
        <>
        <LeaderBoard initialPlayers={players}/>
        <RoomPage
            roomId={roomm?.id}
            playerId={params.room[1]}
            playerRole={player.role}
            roomName={params.room[0]}
            />
        </>
    );
}
