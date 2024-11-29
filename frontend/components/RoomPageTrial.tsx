'use client'
import React, { useState } from 'react';
import SidebarTrial from './SidebarTrial';
import { SidebarProvider } from './ui/sidebar';
import { Plus, Bot } from 'lucide-react';
import QuizFormTrial from './QuizFormTrial';
import { useRouter } from 'next/navigation';

interface RoomPageTrialProps {
    user: any;
}

const RoomPageTrial: React.FC<RoomPageTrialProps> = ({ user }) => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [currentView, setCurrentView] = useState('details');
    const [roomName, setRoomName] = useState(''); // State for storing roomName input

    const router = useRouter();

    const handleQuizSelection = (quiz: any) => {
        setSelectedQuiz(quiz);
    };
    
    const handleJoinRoom = async() => {
        // Here I need to make some changes afterwards........

        try {
            console.log('Joining room:', roomName);
    
            // Make a POST request to the /api/join endpoint
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
            
            // Check if the request was successful
            if (!response.ok) {
                console.error('Error joining room:', data.error);
                alert(`Error: ${data.error}`);
                return;
            }
            
            // If successful, navigate to the room page
            router.push(`/${roomName}/${user.id}`);
        } catch (error) {
            console.error('Failed to join room:', error);
            alert('Failed to join room. Please try again.');
        }
    };

    return (
        user.role === 'TEACHER' ? (
            <SidebarProvider>
                <div className="flex h-screen">
                    <div className="w-64">
                        <SidebarTrial onQuizSelect={handleQuizSelection} user={user} />
                    </div>
                </div>
                <div className="flex-1 flex flex-col bg-gray-50">
                    <div className="p-2 flex justify-end">
                        <button
                            className="flex items-center mr-1 bg-green-600 text-sm text-white py-1 px-4 rounded-lg hover:bg-green-700"
                            onClick={() => {
                                setSelectedQuiz(null);
                                setCurrentView('details');
                            }}
                        >
                            <span className="mr-1"><Plus className="w-4" /></span>
                            <div>Create new quiz</div>
                        </button>
                        <button
                            className="flex items-center bg-green-600 text-sm text-white py-1 px-4 rounded-lg hover:bg-green-700"
                            onClick={() => {
                                setSelectedQuiz(null);
                                setCurrentView('AI');
                            }}
                        >
                            <span className="mr-1"><Bot className="w-4" /></span>
                            <div>Generate using AI</div>
                        </button>
                    </div>
                    {!selectedQuiz ? (
                        <QuizFormTrial currentVieww={currentView} user={user} />
                    ) : (
                        <div>
                            <h1>Hello</h1>
                        </div>
                    )}
                </div>
            </SidebarProvider>
        ) : (
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
                    <button
                        className="mx-2 mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                        onClick={handleJoinRoom}
                    >
                        Join Quiz
                    </button>
                </div>
            </div>
        )
    );
};

export default RoomPageTrial;
