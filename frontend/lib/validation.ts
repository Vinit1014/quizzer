import {z} from 'zod';

export const roomSchema = z.object({
    roomName: z.string().min(1, { message: 'Room name cannot be empty' }),
    playerName: z.string().min(1, { message: 'Player name cannot be empty' }),
})