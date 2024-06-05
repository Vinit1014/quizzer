"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
const RoomBtn = () => {
    const router = useRouter();
    return (
        <div>
            <button type="button" onClick={() => router.push('/room/qwert')}>
        Dashboard
            </button>
        </div>
    )
}

export default RoomBtn