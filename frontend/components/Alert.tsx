
// "use client";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useEffect, useState, useRef, MutableRefObject } from "react";
// import { io, Socket } from "socket.io-client";

// interface ButtonProps {
//   text: String;
//   isJoin: Boolean;
// }

// const AlertDialogDemo: React.FC<ButtonProps> = ({ text, isJoin }) => {
//   const [room, setRoom] = useState('');
//   const [name, setName] = useState('');
//   const [newUser, setNewUser] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state

//   let socketRef: MutableRefObject<Socket | null> = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000';
//     socketRef.current = io(url);

//     socketRef.current.on("connect_error", (err) => {
//       console.error(`Connection error: ${err.message}`);
//     });

//     socketRef.current.on("new_player", (event: any) => {
//       console.log("New player event received", event);
//       console.log(event.created.id);
//       console.log(room);
      
//       router.push(`http://localhost:3000/${room}/${event.created.id}`);
      
//       setLoading(false); // Stop loading once the event is received
//     });

//     return () => {
//       socketRef.current?.off("new_player");
//     };
//   }, []); // Empty dependency array ensures this runs only once

//   const continueBtn = async () => {
//     setLoading(true); // Start loading when button is clicked
//     try {
//       const response = await fetch("/api/create", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ roomName: room, playerName: name }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setNewUser(true);
//         console.log('Room and player created:', result);
//       } else {
//         setLoading(false); // Stop loading if there's an error
//         console.error("Failed to create room and player");
//       }
//     } catch (error) {
//       setLoading(false); // Stop loading if there's an error
//       console.log(error);
//     }
//   };

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant="outline">{text}</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>
//             <div className="flex justify-center">
//               {isJoin ? <h1 className="text-xl my-1">Join an existing room</h1> : <h1 className="text-xl my-1">Create a new room</h1>}
//             </div>
//             <h1 className="px-1">Enter the room name</h1>
//             <input onChange={(e) => { setRoom(e.target.value) }} className="w-full px-2 p-1 my-1 border-2 border-slate-300 rounded-md" placeholder="Roomname" />
//             <h1 className="my-2 px-1">Enter the username</h1>
//             <input onChange={(e) => { setName(e.target.value) }} className="w-full px-2 p-1 border-2 border-slate-300 rounded-md" placeholder="Username" />
//             <p className="text-sm text-gray-500 mt-1 px-1">
//               This username will be displayed in the real-time leaderboard.
//             </p>
//           </AlertDialogTitle>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={continueBtn} disabled={loading}>
//             {loading ? 'Creating...' : 'Continue'}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default AlertDialogDemo;

"use client";
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
import { useEffect, useState, useRef, MutableRefObject } from "react";
import { io, Socket } from "socket.io-client";

interface ButtonProps {
  text: String;
  isJoin: Boolean;
}

const AlertDialogDemo: React.FC<ButtonProps> = ({ text, isJoin }) => {
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const roomRef = useRef(room); // Create a ref for room
  let socketRef: MutableRefObject<Socket | null> = useRef(null);
  const router = useRouter();
                            
  // Update the ref value whenever room state changes
  useEffect(() => {
    roomRef.current = room;
    console.log("Hello "+roomRef.current);
  }, [room]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000';
    socketRef.current = io(url);

    socketRef.current.on("connect_error", (err) => {
      console.error(`Connection error: ${err.message}`);
    });

    socketRef.current.on("new_player", (event: any) => {
      console.log("New player event received", event);
      console.log(event.created.id);
      console.log(roomRef.current); // Use the ref value for room

      router.push(`/${roomRef.current}/${event.created.id}`);
      // router.push(`/room/${event.created.id}`);

      setLoading(false); // Stop loading once the event is received
    });
    
    return () => {
      socketRef.current?.off("new_player");
    };
  }, []); // Empty dependency array ensures this runs only once

  const continueBtn = async () => {
    setLoading(true); // Start loading when button is clicked
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
        // setNewUser(true);
        console.log('Room and player created:', result);
      } else {
        setLoading(false); // Stop loading if there's an error
        console.error("Failed to create room and player");
      }
    } catch (error) {
      setLoading(false); // Stop loading if there's an error
      console.log(error);
    }
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
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={continueBtn} disabled={loading}>
            {loading ? 'Creating...' : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogDemo;

