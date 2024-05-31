"use client"

import React from 'react'
import FlipMove from "react-flip-move";

const LeaderBoard = () => {
  return (
    <div className="w-full p-4">
      <p className="text-center text-gray text-xl font-semibold mb-4">
        🏆 Welcome to the Real-Time Leaderboard 🏆
      </p>
      <FlipMove>
        <div className='flex items-center justify-between p-2 mb-2 rounded-md shadow-md relative'>
            <div className="text-lg font-semibold text-gray-800">Username 1</div>
            <div className="text-lg font-semibold text-gray-600">289</div>
        </div>
        <div className='flex items-center justify-between p-2 mb-2 rounded-md shadow-md relative'>
            <div className="text-lg font-semibold text-gray-800">Username 2</div>
            <div className="text-lg font-semibold text-gray-600">250</div>
        </div>
        <div className='flex items-center justify-between p-2 mb-2 rounded-md shadow-md relative'>
            <div className="text-lg font-semibold text-gray-800">Username 3</div>
            <div className="text-lg font-semibold text-gray-600">300</div>
        </div>
        </FlipMove>
        </div>
    )
}

export default LeaderBoard

{/* {sortedPlayers.map((player, i) => (
  <div
    key={player.id}
    className={`flex items-center justify-between p-2 mb-2 rounded-md shadow-md relative ${
      updatedPlayerId === player.id ? 'blink' : 'bg-white'
    }`}
  >
    <div className="text-lg font-semibold text-gray-800">
      {i === 0 ? `${player.username} 🥇` : player.username}
    </div>
    <div className="text-lg font-semibold text-gray-600">
      {player.points}
    </div>
  </div>
))} */}