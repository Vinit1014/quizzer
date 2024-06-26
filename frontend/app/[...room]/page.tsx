import {prisma} from "@backend/prisma";

export default async function Page({ params }: { params: { room: string } }) {
    const player = await prisma.player.findUnique({
        where: {id: params.room[1]},
    });
    if (player) {
        console.log("Fetched successfully");
        console.log(player);
        
      } else {
        console.log("Error in finding it.");
    }
    
    // return <div>My Post: {params.room[1]}</div>
    return <div>My Post: {player?.name} {player?.points}</div>
}
