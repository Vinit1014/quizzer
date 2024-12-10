'use client'

import React, {useEffect, useState} from 'react'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from 'next/navigation';

type QuizItem = {
  quizTitle: string;
  createdAt: string;
  id: string;
  roomName: string;
};

interface SidebarTrialProps {
  onQuizSelect: (quiz: QuizItem) => void;
  user:any
}

const SidebarTrial: React.FC<SidebarTrialProps> = ({ onQuizSelect, user }) => {

  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const router = useRouter();

  useEffect(()=>{
    console.log(quizItems);
  },[quizItems])

  useEffect(() => {
    // Fetch quizzes from the API when userId is available
    const fetchQuizzes = async () => {
      if (user && user.id) {
        try {
          const response = await fetch('/api/quizdetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id }),
          });
          
          if (response.ok) {
            const { data } = await response.json();
            const formattedData = data.map((quiz: QuizItem) => ({
              ...quiz,
              createdAt: new Date(quiz.createdAt).toISOString().split('T')[0], // Formats to YYYY-MM-DD
            }));
            setQuizItems(formattedData);
          } else {
            console.error('Failed to fetch quizzes');
          }
        } catch (error) {
          console.error('Error fetching quizzes:', error);
        }
      }
    };

    fetchQuizzes();
  }, [user.id]);

  const routeQuiz = (quiz:QuizItem)=>{
    router.push(`/${quiz.roomName}/${user.id}`);
  }

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="text-lg">Past quizzes</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {quizItems && quizItems.map((quiz) => (
              <SidebarMenuItem key={quiz.id} className="py-2 my-2">
                <SidebarMenuButton asChild>
                  <button onClick={() => routeQuiz(quiz)}>
                    <div className="">
                      <span className="">{quiz.quizTitle}</span>
                      <p className="text-xs text-gray-500">{quiz.createdAt}</p>
                    </div>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );

};

export default SidebarTrial;