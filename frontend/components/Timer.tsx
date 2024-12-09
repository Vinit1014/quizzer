// Timer.tsx
'use client';

import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'; // Replace with your server URL
const socket: Socket = io(SOCKET_URL);

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(()=>{
    console.log(timeLeft);    
  },[timeLeft])

  useEffect(() => {
    socket.on('updateTimer', (newTime: number) => {
      setTimeLeft(newTime);
    });
    
    return () => {
      socket.off('updateTimer');
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="absolute top-16 right-4 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md">
      <h1 className="text-md font-normal">
        Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </div>
  );
};

export default Timer;
