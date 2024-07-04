'use client'
import LeaderBoard from "@/components/LeaderBoard";
import Upvotebutton from "@/components/Upvotebutton";
import {prisma} from "../../backend/prisma";
import RoomBtn from "@/components/RoomBtn";
import Navbar from "@/components/Navbar";
import ButtonComp from "@/components/Button";
import AlertDialogDemo from "@/components/Alert";
import { motion } from "framer-motion"

export default async function Home() {
  
    return (
      <>
        <Navbar/>
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
        
          <div className="max-w-xl text-center">
            <h2 className="text-4xl font-bold mb-8">Welcome to Quizzer</h2>
            <p className="text-lg mb-4">"Compete with your colleagues with real time leaderboard."</p>
            <div className="flex justify-between ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, x: 0 }}
              >
              <div 
                className="">
                <AlertDialogDemo text={"Join an existing room"} isJoin={true}/>
                {/* <ButtonComp text={"Join an existing room"}/> */}
              </div>
              </motion.div>
              <motion.div
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
              >
              <div className="font-bold py-1">
                Or
              </div>
              </motion.div>
              <motion.div
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, x: 0 }}
              >
              <div className="">
                <AlertDialogDemo text={"Create a new room"} isJoin={false}/>
                {/* <ButtonComp text={"Create a new room"}/> */}
              </div>
              </motion.div>
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
