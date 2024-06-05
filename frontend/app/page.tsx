import LeaderBoard from "@/components/LeaderBoard";
import Upvotebutton from "@/components/Upvotebutton";
import {prisma} from "../../backend/prisma";
import RoomBtn from "@/components/RoomBtn";
import Navbar from "@/components/Navbar";
import ButtonComp from "@/components/Button";
import AlertDialogDemo from "@/components/Alert";

export default async function Home() {
  // const getPlayers = async()=>{ 
  //   const user = await prisma.players.findMany();
  //   console.log(user);
  //   return user;
  // }
  // const players = await getPlayers();
  // console.log(players);

    return (
      <>
        <Navbar/>
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
          <div className="max-w-xl text-center">
            <h2 className="text-4xl font-bold mb-8">Welcome to Quizer</h2>
            <p className="text-lg mb-4">Compete with your colleagues with real time leaderboard.</p>
            <div className="flex justify-between ">
              <div 
                className="">
                <AlertDialogDemo text={"Join an existing room"}/>
                {/* <ButtonComp text={"Join an existing room"}/> */}
              </div>
              <div className="font-bold py-1">
                Or
              </div>
              <div className="">
                <AlertDialogDemo text={"Create a new room"}/>
                {/* <ButtonComp text={"Create a new room"}/> */}
              </div>
            </div>
          </div>
        </main>
        
      </>
    );
  }
  
  
  // <main className="h-screen flex-col items-center justify-between p-24">
  //   <LeaderBoard initialPlayers={players}/>
  //   {players.map((player:any)=>{
  //     return <Upvotebutton player={player} key={player.id}/>
  //   })}
  // </main>