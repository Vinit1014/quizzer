'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const StudentView = ({ user }: { user: any }) => {
    const [roomName, setRoomName] = useState('');
    const router = useRouter();

    const handleJoinRoom = async() => {
        try {
            console.log('Joining room:', roomName);
    
            const response = await fetch('/api/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomName: roomName,
                    userId: user.id
                }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                console.error('Error joining room:', data.error);
                alert(`Error: ${data.error}`);
                return;
            }
            
            router.push(`/${roomName}/${user.id}`);
        } catch (error) {
            console.error('Failed to join room:', error);
            alert('Failed to join room. Please try again.');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Enter Room Name to Join Quiz</h2>
                <input
                    type="text"
                    placeholder="Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Button
                    className="mx-2 mt-4 bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleJoinRoom}
                >
                    Join Quiz
                </Button>
            </div>
        </div>
    );
};

export default StudentView;