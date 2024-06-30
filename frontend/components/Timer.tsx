// Timer.tsx
'use client';

import React, { useEffect, useState } from 'react';
import io, {Socket} from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000'; // Replace with your server URL
const socket: Socket = io(SOCKET_URL);

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  
  useEffect(()=>{
    socket.on('updateTimer',(newTime: number)=>{
      setTimeLeft(newTime);
    });

    return ()=>{
      socket.off('updateTimer');
    }

  },[]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      <h1>
        Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </div>
  );
};

export default Timer;
