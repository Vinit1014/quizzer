import { Server, Socket } from "socket.io";

let timerInterval: NodeJS.Timeout | null = null;
let timeLeft = 0;

export function setupTimerEvents(socket: Socket, io: Server){
    socket.emit('updateTimer', timeLeft);

    socket.on("initializeTimer", (duration: number) => {
        timeLeft = duration;
    });
    
    socket.on('start-timer', (duration: number)=>{
        if (timerInterval) clearInterval(timerInterval);
        timeLeft = duration * 60;
        timerInterval = setInterval(()=>{
            if (timeLeft > 0) {
                timeLeft--;
                io.emit('updateTimer', timeLeft);
            } else{
                clearInterval(timerInterval!);
                timerInterval = null;
                io.emit('quiz-ended');
            }
        },1000)
    })
}