
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Timer from '@/components/Timer'
import io, { Socket } from 'socket.io-client'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, EyeOff, TimerIcon, Loader2 } from 'lucide-react'
import { useQuiz } from '@/context/QuizContext'

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'
const socket: Socket = io(SOCKET_URL)

interface Answer {
  answerText: string
  isCorrect: boolean
}

interface Question {
  questionText: string
  answers: Answer[]
}

interface QuestionsListProps {
  roomId: string
  fetchQuestions: boolean
  showQuestions: boolean
  toggleShowQuestions: () => void
  roomQuizDuration: number
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  roomId,
  fetchQuestions,
  showQuestions,
  toggleShowQuestions,
  roomQuizDuration
}) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [timerStarted, setTimerStarted] = useState(false);
  const [mainDuration, setMainDuration] = useState<number>();
  const {quizCompleted} = useQuiz();

  useEffect(() => {
    setMainDuration(roomQuizDuration)
  }, [roomQuizDuration])

  useEffect(() => {
    console.log("Questions are " + JSON.stringify(questions))
  }, [questions])

  useEffect(() => {
    const fetchQuestionsFromAPI = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/getquestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: roomId }),
        })
        if (response.ok) {
          const { data } = await response.json()
          setQuestions(data)
        } else {
          console.error('Failed to fetch questions')
        }
      } catch (error) {
        console.error('Error fetching questions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestionsFromAPI()
  }, [fetchQuestions, roomId])

  const routeDashboard = () => {
    router.push('/dashboard')
  }

  const startTimer = () => {
    setTimerStarted(true)
    socket.emit('start-timer', mainDuration)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="outline" onClick={routeDashboard}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <Button variant="outline" onClick={toggleShowQuestions}>
          {showQuestions ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
          {showQuestions ? 'Hide' : 'Show'} Current Questions
        </Button>
        {!quizCompleted && (
          <Button onClick={startTimer} disabled={timerStarted}>
            <TimerIcon className="mr-2 h-4 w-4" /> Start Timer
          </Button>
        )}
        {timerStarted && <Timer />}
      </div>

      {showQuestions && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Current Questions Added</h2>
          {loading ? (
            <div className="flex items-center justify-center mt-4">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <p className="text-lg">Loading...</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {questions.map((question, index) => (
                <li key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h3 className="font-bold text-lg mb-3">{`${index + 1}. ${question.questionText}`}</h3>
                  <ul className="space-y-2">
                    {question.answers.map((answer, idx) => (
                      <li
                        key={idx}
                        className={`p-3 rounded-md ${
                          answer.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {answer.answerText}
                        {answer.isCorrect && (
                          <span className="ml-2 font-semibold">(Correct)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestionsList