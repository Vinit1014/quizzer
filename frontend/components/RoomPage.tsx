// components/RoomPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import QuizForm from '@/components/QuizForm';
import QuizAnswer from '@/components/QuizAnswer';
import Timer from '@/components/Timer';
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000'; // Replace with your server URL
const socket: Socket = io(SOCKET_URL);

interface RoomPageProps {
    playerRole: 'TEACHER' | 'STUDENT';
    roomName: string;
    roomId: any;
    playerId: any
}

const RoomPage: React.FC<RoomPageProps> = ({ playerRole, roomName, roomId, playerId}) => {
    const [timerStarted, setTimerStarted] = useState(false);
    // useEffect(()=>{

    // },[])

    const handleStartTimer = () => {
        setTimerStarted(true);
    };
    
    return (
        <div className="border-gray-300 border-2 rounded-md mt-40 m-24 flex flex-col items-center justify-center p-10 text-center">
            {playerRole === 'TEACHER' ? (
                <QuizForm roomName={roomName} onStartTimer={handleStartTimer} />
            ) : (
                <QuizAnswer roomName={roomName} roomId={roomId} playerId={playerId}/>
            )}
            <Timer/>
        </div>
    );
};

export default RoomPage;
