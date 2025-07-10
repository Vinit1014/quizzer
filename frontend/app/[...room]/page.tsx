
'use client'

import React, { useEffect, useState, useMemo } from 'react';
import LeaderBoard from "@/components/LeaderBoard";
import io, { Socket } from 'socket.io-client';
import QuestionManager from "@/components/Create/QuestionManager";
import QuizAnswer from "@/components/QuizAnswer";
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000';
const socket: Socket = io(SOCKET_URL);

export default function Page({ params }: { params: { room: string } }) {
    const router = useRouter();
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
  
    useEffect(() => {
      const fetchRoomAndPlayer = async () => {
        if (!user1) return; // Ensure `user1` is set before proceeding
  
        try {
          const roomResponse = await fetch("/api/getRoomAndPlayer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomName, userId: user1.id }), // Use memoized roomName
          });
  
          if (!roomResponse.ok) throw new Error("Failed to fetch room or player data");
          const { room, player } = await roomResponse.json();
  
          setRoom(room);
          if (player) {
            console.log("Got the player " + player + " " + player.id);
            setPlayerId(player.id); // Set the correct playerId here
          } else {
            console.error("Player not found in this room");
          }
  
          // Fetch the initial leaderboard
          fetchLeaderboard(room.id);
        } catch (error: any) {
          console.error("Error fetching room or player data:", error.message);
        }
      };
  
      const fetchLeaderboard = async (roomId: string) => {
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
  
      fetchRoomAndPlayer();
  
      // Set up real-time leaderboard updates
      socket.on("update-leaderboard", () => {
        if (room) {
          fetchLeaderboard(room.id); // Fetch leaderboard when update event is received
        }
      });
  
      // Clean up socket event listener on component unmount
      return () => {
        socket.off("update-leaderboard");
      };
    }, [roomName, user1, room]);
  
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
          <QuestionManager roomId={room.id} roomQuizDuration={room.quizDuration} />
        ) : (
          <QuizAnswer roomName={room.roomName} roomId={room.id} playerId={playerId} />
        )}
        {/* Render LeaderBoard component */}
        <LeaderBoard initialPlayers={memoizedPlayers} roomId={room.id} />
      </>
    );
}