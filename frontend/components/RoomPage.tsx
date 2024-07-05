// components/RoomPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import QuizForm from '@/components/QuizForm';
import QuizAnswer from '@/components/QuizAnswer';
import Timer from '@/components/Timer';
import io, { Socket } from 'socket.io-client';
import { motion } from 'framer-motion';

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'; // Replace with your server URL
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
        <motion.div
              initial={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1, y: 0 }}
              >
        <div className="relative border-gray-200 shadow-lg border-2 rounded-md mt-24 m-14 flex flex-col items-center justify-center p-10 text-center">
        <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1 }}
              >
            <Timer/>
              </motion.div>
            {/* <div className='mt-16'> */}
            {playerRole === 'TEACHER' ? (
                <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                whileInView={{ opacity: 1 }}
                >
  
                <QuizForm roomName={roomName} onStartTimer={handleStartTimer} />
                </motion.div>
            ) : (
                <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              whileInView={{ opacity: 1 }}
              >
                <QuizAnswer roomName={roomName} roomId={roomId} playerId={playerId}/>
              </motion.div>
            )}
            {/* </div> */}
        </div>
        </motion.div>
    );
};

export default RoomPage;
