'use client'
import React, { useEffect, useState } from 'react';
import { addPoints } from '@/app/actions';
import { decPoints } from '@/app/actions';
import io, { Socket } from 'socket.io-client';
import Timer from './Timer';
import { ArrowLeft, Loader2, Trophy, CheckCircle, Star } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'; // Replace with your server URL
const socket: Socket = io(SOCKET_URL);

const QuizAnswer = ({ roomName, roomId, playerId }: { roomName: string, roomId: any, playerId: any }) => {
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);
  const [quizDetails, setQuizDetails] = useState<any>();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [playerPoints, setPlayerPoints] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const router = useRouter();
//______________________________________________________________________________
  const [hasCompleted, setHasCompleted] = useState(false);

  const checkHasCompleted = async () => {
    try {
      const response = await fetch('/api/getHasCompleted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId, playerId }), // Assuming `playerId` is userId
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Result I got "+result);
        
        setHasCompleted(result.data?.hasCompleted || false);
      }
    } catch (error) {
      console.error('Error fetching hasCompleted status:', error);
    }
  };
// ______________________________________________________________________

  useEffect(()=>{
    console.log("PlayerId inside QuizAnswer is "+playerId);
    
  },[playerId])

  useEffect(() => {
    if (timeLeft === 0 && quizStarted && !quizCompleted) {
      setQuizCompleted(true); 
      markAsCompleted();
      getPlayerPoints();
    }
  }, [timeLeft, quizStarted, quizCompleted]);

  //Added some changes over here
  useEffect(()=>{
    getPlayerPoints();
  },[quizCompleted])
  
  useEffect(() => {
    socket.on('updateTimer', (newTime: number) => {
      setTimeLeft(newTime);
    });

    socket.on('quiz-ended', () => {
      setQuizCompleted(true);
      getPlayerPoints();
    });

    return () => {
      socket.off('updateTimer');
      socket.off('quiz-ended');
    };
  }, []);

  useEffect(()=>{
    console.log(quizDetails);
  },[quizDetails])

  const getQuestions = async () => {
    try {
      const response = await fetch("/api/getquestion", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: roomId,
        })
      });
      if (response.ok) {
        const result = await response.json();
        setQuestions(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuizDetails = async () => {
    try {
      const response = await fetch("/api/getStudentQuiz", {

        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: roomId,
        })
      });
      if (response.ok) {
        const result = await response.json();
        setQuizDetails(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getPlayerPoints = async () => {
    try {
      const response = await fetch("/api/playerPoints", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: playerId,
          roomId: roomId
        })
      });
      if (response.ok) {
        const result = await response.json();
        setPlayerPoints(result.data.points);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const markAsCompleted = async () => {
    try {
      const response = await fetch('/api/updateHasCompleted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerId, roomId }),
      });

      console.log("Response I got "+response);
      
    } catch (error) {
      console.error('Error marking as completed:', error);
    }
  };
  
  const markQuizAsCompleted = async () => {
    try {
      const response = await fetch('/api/markQuizComplete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          roomId: roomId
        })
      })

      const data = await response.json();
      if (response.ok) {
        console.log('Quiz marked as completed:', data);
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error marking quiz as complete', error);
    }
  }

  useEffect(() => {
    checkHasCompleted();
    getQuestions();
    getQuizDetails();
    markQuizAsCompleted();
  }, []);

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;

    if (questions[currentQuestionIndex].answers[selectedAnswer].isCorrect) {
      setAnswerFeedback('correct');
      addPoints({ points: 4, playerId: playerId });
    } else {
      setAnswerFeedback('incorrect');
      decPoints({ points: 1, playerId: playerId });
    }
    
    // Proceed to the next question after a delay
    setTimeout(() => {
      setAnswerFeedback(null);
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Handle quiz completion
        setQuizCompleted(true);
        markAsCompleted();
        getPlayerPoints();
        console.log('Quiz completed');
      }
    }, 2000);
  };

  const routeDashboard = ()=>{
    router.push('/dashboard');
  }

  if (quizCompleted) {
    return (
      <div className="quiz-completed w-full max-w-2xl mx-auto p-4 text-center">
        <Button className='absolute top-16 left-4' variant="outline" onClick={routeDashboard}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Quiz Completed!
            </h2>
            <p className="text-green-100 text-lg">
              Congratulations on finishing the quiz
            </p>
          </div>

          {/* Points Display */}
          <div className="px-8 py-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-lg mb-6">
                <Trophy className="w-8 h-8" />
                <div>
                  <p className="text-sm font-medium opacity-90">Your Points</p>
                  <p className="text-3xl font-bold">{playerPoints}</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-600 mt-4 text-lg">
                Great job! Your score has been recorded.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hasCompleted) {
    return (
      <div className="quiz-completed w-full max-w-2xl mx-auto p-4">
        <Button className='absolute top-16 left-4' variant="outline" onClick={routeDashboard}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <h2 className="md:text-2xl mt-12 md:mt-2 mb-2">Quiz Already Completed</h2>
        <p className="md:text-2xl">Your Points: {playerPoints}</p>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center mt-4">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const optionLabels = ['a', 'b', 'c', 'd'];


  return (
    <div className="quiz-answer w-full max-w-2xl mx-auto p-4">
      <Timer/>
      <Button className='absolute top-16 left-4' variant="outline" onClick={routeDashboard}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      {!quizStarted ? (
        <>
          <h1 className="md:text-2xl mt-12 md:mt-2 mb-2">{quizDetails?.quizTitle}</h1>
          <p className="text-lg mb-4">{quizDetails?.quizDescription}</p>
          <p className="text-lg mb-4">Duration: {quizDetails?.quizDuration} minutes</p>
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Start Quiz
          </button>
        </>
      ) : (
        <>
          <h2 className="question-text md:text-2xl mt-12 md:mt-2 mb-2">{`${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].questionText}`}</h2>
          <div className="answers w-full flex flex-col mb-4">
            {questions[currentQuestionIndex].answers.map((answer: any, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`answer-option p-4 mb-2 border rounded cursor-pointer text-left ${
                  selectedAnswer === index ? 'bg-blue-300' : 'bg-gray-200'
                } ${answerFeedback && selectedAnswer === index ? (answerFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500') : ''}`}
              >
                <span className="font-bold">{`${optionLabels[index]}. `}</span>
                {answer.answerText}
              </div>
            ))}
          </div>
          <button
            onClick={handleConfirmAnswer}
            className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={selectedAnswer === null}
          >
            Confirm
          </button>
        </>
      )}
    </div>
  );
};

export default QuizAnswer;
