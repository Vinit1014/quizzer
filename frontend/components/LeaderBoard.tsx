"use client"

import { useState, useEffect, MutableRefObject, useRef } from "react";
import FlipMove from "react-flip-move";
import { io, Socket } from "socket.io-client";

const LeaderBoard = ({ initialPlayers }: { initialPlayers: any }) => {
  const [players, setPlayers] = useState(initialPlayers || []);
  const [updatedPlayerId, setUpdatedPlayerId] = useState<number | null>(null);

  let socketRef: MutableRefObject<Socket | null> = useRef(null);

  useEffect(() => {
    const updatePoints = (updatedPlayer:any) => {
      setPlayers((prevPlayers:any) =>
        prevPlayers.map((player:any) =>
          player.id === updatedPlayer.id ? updatedPlayer : player
        )
      );
      setUpdatedPlayerId(updatedPlayer.id);
      setTimeout(() => setUpdatedPlayerId(null), 1000);
    };

    const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000';
    socketRef.current = io(url);

    socketRef.current.on("connect_error", (err) => {
      console.error(`Connection error: ${err.message}`);
    });
    
    socketRef.current.on("player_points", (event:any) => {
      console.log("received UPDATE event from server", event);
      updatePoints(event.after);
    });

    return () => {
      socketRef.current?.off("player_points");
    };
  }, [players]); // Empty dependency array ensures this runs only once
  
  const sortedPlayers = [...players].sort((a,b) => b.points - a.points);
  
  return (
    <div className="w-full p-4">
      <p className="text-center text-gray text-xl font-semibold mb-4">
        🏆 Welcome to the Real-Time Leaderboard 🏆
      </p>
      <FlipMove>
        {sortedPlayers.map((player,i) => (
          <div
            key={player.id}
            className={`flex items-center justify-between p-2 mb-2 rounded-md shadow-md relative ${
              updatedPlayerId === player.id ? 'blink' : 'bg-white'
            }`}
          >
            <div className="text-lg font-semibold text-gray-800">
              {i === 0 ? `${player.name} 🥇` : player.name}
            </div>
            <div className="text-lg font-semibold text-gray-600">
              {player.points}
            </div>
          </div>
        ))}
      </FlipMove>
    </div>
  );
};

export default LeaderBoard;
