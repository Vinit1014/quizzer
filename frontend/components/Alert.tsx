"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface ButtonProps {
  text:String  
  isJoin:Boolean
}

const AlertDialogDemo : React.FC<ButtonProps> = ({text,isJoin}) => {
  const [room,setRoom] = useState('');
  const [name,setName] = useState('');

  useEffect(()=>{
    console.log(name);
  },[name])

  useEffect(()=>{
    console.log(room);
  },[room])
  
  const router = useRouter();
  const continueBtn = ()=>{
    router.push(`/${room}/${name}`)
  };

  return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">{text}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex justify-center">
                {isJoin ? <h1 className="text-xl my-1">Join an existing room</h1>: <h1 className="text-xl my-1">Create a new room</h1>}
              </div>
              <h1 className="px-1">Enter the room name</h1> 
              <input onChange={(e)=>{setRoom(e.target.value)}} className="w-full p-1 my-1 border-2 border-slate-300 rounded-md" placeholder="Roomname"/>
              <h1 className="my-2 px-1  ">Enter the username</h1>
              <input onChange={(e)=>{setName(e.target.value)}} className="w-full p-1 border-2 border-slate-300 rounded-md" placeholder="Username"/>
              <p className="text-sm text-gray-500 mt-1 px-1">
                This username will be displayed in the real-time leaderboard.
              </p>
            </AlertDialogTitle>
            {/* <AlertDialogDescription>
            </AlertDialogDescription> */}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={continueBtn}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
export default AlertDialogDemo;