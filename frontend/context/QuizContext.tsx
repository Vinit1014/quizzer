"use client"
import React, {createContext, useState, useEffect, useContext} from "react";
import { prisma } from "@/prisma";

interface QuizContextType {
    quizCompleted: boolean,
    setQuizCompleted: (completed: boolean) => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider = ({children}: {children: React.ReactNode}) => {

    const [quizCompleted, setQuizCompleted] = useState(false);

    return (
        <QuizContext.Provider value={{quizCompleted, setQuizCompleted}}>
            {children}
        </QuizContext.Provider>
    )
}

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
    throw new Error('useQuiz must be used within an QuizProvider');
    }
    return context;
}