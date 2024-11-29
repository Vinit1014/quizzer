
'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useRef, MutableRefObject } from "react";
import { io, Socket } from "socket.io-client";
import { Toaster, toast } from 'sonner';

interface ButtonProps {
  text: string;
  isJoin: boolean;
}

const AlertDialogDemo: React.FC<ButtonProps> = ({ text, isJoin }) => {
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [navigationOccurred, setNavigationOccurred] = useState(false);

  const socketRef: MutableRefObject<Socket | null> = useRef(null);
  const router = useRouter();

  const createBtn = async () => {
    console.log("I clicked on create.");
    const toastId = toast.loading('Creating room and player...');
    setLoading(true);
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomName: room, playerName: name }),
      });
      
      if (response.ok) {
        const result = await response.json();
        setNewUser(true);
        console.log('Room and player created:', result);
        router.push(`/${result.room.roomName}/${result.data.id}`);
        toast.success('Room and player created successfully', { id: toastId });
        
        const redirectToastId = toast.loading('Taking you to your room...', {
          duration: 8000,
        });
      } else {
        toast.error("Room already exists", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create room and player', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const joinBtn = async () => {
    console.log("Hi I clicked on join");
    const toastId = toast.loading('Finding room...');
    setLoading(true);
    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomName: room, playerName: name }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success", result);
        toast.success("Room found",{id: toastId});
        const redirectToastId = toast.loading('Taking you to your room...', {
          duration: 8000,
        });
        router.push(`/${result.room.roomName}/${result.data.id}`);
      } else {
        toast.error("Room doesn't exist", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to join room', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <Toaster richColors />
      <AlertDialogTrigger asChild>
        <Button variant="outline">{text}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex justify-center">
              {isJoin ? <h1 className="text-xl my-1">Join an existing room</h1> : <h1 className="text-xl my-1">Create a new room</h1>}
            </div>
            <h1 className="px-1">Enter the room name</h1>
            <input onChange={(e) => { setRoom(e.target.value) }} className="w-full px-2 p-1 my-1 border-2 border-slate-300 rounded-md" placeholder="Roomname" />
            <h1 className="my-2 px-1">Enter the username</h1>
            <input onChange={(e) => { setName(e.target.value) }} className="w-full px-2 p-1 border-2 border-slate-300 rounded-md" placeholder="Username" />
            <p className="text-sm text-gray-500 mt-1 px-1">
              This username will be displayed in the real-time leaderboard.
            </p>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={isJoin ? joinBtn : createBtn}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogDemo;
