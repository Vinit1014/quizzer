
'use client'

import React, { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';
import QuestionsList from './QuestionsList';
import { ArrowLeft, MoveLeft, Plus, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"

interface Answer {
  answerText: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  answers: Answer[];
}

interface QuestionManagerProps {
  roomId: string;
  roomQuizDuration: any;
}

const QuestionManager: React.FC<QuestionManagerProps> = ({ roomId, roomQuizDuration }) => {

  const [fetchQuestions, setFetchQuestions] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);  
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentView, setCurrentView] = useState('list');
    
  useEffect(()=>{
    console.log(answers);
  },[answers])

  useEffect(()=>{
    console.log("Correct answer is "+correctAnswer);
  })

  const handleAddQuestion = async () => {
    const newQuestion: Question = {
      questionText: currentQuestion,
      answers: answers.map((answer, index) => ({
        answerText: answer,
        isCorrect: index === correctAnswer,
      })),
    };
    
    if (newQuestion.questionText === '' && newQuestion.answers.length == 0) {
      toast.error("Empty question and options can't be added");
      return;
    }
    else if (newQuestion.questionText === '') {
      toast.error("Empty question can't be added");
      return;
    }
    else if (newQuestion.answers.length == 0) {
      toast.error("Add option to save the question");
      return;
    }
    const toastId = toast.loading('Adding question...');
    try {
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId,
          questionText: currentQuestion,
          answers: newQuestion.answers,
        }),
      });
      
      if (response.ok) {
        setCurrentQuestion('');
        setAnswers(['']);
        setCorrectAnswer(null);
        toast.success('Question added successfully', { id: toastId });

        setFetchQuestions(prev => !prev);
      } else {
        toast.error('Failed to add question', { id: toastId });
      }
    } catch (error) {
      console.error('Error adding question:', error);
      toast.error('Failed to add question', { id: toastId });
    }
  };

  const toggleShowQuestions = () => setShowQuestions((prevShow) => !prevShow);
  const backToQuestionList = () => setCurrentView('list');
  const addNewQuestion = () => setCurrentView('questions');

  return (
    <div className="m-2">
      {currentView === 'questions' && (
        <>
          <Button variant="outline" onClick={backToQuestionList}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all questions
          </Button>
          <QuestionForm
            currentQuestion={currentQuestion}
            answers={answers}
            correctAnswer={correctAnswer}
            setCurrentQuestion={setCurrentQuestion}
            setCorrectAnswer={setCorrectAnswer}
            setAnswers={setAnswers}
            handleAddQuestion={handleAddQuestion}  
          />
          <button
            className="flex border-2 rounded-lg bg-white p-1 border-green-500 mt-8 hover:bg-green-50"
            onClick={handleAddQuestion}
          >
            <Plus className="w-4 mx-1" />
            <span className="mx-2 text-sm">Add Question</span>
          </button>
        </>
      )}

      {currentView === 'list' && (
        <>
          <QuestionsList
            roomId={roomId}
            showQuestions={showQuestions}
            toggleShowQuestions={toggleShowQuestions}
            fetchQuestions={fetchQuestions}
            roomQuizDuration={roomQuizDuration}
          />
          <button
            className="flex border-2 rounded-lg bg-white p-1 border-green-500 mt-8 hover:bg-green-50"
            onClick={addNewQuestion}
          >
            <Plus className="w-4 mx-1" />
            <span className="mx-2 text-sm">Add another question</span>
          </button>
        </>
      )}
    </div>
  );
};

export default QuestionManager;
