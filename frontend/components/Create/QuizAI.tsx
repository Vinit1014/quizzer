// 'use client'
// import { checkGeminiAPI } from '@/utils/checkGeminiAPI';
// import React from 'react';

// interface QuizAIProps {
//   // quizTitle: string;
//   // quizDescription: string;
//   // quizDuration: string;
//   // setQuizTitle: (value: string) => void;
//   // setQuizDescription: (value: string) => void;
//   // setQuizDurationLocal: (value: string) => void;
//   // handleAI: (e: React.FormEvent) => void;
// }

// const QuizAI = () => {

//   const handleSubmit = ()=>{
//     // checkGeminiAPI();
//   }

//   return (
//     <form onSubmit={handleAI} className="w-full max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className='text-xl font-semibold text-center mb-4'>Create New Quiz with AI</h2>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Room name</label>
//         <input
//           type="text"
//           placeholder="Enter a brief, descriptive title (e.g., 'Introduction to Machine Learning')"
//           value={quizTitle}
//           onChange={(e) => setQuizTitle(e.target.value)}
//           className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Title</label>
//         <input
//           type="text"
//           placeholder="Enter a brief, descriptive title (e.g., 'Introduction to Machine Learning')"
//           value={quizTitle}
//           onChange={(e) => setQuizTitle(e.target.value)}
//           className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Difficulty Level</label>
//         <input
//           type="text"
//           placeholder="Enter difficulty level i.e.(HARD, EASY or MEDIUM)"
//           value={quizTitle}
//           onChange={(e) => setQuizTitle(e.target.value)}
//           className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
//           required
//         />
//       </div>

//       {/* <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Description</label>
//         <textarea
//           placeholder="Be specific about what to generate. Describe the topics, difficulty, and style (e.g., 'Generate questions on machine learning basics for beginners, covering supervised and unsupervised learning')."
//           value={quizDescription}
//           onChange={(e) => setQuizDescription(e.target.value)}
//           className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
//           style={{ minHeight: '8rem' }}
//           required
//         />
//       </div> */}
      
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">No. of questions</label>
//         <input
//           type="text"
//           placeholder="Enter number of questions to be added"
//           value={quizTitle}
//           onChange={(e) => setQuizTitle(e.target.value)}
//           className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Duration (minutes)</label>
//         <input
//           type="number"
//           placeholder="Set the quiz duration (e.g., 30 minutes)"
//           value={quizDuration}
//           onChange={(e) => setQuizDurationLocal(e.target.value)}
//           className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
//           required
//         />
//       </div>

//       <div className="mt-6">
//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           onClick={handleSubmit}
//         >
//           Save Quiz Details
//         </button>
//       </div>
//     </form>
//   );
// };

// export default QuizAI;

'use client'
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface QuizAIProps {
  quizTitle: string;
  quizDuration: string;
  setQuizTitle: Dispatch<SetStateAction<string>>;
  setQuizDurationLocal: Dispatch<SetStateAction<string>>;
  difficultyLevel: string;
  setDifficultyLevel: Dispatch<SetStateAction<string>>;
  numQuestions: string;
  setNumQuestions: Dispatch<SetStateAction<string>>;
  handleAI: (e: React.FormEvent) => void;
  roomName: string;
  setRoomName: any
  setQuizDescription: any
  quizDescription: string
}

const QuizAI: React.FC<QuizAIProps> = ({
  quizTitle,
  quizDuration,
  setQuizTitle,
  setQuizDurationLocal,
  difficultyLevel,
  setDifficultyLevel,
  numQuestions,
  setNumQuestions,
  handleAI,
  roomName,
  setRoomName,
  quizDescription,
  setQuizDescription
}) => {

  useEffect(()=>{
    console.log(roomName, quizTitle, difficultyLevel, numQuestions, quizDuration);
    
  },[roomName, quizTitle, difficultyLevel, numQuestions, quizDuration])


  return (
    <form onSubmit={handleAI} className="w-full max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className='text-xl font-semibold text-center mb-4'>Create New Quiz with AI</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Room Name</label>
        <input
          type="text"
          placeholder="Enter room name (e.g., 'Intro to AI Room')"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Title</label>
        <input
          type="text"
          placeholder="Enter a short and simple title (e.g., 'Introduction to Machine Learning')"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Description</label>
        <input
          type="text"
          placeholder="Enter a brief, descriptive description (e.g., 'Introduction to Machine Learning')"
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Difficulty Level</label>
        <input
          type="text"
          placeholder="Enter difficulty level (e.g., HARD, EASY, or MEDIUM)"
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">No. of Questions</label>
        <input
          type="text"
          placeholder="Enter number of questions to be added"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Duration (minutes)</label>
        <input
          type="number"
          placeholder="Set the quiz duration (e.g., 30 minutes)"
          value={quizDuration}
          onChange={(e) => setQuizDurationLocal(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          required
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          // onClick={handleSubmit}
        >
          Save Quiz Details
        </button>
      </div>
    </form>
  );
};

export default QuizAI;
