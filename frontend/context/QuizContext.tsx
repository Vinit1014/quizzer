"use client"
import React, {createContext, useState, useEffect, useContext} from "react";
import { Prisma } from "@prisma/client";

interface QuizContextType {
    quizCompleted: boolean
}

const QuizContext = createContext<QuizContextType | null>(null);

export const QuizProvider = ({children}: {children: React.ReactNode}) => {

    const [quizCompleted, setIsCompleted] = useState(false);

    return (
        <QuizContext.Provider value={{quizCompleted}}>
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