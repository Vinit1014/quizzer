
"use client";

import { useState, useEffect, MutableRefObject, useRef } from "react";
import FlipMove from "react-flip-move";
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";

const LeaderBoard = ({ initialPlayers, roomId }: { initialPlayers: any, roomId: any }) => {
  const [players, setPlayers] = useState(initialPlayers || []);
  const [updatedPlayerId, setUpdatedPlayerId] = useState<number | null>(null);
  const socketRef: MutableRefObject<Socket | null> = useRef(null);

  useEffect(() => {
    setPlayers(initialPlayers);
  }, [initialPlayers]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/getleaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roommid: roomId }),
        });

        if (!response.ok) {
          throw new Error(`Error fetching players: ${response.statusText}`);
        }

        const data = await response.json();
        setPlayers(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const updatePoints = (updatedPlayer: any) => {
      setPlayers((prevPlayers: any) =>
        prevPlayers.map((player: any) =>
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

    socketRef.current.on("player_points", (event: any) => {
      console.log("received UPDATE event from server", event);
      updatePoints(event.after);
    });

    socketRef.current.on("update-leaderboard", () => {
      console.log("received UPDATE-LEADERBOARD event from server");
      fetchPlayers();
    });

    return () => {
      socketRef.current?.off("player_points");
      socketRef.current?.off("update-leaderboard");
    };
  }, [roomId]);
  
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  return (
    <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1 }}
              >

    <div className="border-gray-300 border-2 rounded-md mt-24 m-24 p-4">
      <p className="text-center text-gray text-xl font-semibold mb-4">
        🏆 Real-Time Leaderboard 🏆
      </p>
      <FlipMove>
        {sortedPlayers.map((player, i) => (
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
    </motion.div>
  );
};

export default LeaderBoard;
