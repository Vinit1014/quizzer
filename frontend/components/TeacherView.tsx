// 'use client'
// import { useState } from "react";
// import SidebarTrial from './SidebarTrial';
// import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
// import { Plus, Bot, Menu } from 'lucide-react';
// import { Button } from "./ui/button";
// import QuizFormTrial from "./QuizFormTrial";

// const TeacherView = ({ user }: { user: any }) => {
//     const [selectedQuiz, setSelectedQuiz] = useState(null);
//     const [currentView, setCurrentView] = useState('details');

//     const handleQuizSelection = (quiz: any) => {
//         setSelectedQuiz(quiz);
//     };

//     const { toggleSidebar } = useSidebar()

//     return (
//         <div className="flex h-screen">
//             <div className="flex-1 flex flex-col bg-gray-50">
//                 <div className="p-2 flex justify-between items-center border-b">
//                     <div className="flex space-x-2">
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             className="md:hidden"
//                             onClick={toggleSidebar}
//                         >
//                             <Menu className="h-5 w-5" />
//                         </Button>
//                         <Button
//                             variant="default"
//                             size="sm"
//                             className="bg-green-600 hover:bg-green-700 text-white"
//                             onClick={() => {
//                                 setSelectedQuiz(null);
//                                 setCurrentView('details');
//                             }}
//                         >
//                             <Plus className="w-4 h-4 mr-1" />
//                             Create new quiz
//                         </Button>
//                         <Button
//                             variant="default"
//                             size="sm"
//                             className="bg-green-600 hover:bg-green-700 text-white"
//                             onClick={() => {
//                                 setSelectedQuiz(null);
//                                 setCurrentView('AI');
//                             }}
//                         >
//                             <Bot className="w-4 h-4 mr-1" />
//                             Generate using AI
//                         </Button>
//                     </div>
//                 </div>
//                 {!selectedQuiz ? (
//                     <QuizFormTrial currentVieww={currentView} user={user} />
//                 ) : (
//                     <div>
//                         <h1>Hello</h1>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TeacherView;