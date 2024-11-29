
'use client'

import React, { useEffect, useState } from 'react';
import RoomPage from "@/components/RoomPage";
import LeaderBoard from "@/components/LeaderBoard";
import io, { Socket } from 'socket.io-client';
import Navbar from "@/components/Navbar";
import QuestionManager from "@/components/Create/QuestionManager";
import QuizAnswer from "@/components/QuizAnswer";
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

const SOCKET_URL = 'http://localhost:8000'; // Replace with your server URL
const socket: Socket = io(SOCKET_URL);

export default function Page({ params }: { params: { room: string } }) {

    console.log("I am from URL "+params.room[0]);
    
    const router = useRouter();
    const [user1, setUser] = useState<any>(null);
    const [role, setRole] = useState<string | null>(null);
    const [room, setRoom] = useState<any>(null);
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [players, setPlayers] = useState<any[]>([]); // Store players for the leaderboard

    useEffect(()=>{
        console.log("I am user "+user1?.id);
    },[user1])


    useEffect(() => {
        const checkAuthAndFetchRole = async () => {
            const { data: { user } } = await supabase.auth.getUser();
              
            if (!user) {
                router.push('/login');
                return;
            }

            try {
                const response = await fetch('/api/getUserRole', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userMail: user.email }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user role');
                }

                const data = await response.json();
                setRole(data.user.role || null);
                setUser(data.user);

                // Fetch room and player information
                const roomResponse = await fetch('/api/getRoomAndPlayer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ roomName: params.room[0], userId: user1?.id }),
                });
        
                if (!roomResponse.ok) throw new Error('Failed to fetch room or player data');
                const { room, player } = await roomResponse.json();
        
                setRoom(room);
        
                if (player) {
                    console.log("Got the player "+player);
                    
                    setPlayerId(player.id);
                } else {
                    console.error('Player not found in this room');
                }

                // Fetch the initial leaderboard
                await fetchLeaderboard(room.id);

            } catch (error: any) {
                console.error('Error fetching role or room data:', error.message);
            }
        };

        const fetchLeaderboard = async (roomId: string) => {
            try {
                const leaderboardResponse = await fetch('/api/getleaderboard', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ roommid: roomId }),
                });
                
                if (!leaderboardResponse.ok) throw new Error('Failed to fetch leaderboard');
                
                const { data: playersData } = await leaderboardResponse.json();
                setPlayers(playersData);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };

        checkAuthAndFetchRole();

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
    }, [params.room[0], router, room]);

    if (!user1 || !room) return <div>Loading...</div>;

    return (
        <>
            {role === "TEACHER" ? (
                <QuestionManager roomId={room.id} roomQuizDuration={room.quizDuration}/>
            ) : (
                <QuizAnswer roomName={room.roomName} roomId={room.id} playerId={playerId} />
            )}
            {/* Render LeaderBoard component */}
            <LeaderBoard initialPlayers={players} roomId={room.id} />
        </>
    );
}
