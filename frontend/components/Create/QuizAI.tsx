
// 'use client'
// import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

// interface QuizAIProps {
//   quizTitle: string;
//   quizDuration: string;
//   setQuizTitle: Dispatch<SetStateAction<string>>;
//   setQuizDurationLocal: Dispatch<SetStateAction<string>>;
//   difficultyLevel: string;
//   setDifficultyLevel: Dispatch<SetStateAction<string>>;
//   numQuestions: string;
//   setNumQuestions: Dispatch<SetStateAction<string>>;
//   handleAI: (e: React.FormEvent) => void;
//   roomName: string;
//   setRoomName: any
//   setQuizDescription: any
//   quizDescription: string
// }

// const QuizAI: React.FC<QuizAIProps> = ({
//   quizTitle,
//   quizDuration,
//   setQuizTitle,
//   setQuizDurationLocal,
//   difficultyLevel,
//   setDifficultyLevel,
//   numQuestions,
//   setNumQuestions,
//   handleAI,
//   roomName,
//   setRoomName,
//   quizDescription,
//   setQuizDescription
// }) => {

//   useEffect(()=>{
//     console.log(roomName, quizTitle, difficultyLevel, numQuestions, quizDuration);
    
//   },[roomName, quizTitle, difficultyLevel, numQuestions, quizDuration])


//   return (
//     <form onSubmit={handleAI} className="w-full max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className='text-xl font-semibold text-center mb-4'>Create New Quiz with AI</h2>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Room Name</label>
//         <input
//           type="text"
//           placeholder="Enter room name (e.g., 'Intro to AI Room')"
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//           className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Title</label>
//         <input
//           type="text"
//           placeholder="Enter a short and simple title (e.g., 'Introduction to Machine Learning')"
//           value={quizTitle}
//           onChange={(e) => setQuizTitle(e.target.value)}
//           className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Description</label>
//         <input
//           type="text"
//           placeholder="Enter a brief, descriptive description (e.g., 'Introduction to Machine Learning')"
//           value={quizDescription}
//           onChange={(e) => setQuizDescription(e.target.value)}
//           className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Difficulty Level</label>
//         <input
//           type="text"
//           placeholder="Enter difficulty level (e.g., HARD, EASY, or MEDIUM)"
//           value={difficultyLevel}
//           onChange={(e) => setDifficultyLevel(e.target.value)}
//           className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">No. of Questions</label>
//         <input
//           type="text"
//           placeholder="Enter number of questions to be added"
//           value={numQuestions}
//           onChange={(e) => setNumQuestions(e.target.value)}
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
//           // onClick={handleSubmit}
//         >
//           Save Quiz Details
//         </button>
//       </div>
//     </form>
//   );
// };

// export default QuizAI;


'use client';
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
  setRoomName: Dispatch<SetStateAction<string>>;
  quizDescription: string;
  setQuizDescription: Dispatch<SetStateAction<string>>;
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
  setQuizDescription,
}) => {
  const [durationError, setDurationError] = useState<string | null>(null);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  useEffect(() => {
    console.log(roomName, quizTitle, difficultyLevel, numQuestions, quizDuration);
  }, [roomName, quizTitle, difficultyLevel, numQuestions, quizDuration]);

  const validateDuration = (value: string) => {
    if (value === '') {
      setDurationError(null);
      setQuizDurationLocal(value);
      return;
    }

    const duration = parseInt(value, 10);
    if (isNaN(duration) || duration < 1 || duration > 120) {
      setDurationError('Please enter a valid duration between 1 and 120 minutes.');
    } else {
      setDurationError(null);
    }
    setQuizDurationLocal(value);
  };

  const validateNumQuestions = (value: string) => {
    if (value === '') {
      setQuestionsError(null);
      setNumQuestions(value);
      return;
    }

    const questions = parseInt(value, 10);
    if (isNaN(questions) || questions < 1 || questions > 100) {
      setQuestionsError('Number of questions must be between 1 and 100.');
    } else {
      setQuestionsError(null);
    }
    setNumQuestions(value);
  };

  const isFormValid = !durationError && !questionsError && quizTitle && roomName && difficultyLevel;

  return (
    <form onSubmit={handleAI} className="w-full max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Create New Quiz with AI</h2>
      
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
          placeholder="Enter a short and simple title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Description</label>
        <textarea
          placeholder="Enter a brief, descriptive text"
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Difficulty Level</label>
        <input
          type="text"
          placeholder="Enter difficulty level (e.g., EASY, MEDIUM, HARD)"
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Number of Questions</label>
        <input
          type="number"
          placeholder="Enter number of questions"
          value={numQuestions}
          onChange={(e) => validateNumQuestions(e.target.value)}
          className={`border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-300 ${
            questionsError ? 'border-red-500' : ''
          }`}
          required
        />
        {questionsError && <p className="text-red-500 text-sm mt-1">{questionsError}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Duration (minutes)</label>
        <input
          type="number"
          placeholder="Enter quiz duration"
          value={quizDuration}
          onChange={(e) => validateDuration(e.target.value)}
          className={`border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-300 ${
            durationError ? 'border-red-500' : ''
          }`}
          required
        />
        {durationError && <p className="text-red-500 text-sm mt-1">{durationError}</p>}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={!isFormValid}
        >
          Save Quiz Details
        </button>
      </div>
    </form>
  );
};

export default QuizAI;
