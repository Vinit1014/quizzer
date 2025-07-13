
'use client'

import React, { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';
import QuestionsList from './QuestionsList';
import { ArrowLeft, MoveLeft, Plus, XCircle, CheckCircle, Trophy, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button"
import { useQuiz } from '@/context/QuizContext';

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
  quizTitle: string;
  quizDescription: string;
}

const QuestionManager: React.FC<QuestionManagerProps> = ({ roomId, roomQuizDuration, quizTitle, quizDescription }) => {

  const [fetchQuestions, setFetchQuestions] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);  
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentView, setCurrentView] = useState('list');
  const {quizCompleted} = useQuiz();
    
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
          {!quizCompleted ? (
            <button
              className="flex border-2 rounded-lg bg-white p-1 border-green-500 mt-8 hover:bg-green-50"
              onClick={addNewQuestion}
            >
              <Plus className="w-4 mx-1" />
              <span className="mx-2 text-sm">Add another question</span>
            </button>
          ) : (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
              <div className="max-w-2xl w-full">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  {/* Header with gradient background */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-12 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <CheckCircle className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      Quiz Completed!
                    </h1>
                    <p className="text-emerald-100 text-lg">
                      This quiz has already been finished
                    </p>
                  </div>

                  {/* Content */}
                  <div className="px-8 py-8">
                    <div className="space-y-6">
                      {/* Quiz Details Header */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                          <Trophy className="w-4 h-4" />
                          Quiz Details
                        </div>
                      </div>

                      {/* Quiz Title */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Quiz Title
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {quizTitle}
                        </p>
                      </div>

                      {/* Quiz Description */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          Description
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                          {quizDescription}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-center pt-4">
                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full font-medium">
                          <Clock className="w-5 h-5" />
                          Status: Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional: Additional actions */}
                {/* <div className="mt-6 text-center">
                  <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
                    View Results
                  </button>
                </div> */}
              </div>
            </div>
          )}

        </>
      )}
    </div>
  );
};

export default QuestionManager;
