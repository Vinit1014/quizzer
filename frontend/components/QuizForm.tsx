
// // components/QuizForm.tsx
// import React, { useState, useEffect } from 'react';
// import QuizDetailsForm from './Create/QuizDetailsForm';
// import QuestionForm from './Create/QuestionForm';
// import QuestionsList from './Create/QuestionsList';
// import TimerButton from './Create/TimerButton';

// interface Answer {
//   answerText: string;
//   isCorrect: boolean;
// }

// interface Question {
//   questionText: string;
//   answers: Answer[];
// }

// const QuizForm: React.FC = () => {
//   const [quizTitle, setQuizTitle] = useState('');
//   const [quizDescription, setQuizDescription] = useState('');
//   const [quizDuration, setQuizDuration] = useState('');
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestion, setCurrentQuestion] = useState('');
//   const [answers, setAnswers] = useState<string[]>([]);
//   const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
//   const [timerStarted, setTimerStarted] = useState(false);
//   const [showQuestions, setShowQuestions] = useState(false);
//   const [remainingTime, setRemainingTime] = useState<number | null>(null);

//   useEffect(() => {
//     if (timerStarted && remainingTime !== null) {
//       const timer = setInterval(() => {
//         setRemainingTime((prevTime) => {
//           if (prevTime !== null) {
//             if (prevTime > 0) {
//               return prevTime - 1;
//             } else {
//               clearInterval(timer);
//               return 0;
//             }
//           }
//           return null;
//         });
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [timerStarted, remainingTime]);

//   const handleAddQuestion = () => {
//     if (currentQuestion && answers.length && correctAnswer !== null) {
//       const newQuestion: Question = {
//         questionText: currentQuestion,
//         answers: answers.map((answer, index) => ({
//           answerText: answer,
//           isCorrect: index === correctAnswer,
//         })),
//       };
//       setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
//       setCurrentQuestion('');
//       setAnswers([]);
//       setCorrectAnswer(null);
//     }
//   };

//   const startTimer = () => {
//     const durationInSeconds = Number(quizDuration) * 60;
//     setRemainingTime(durationInSeconds);
//     setTimerStarted(true);
//   };

//   const handleSubmitQuizDetails = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Implement quiz details submission logic here
//   };
  
//   const toggleShowQuestions = () => setShowQuestions((prevShow) => !prevShow);

//   return (
//     <div className='m-2'>
//       <QuizDetailsForm
//         quizTitle={quizTitle}
//         quizDescription={quizDescription}
//         quizDuration={quizDuration}
//         setQuizTitle={setQuizTitle}
//         setQuizDescription={setQuizDescription}
//         setQuizDurationLocal={setQuizDuration}
//         handleSubmitQuizDetails={handleSubmitQuizDetails}
//       />
//       <QuestionForm
//         currentQuestion={currentQuestion}
//         answers={answers}
//         correctAnswer={correctAnswer}
//         setCurrentQuestion={setCurrentQuestion}
//         setAnswers={setAnswers}
//         setCorrectAnswer={setCorrectAnswer}
//         handleAddQuestion={handleAddQuestion}
//       />
//       <QuestionsList
//         questions={questions}
//         showQuestions={showQuestions}
//         toggleShowQuestions={toggleShowQuestions}
//       />
//       <TimerButton startTimer={startTimer} />
//     </div>
//   );
// };

// export default QuizForm;

//Not needed