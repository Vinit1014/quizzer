// // QuizForm.tsx
// 'use client';

// import React, { useState } from 'react';
// import { toast, Toaster } from 'sonner';
// import io, { Socket } from 'socket.io-client';
// import { motion } from 'framer-motion';

// const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'; // Replace with your server URL
// const socket: Socket = io(SOCKET_URL);

// interface Answer {
//   answerText: string;
//   isCorrect: boolean;
// }

// interface Question {
//   questionText: string;
//   answers: Answer[];
// }

// const QuizForm = ({ roomName, onStartTimer }: { roomName: string, onStartTimer: () => void }) => {
  
//   const [quizTitle, setQuizTitle] = useState('');
//   const [quizDescription, setQuizDescription] = useState('');
//   const [quizDuration, setQuizDurationLocal] = useState('');
//   const [mainDuration, setMainDuration] = useState();

//   const [currentQuestion, setCurrentQuestion] = useState('');
//   const [answers, setAnswers] = useState(['', '', '', '']);
//   const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [roomId, setRoomId] = useState('');
//   const [showQuizForm, setShowQuizForm] = useState(true); 
//   const [showQuestions, setShowQuestions] = useState(false);

//   const startTimer = () => {
//     onStartTimer();
//     socket.emit('start-timer', mainDuration);
//   };

//   const handleAddQuestion = async () => {
//     const toastId = toast.loading('Adding question...');
//     const newQuestion: Question = {
//       questionText: currentQuestion,
//       answers: answers.map((answer, index) => ({
//         answerText: answer,
//         isCorrect: index === correctAnswer,
//       })),
//     };

//     try {
//       const response = await fetch('/api/question', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           roomId,
//           questionText: currentQuestion,
//           answers: newQuestion.answers,
//         }),
//       });
      
//       if (response.ok) {
//         setQuestions([...questions, newQuestion]);
//         setCurrentQuestion('');
//         setAnswers(['', '', '', '']);
//         toast.success('Question added successfully', { id: toastId });
//         setCorrectAnswer(null);
//       } else {
//         toast.error('Failed to add question');
//       }
//     } catch (error) {
//       console.error('Error adding question:', error);
//       toast.error('Failed to add question');
//     }
//   };

//   const handleSubmitQuizDetails = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const toastId = toast.loading('Saving quiz details...');
//     try {
//       const response = await fetch('/api/quiz', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           roomName,
//           quizTitle,
//           quizDescription,
//           quizDuration: parseInt(quizDuration, 10),
//         }),
//       });
      
//       if (response.ok) {
//         const result = await response.json();
//         setRoomId(result.data.id);
//         setMainDuration(result.data.quizDuration);
//         // setQuizDuration(parseInt(quizDuration, 10));
//         toast.success('Quiz details saved successfully', { id: toastId });
//         setShowQuizForm(false);

//         setQuizTitle('');
//         setQuizDescription('');
//         // setQuizDurationLocal('');
//       } else {
//         toast.error('Failed to save quiz details', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Error saving quiz details:', error);
//       toast.error('Failed to save quiz details', { id: toastId });
//     }
//   };

