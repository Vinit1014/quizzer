'use client'
import Navbar from "@/components/Navbar";
import AlertDialogDemo from "@/components/Alert";
import { motion } from "framer-motion"

export default async function Home() {
  
    return (
      <>
        {/* <Navbar/>
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
        
          <div className="max-w-xl text-center">
            <h2 className="text-4xl font-bold mb-8">Welcome to Quizzer</h2>
            <p className="text-lg mb-4">&quot;Compete with your colleagues with real time leaderboard.&quot;</p>
            <div className="flex justify-between ">
              <div 
                className="">
                <AlertDialogDemo text={"Join an existing room"} isJoin={true}/>
                
              </div>
              
              <div className="font-bold py-1">
                Or
              </div>
              
              <div className="">
                <AlertDialogDemo text={"Create a new room"} isJoin={false}/>
                
              </div>
              
            </div>
          </div>
        </main> */}
        
        <Navbar/>
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
        
          <div className="max-w-xl text-center">
          <motion.div
              initial={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1, y: 0 }}
              >
            <h2 className="text-4xl font-bold mb-8">Welcome to Quizzer</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1, y: 0 }}
              >
            <p className="text-lg mb-4">&quot;Compete with your colleagues with real time leaderboard&quot;</p>
              </motion.div>
            <div className="flex justify-between ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1, x: 0 }}
              >
              <div 
                className="">
                <AlertDialogDemo text={"Join an existing room"} isJoin={true}/>
                
              </div>
              </motion.div>
              <motion.div
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1, y: 0 }}
              >
              <div className="font-bold py-1">
                Or
              </div>
              </motion.div>
              <motion.div
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1, x: 0 }}
              >
              <div className="">
                <AlertDialogDemo text={"Create a new room"} isJoin={false}/>
              </div>
              </motion.div>
            </div>
          </div>
        </main>
        
      </>
    );
  }
  
