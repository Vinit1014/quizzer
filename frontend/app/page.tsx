import LeaderBoard from "@/components/LeaderBoard";
import Upvotebutton from "@/components/Upvotebutton";
import {prisma} from "../../backend/prisma";

export default async function Home() {
  const getPlayers = async()=>{ 
    const user = await prisma.players.findMany();
    console.log(user);
    return user;
  }
    const players = await getPlayers();
    console.log(players);

    return (
    <main className="h-screen flex-col items-center justify-between p-24">
      <LeaderBoard initialPlayers={players}/>
      {players.map((player:any)=>{
        return <Upvotebutton player={player} key={player.id}/>
      })}
      
    </main>
  );
}

// await prisma.users.deleteMany()
// const user = await prisma.users.createMany({
//   data:[
//     {
//       name:"Vinit",
//       points: 20
//     },
//     {
//       name:"Neel",
//       points: 30
//     }
//   ]
// })