//   return (
//     <motion.div className="container p-4" initial={{ opacity: 0 }}
//     transition={{ duration: 0.6 }}
//     whileInView={{ opacity: 1 }}>
//       <Toaster richColors />
//       {showQuizForm ? (
//         <div>
//         <h1 className="text-2xl mb-4">Create Quiz</h1>
//         <form onSubmit={handleSubmitQuizDetails}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Title</label>
//             <input
//               type="text"
//               value={quizTitle}
//               onChange={(e) => setQuizTitle(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               style={{ height: '3rem' }} // Adjust height as needed
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Description</label>
//             <textarea
//               value={quizDescription}
//               onChange={(e) => setQuizDescription(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               style={{ minHeight: '8rem' }} // Adjust height as needed
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Duration (minutes)</label>
//             <input
//               type="number"
//               value={quizDuration}
//               onChange={(e) => setQuizDurationLocal(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <button
//               type="submit"
//               className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Save Quiz Details
//             </button>
//           </div>
//         </form>
//       </div>      
//       ) : (
//         <div>
//           <div className="mb-4">
//             <button
//               type="button"
//               onClick={startTimer}
//               className="bg-gray-800 hover:bg-gray-950 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Start Timer
//             </button>
//           </div>
//           <button
//             className="mb-4 bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             onClick={() => setShowQuizForm(true)}
//           >
//             Back to Quiz Form
//           </button>
//           <h2 className="text-xl mb-2">Add Questions</h2>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Question</label>
//             <input
//               type="text"
//               value={currentQuestion}
//               onChange={(e) => setCurrentQuestion(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mb-4">
//             {answers.map((answer, index) => (
//               <div key={index} className="mb-2">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Answer {index + 1}</label>
//                 <input
//                   type="text"
//                   value={answer}
//                   onChange={(e) => {
//                     const newAnswers = [...answers];
//                     newAnswers[index] = e.target.value;
//                     setAnswers(newAnswers);
//                   }}
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Correct Answer</label>
//             <select
//               value={correctAnswer ?? ''}
//               onChange={(e) => setCorrectAnswer(Number(e.target.value))}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="" disabled>Select correct answer</option>
//               {answers.map((_, index) => (
//                 <option key={index} value={index}>
//                   Answer {index + 1}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-4">
//             <button
//               type="button"
//               onClick={handleAddQuestion}
//               className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Add Question
//             </button>
//           </div>
//           <div>
//             <button
//               type="button"
//               onClick={() => setShowQuestions(!showQuestions)}
//               className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               {showQuestions ? 'Hide' : 'Show'} Current Questions
//             </button>
//             {showQuestions && (
//               <div>
//                 <h2 className="text-xl mb-2">Current Questions Added</h2>
//                 <ul className="space-y-4">
//                   {questions.map((question, index) => (
//                     <li key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm">
//                       <h3 className="font-bold text-lg mb-2">{(index + 1) + ". " + question.questionText}</h3>
//                       <ul className="space-y-1">
//                         {question.answers.map((answer, idx) => (
//                           <li
//                             key={idx}
//                             className={`p-2 rounded ${answer.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
//                           >
//                             {answer.answerText} {answer.isCorrect && <span className="font-bold">(Correct)</span>}
//                           </li>
//                         ))}
//                       </ul>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default QuizForm;
             

// components/QuizForm.tsx
import React, { useState, useEffect } from 'react';
import QuizDetailsForm from './Create/QuizDetailsForm';
import QuestionForm from './Create/QuestionForm';
import QuestionsList from './Create/QuestionsList';
import TimerButton from './Create/TimerButton';

interface Answer {
  answerText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  answers: Answer[];
}

const QuizForm: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizDuration, setQuizDuration] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    if (timerStarted && remainingTime !== null) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime !== null) {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(timer);
              return 0;
            }
          }
          return null;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timerStarted, remainingTime]);

  const handleAddQuestion = () => {
    if (currentQuestion && answers.length && correctAnswer !== null) {
      const newQuestion: Question = {
        questionText: currentQuestion,
        answers: answers.map((answer, index) => ({
          answerText: answer,
          isCorrect: index === correctAnswer,
        })),
      };
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
      setCurrentQuestion('');
      setAnswers([]);
      setCorrectAnswer(null);
    }
  };

  const startTimer = () => {
    const durationInSeconds = Number(quizDuration) * 60;
    setRemainingTime(durationInSeconds);
    setTimerStarted(true);
  };

  const handleSubmitQuizDetails = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement quiz details submission logic here
  };
  
  const toggleShowQuestions = () => setShowQuestions((prevShow) => !prevShow);

  return (
    <div className='m-2'>
      <QuizDetailsForm
        quizTitle={quizTitle}
        quizDescription={quizDescription}
        quizDuration={quizDuration}
        setQuizTitle={setQuizTitle}
        setQuizDescription={setQuizDescription}
        setQuizDurationLocal={setQuizDuration}
        handleSubmitQuizDetails={handleSubmitQuizDetails}
      />
      <QuestionForm
        currentQuestion={currentQuestion}
        answers={answers}
        correctAnswer={correctAnswer}
        setCurrentQuestion={setCurrentQuestion}
        setAnswers={setAnswers}
        setCorrectAnswer={setCorrectAnswer}
        handleAddQuestion={handleAddQuestion}
      />
      <QuestionsList
        questions={questions}
        showQuestions={showQuestions}
        toggleShowQuestions={toggleShowQuestions}
      />
      <TimerButton startTimer={startTimer} />
    </div>
  );
};

export default QuizForm;

