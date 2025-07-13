
'use client'

import React, { useEffect, useState, useMemo } from 'react';
import LeaderBoard from "@/components/LeaderBoard";
import io, { Socket } from 'socket.io-client';
import QuestionManager from "@/components/Create/QuestionManager";
import QuizAnswer from "@/components/QuizAnswer";
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useQuiz } from '@/context/QuizContext';

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000';
const socket: Socket = io(SOCKET_URL);

export default function Page({ params }: { params: { room: string } }) {
    const router = useRouter();
    const { setQuizCompleted } = useQuiz();
    const [user1, setUser] = useState<any>(null);
    const [role, setRole] = useState<string | null>(null);
    const [room, setRoom] = useState<any>(null);
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [players, setPlayers] = useState<any[]>([]); // Store players for the leaderboard
  
    const roomName = useMemo(() => params.room[0], [params.room]);
  
    useEffect(() => {
      const checkAuthAndFetchData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
  
        if (!user) {
          router.push("/login");
          return;
        }
  
        try {
          // Fetch user role and set user
          const roleResponse = await fetch("/api/getUserRole", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userMail: user.email }),
          });
  
          if (!roleResponse.ok) {
            throw new Error("Failed to fetch user role");
          }
  
          const roleData = await roleResponse.json();
          setRole(roleData.user.role || null);
          setUser(roleData.user); // Set user here
        } catch (error: any) {
          console.error("Error fetching user role:", error.message);
        }
      };
  
      checkAuthAndFetchData();
    }, [router]);
  
    // Effect 1: Initial room and player data fetching
useEffect(() => {
  const fetchRoomAndPlayer = async () => {
    if (!user1) return;

    try {
      const roomResponse = await fetch("/api/getRoomAndPlayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName, userId: user1.id }),
      });

      if (!roomResponse.ok) throw new Error("Failed to fetch room or player data");
      const { room, player } = await roomResponse.json();

      setRoom(room);
      setQuizCompleted(room.isQuizCompleted);
      if (player) {
        console.log("Got the player " + player + " " + player.id);
        setPlayerId(player.id);
      } else {
        console.error("Player not found in this room");
      }
    } catch (error) {
      console.error("Error fetching room or player data:", error.message);
    }
  };

  fetchRoomAndPlayer();
}, [roomName, user1]); // Only depends on roomName and user1

    // Effect 2: Initial leaderboard fetch when room is available
    useEffect(() => {
      if (!room?.id) return;

      const fetchLeaderboard = async (roomId) => {
        try {
          const leaderboardResponse = await fetch("/api/getleaderboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roommid: roomId }),
          });

          if (!leaderboardResponse.ok) throw new Error("Failed to fetch leaderboard");
          const { data: playersData } = await leaderboardResponse.json();
          setPlayers(playersData);
        } catch (error) {
          console.error("Error fetching leaderboard:", error);
        }
      };

      fetchLeaderboard(room.id);
    }, [room?.id]); // Only runs when room.id changes

    // Effect 3: Socket listener setup
    useEffect(() => {
      if (!room?.id) return;

      const handleLeaderboardUpdate = () => {
        // Fetch updated leaderboard
        fetch("/api/getleaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roommid: room.id }),
        })
          .then(res => res.json())
          .then(({ data: playersData }) => setPlayers(playersData))
          .catch(error => console.error("Error fetching leaderboard:", error));
      };

      socket.on("update-leaderboard", handleLeaderboardUpdate);

      return () => {
        socket.off("update-leaderboard", handleLeaderboardUpdate);
      };
    }, [room?.id]); // Only re-run when room.id changes
  
    // Memoize players to avoid unnecessary re-renders of LeaderBoard
    const memoizedPlayers = useMemo(() => players, [players]);
  
    if (!user1 || !room)
      return (
        <div className="flex items-center justify-center mt-4">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <p className="text-lg">Loading...</p>
        </div>
      );
  
    return (
      <>
        {role === "TEACHER" ? (
          <QuestionManager roomId={room.id} roomQuizDuration={room.quizDuration} quizTitle={room.quizTitle} quizDescription={room.quizDescription}/>
        ) : (
          <QuizAnswer roomName={room.roomName} roomId={room.id} playerId={playerId} />
        )}
        {/* Render LeaderBoard component */}
        <LeaderBoard initialPlayers={memoizedPlayers} roomId={room.id} />
      </>
    );
}