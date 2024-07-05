'use client'
import React, { useEffect, useState } from 'react';
import { addPoints } from '@/app/actions';
import { decPoints } from '@/app/actions';
import io, { Socket } from 'socket.io-client';

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

  useEffect(() => {
    if (timeLeft === 0 && quizStarted && !quizCompleted) {
      setQuizCompleted(true);
      getPlayerPoints();
    }
  }, [timeLeft, quizStarted, quizCompleted]);
  
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
      const response = await fetch("/api/quizdetails", {
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

  useEffect(() => {
    getQuestions();
    getQuizDetails();
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
        getPlayerPoints();
        console.log('Quiz completed');
      }
    }, 2000);
  };

  if (quizCompleted) {
    return (
      <div className="quiz-completed w-full max-w-2xl mx-auto p-4">
        <h2 className="text-2xl mb-4">Quiz Completed</h2>
        <p className="text-xl">Your Points: {playerPoints}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const optionLabels = ['a', 'b', 'c', 'd'];

  // return(
  //   <div>
  //     <h1>{quizDetails.quizTitle}</h1>
  //   </div>
  // )

  return (
    <div className="quiz-answer w-full max-w-2xl mx-auto p-4">
      {!quizStarted ? (
        <>
          <h1 className="text-3xl mb-4">{quizDetails?.quizTitle}</h1>
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
          <h2 className="question-text text-2xl mb-4">{`${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].questionText}`}</h2>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

// 'use client'
// import React, { useEffect, useState } from 'react';
// import { addPoints, decPoints } from '@/app/actions';

// const QuizAnswer = ({ roomName, roomId, playerId }: { roomName: string, roomId: any, playerId: any }) => {
//   const [questions, setQuestions] = useState<any[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [answerFeedback, setAnswerFeedback] = useState<string | null>(null);
//   const [quizDetails, setQuizDetails] = useState<any>();
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [playerPoints, setPlayerPoints] = useState<number | null>(null);

//   const getQuestions = async () => {
//     try {
//       const response = await fetch("/api/getquestion", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: roomId })
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setQuestions(result.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getQuizDetails = async () => {
//     try {
//       const response = await fetch("/api/quizDetails", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: roomId })
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setQuizDetails(result.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getPlayerPoints = async () => {
//     try {
//       const response = await fetch("/api/playerPoints", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: playerId })
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setPlayerPoints(result.data.points);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getQuestions();
//     getQuizDetails();
//   }, []);

//   const handleConfirmAnswer = () => {
//     if (selectedAnswer === null) return;

//     if (questions[currentQuestionIndex].answers[selectedAnswer].isCorrect) {
//       setAnswerFeedback('correct');
//       addPoints({ points: 5, playerId });
//     } else {
//       setAnswerFeedback('incorrect');
//       decPoints({ points: 1, playerId });
//     }

//     // Proceed to the next question after a delay
//     setTimeout(() => {
//       setAnswerFeedback(null);
//       setSelectedAnswer(null);
//       if (currentQuestionIndex < questions.length - 1) {
//         setCurrentQuestionIndex(currentQuestionIndex + 1);
//       } else {
//         setQuizCompleted(true);
//         getPlayerPoints();  // Fetch player's points after completing the quiz
//       }
//     }, 2000);
//   };

//   if (quizCompleted) {
//     return (
//       <div className="quiz-completed w-full max-w-2xl mx-auto p-4">
//         <h2 className="text-2xl mb-4">Quiz Completed</h2>
//         <p className="text-xl">Your Points: {playerPoints}</p>
//       </div>
//     );
//   }

//   if (questions.length === 0) {
//     return <div>Loading questions...</div>;
//   }

//   const optionLabels = ['a', 'b', 'c', 'd'];

//   return (
//     <div className="quiz-answer w-full max-w-2xl mx-auto p-4">
//       <h2 className="question-text text-2xl mb-4">{`${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].questionText}`}</h2>
//       <div className="answers w-full flex flex-col mb-4">
//         {questions[currentQuestionIndex].answers.map((answer: any, index: number) => (
//           <div
//             key={index}
//             onClick={() => setSelectedAnswer(index)}
//             className={`answer-option p-4 mb-2 border rounded cursor-pointer text-left ${
//               selectedAnswer === index ? 'bg-blue-300' : 'bg-gray-200'
//             } ${answerFeedback && selectedAnswer === index ? (answerFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500') : ''}`}
//           >
//             <span className="font-bold">{`${optionLabels[index]}. `}</span>
//             {answer.answerText}
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={handleConfirmAnswer}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         disabled={selectedAnswer === null}
//       >
//         Confirm
//       </button>
//     </div>
//   );
// };

// export default QuizAnswer;
