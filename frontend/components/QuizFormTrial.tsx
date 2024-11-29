'use client'

import React, { useState, useEffect } from 'react';
import QuizDetailsForm from './Create/QuizDetailsForm';
import QuestionForm from './Create/QuestionForm';
import QuestionsList from './Create/QuestionsList';
import TimerButton from './Create/TimerButton';
import { useRouter } from 'next/navigation';
import { MoveLeft, Plus } from 'lucide-react';
import QuizAI from './Create/QuizAI';
import { toast } from 'sonner';
import { checkGeminiAPI } from '@/utils/checkGeminiAPI';

interface Answer {
  answerText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  answers: Answer[];
}

interface QuizFormTrialProps {
  currentVieww: string;
  user:any
}


const QuizFormTrial: React.FC<QuizFormTrialProps> = ({ currentVieww, user }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizDuration, setQuizDuration] = useState('');
  const [roomName, setRoomName] = useState(''); // New state for room name
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  //for quizAI
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [numQuestions, setNumQuestions] = useState('');


  const [userDetails, setUserDetails] = useState<any>(null);
  const [currentView, setCurrentView] = useState('details');

  const router = useRouter();

  useEffect(() => {
    setCurrentView(currentVieww);
  }, [currentVieww]);

  useEffect(()=>{
    setUserDetails(user);
    console.log("User is "+user.id);
  },[user])

  useEffect(()=>{
    console.log("Thank you "+questions);
    
  },[questions])

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
  
  const handleSubmitQuizDetails = async(e: React.FormEvent) => {
    e.preventDefault();
    
    // Implement quiz details submission logic here
    const toastId = toast.loading('Saving quiz details...');
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName,
          quizTitle,
          quizDescription,
          quizDuration: parseInt(quizDuration, 10),
          playerName: userDetails?.name,
          userId: userDetails?.id,
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        // setRoomId(result.data.id);
        // setMainDuration(result.data.quizDuration);
        // setQuizDuration(parseInt(quizDuration, 10));
        toast.success('Quiz details saved successfully', { id: toastId });
        // setShowQuizForm(false);

        router.push(`/${roomName}/${userDetails?.id}`)
        setQuizTitle('');
        setQuizDescription('');
        // setRoomName('');
        setQuizDuration('');
        // setQuizDurationLocal('');
        
        // setCurrentView('questions');
      } else {
        toast.error('Failed to save quiz details', { id: toastId });
      }
    } catch (error) {
      console.error('Error saving quiz details:', error);
      toast.error('Failed to save quiz details', { id: toastId });
    }

  };

  // const addNewQuesFun = () => {
  //   // setCurrentView('questions');
  // };

  const handleAIQuiz = async(e: React.FormEvent) => {
    // setCurrentView('list');
    console.log("Inside handleAIQuiz");
    e.preventDefault();
    const toastId = toast.loading('Saving quiz details...');

    try {
      // Step 1: Save quiz details
      const quizResponse = await fetch('/api/quiz', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              roomName,
              quizTitle,
              quizDescription,
              quizDuration: parseInt(quizDuration, 10),
              playerName: userDetails?.name,
              userId: userDetails?.id,
          }),
      });

      if (!quizResponse.ok) {
          throw new Error('Failed to save quiz details');
      }

      const quizData = await quizResponse.json();
      const roomId = quizData.data.id; // Assuming the quiz ID is returned in the response

      toast.success('Quiz details saved successfully', { id: toastId });
      router.push(`/${roomName}/${userDetails?.id}`);

      const toastId1 = toast.loading('Saving quiz details...');
      // Step 2: Generate questions with the Gemini API
      const generatedQuestions = await checkGeminiAPI(quizTitle, difficultyLevel, numQuestions);

      if (generatedQuestions && generatedQuestions.length > 0) {
          setQuestions(generatedQuestions); // Store the generated questions in state

          // Step 3: Save generated questions in bulk to the database
          const saveQuestionsResponse = await fetch('/api/questionAI', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  roomId,
                  questions: generatedQuestions,
              }),
          });

          if (saveQuestionsResponse.ok) {
              toast.success('Questions generated and saved successfully', { id: toastId1 });
          } else {
              toast.error('Failed to save generated questions', {id: toastId1})
              throw new Error('Failed to save generated questions');
          }
      } else {
          throw new Error('Failed to generate questions');
      }
    } catch (error:any) {
      console.error('Error in handleAIQuiz:', error);
      toast.error(error.message || 'An error occurred while saving quiz details and questions', { id: toastId });
    }
  };

  return (
    <div className="m-2">
      {currentView === 'details' && (
        <QuizDetailsForm
          quizTitle={quizTitle}
          quizDescription={quizDescription}
          quizDuration={quizDuration}
          roomName={roomName} // Passing roomName
          setQuizTitle={setQuizTitle}
          setQuizDescription={setQuizDescription}
          setQuizDurationLocal={setQuizDuration}
          setRoomName={setRoomName} // Passing setRoomName
          handleSubmitQuizDetails={handleSubmitQuizDetails}
        />
      )}

      {currentView === 'AI' && (
        <QuizAI
          quizTitle={quizTitle}
          quizDuration={quizDuration}
          quizDescription={quizDescription}
          setQuizDescription={setQuizDescription}
          setQuizTitle={setQuizTitle}
          setQuizDurationLocal={setQuizDuration}
          handleAI={handleAIQuiz}
          difficultyLevel={difficultyLevel}
          setDifficultyLevel={setDifficultyLevel}
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          roomName={roomName}
          setRoomName={setRoomName}
        />
      )}

      {/* <TimerButton startTimer={startTimer} /> */}
    </div>
  );
};

export default QuizFormTrial;
