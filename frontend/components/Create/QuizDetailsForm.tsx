
import React from 'react';

interface QuizDetailsFormProps {
  quizTitle: string;
  quizDescription: string;
  quizDuration: string;
  roomName: string; // New prop for room name
  setQuizTitle: (value: string) => void;
  setQuizDescription: (value: string) => void;
  setQuizDurationLocal: (value: string) => void;
  setRoomName: (value: string) => void; // New setter for room name
  handleSubmitQuizDetails: (e: React.FormEvent) => void;
}

const QuizDetailsForm: React.FC<QuizDetailsFormProps> = ({
  quizTitle,
  quizDescription,
  quizDuration,
  roomName,
  setQuizTitle,
  setQuizDescription,
  setQuizDurationLocal,
  setRoomName,
  handleSubmitQuizDetails,
}) => {
  return (
    <form onSubmit={handleSubmitQuizDetails}>
      <div className="flex items-center justify-center">Create new quiz room</div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Room Name</label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          style={{ height: '3rem' }}
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Title</label>
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          style={{ height: '3rem' }}
          required
        />
      </div>
      

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Description</label>
        <textarea
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          style={{ minHeight: '8rem' }}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Quiz Duration (minutes)</label>
        <input
          type="number"
          value={quizDuration}
          onChange={(e) => setQuizDurationLocal(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
          required
        />
      </div>
      
      <div className="mb-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Quiz Details
        </button>
      </div>
    </form>
  );
};

export default QuizDetailsForm;
