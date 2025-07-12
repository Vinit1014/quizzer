import React, { useState } from 'react';

interface QuizDetailsFormProps {
  quizTitle: string;
  quizDescription: string;
  quizDuration: string;
  roomName: string;
  setQuizTitle: (value: string) => void;
  setQuizDescription: (value: string) => void;
  setQuizDurationLocal: (value: string) => void;
  setRoomName: (value: string) => void;
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
  const [durationError, setDurationError] = useState<string | null>(null);

  const validateDuration = (value: string) => {
    if (value === "") {
      // Allow empty input for backspacing
      setDurationError(null);
      setQuizDurationLocal(value);
      return;
    }

    const duration = parseInt(value, 10);

    if (isNaN(duration) || duration < 1 || duration > 120) {
      setDurationError('Please enter a valid number between 1 and 120.');
    } else {
      setDurationError(null); // Clear the error
    }

    setQuizDurationLocal(value); // Update the state regardless of validity
  };

  return (
    <form onSubmit={handleSubmitQuizDetails}>
      <div className="text-xl font-semibold flex items-center justify-center">Create new quiz room</div>

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
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Quiz Duration (minutes)
        </label>
        <input
          type="number"
          value={quizDuration}
          onChange={(e) => validateDuration(e.target.value)}
          className={`border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-300 ${
            durationError ? 'border-red-500' : ''
          }`}
          required
        />
        {durationError && (
          <p className="text-red-500 text-sm mt-1">{durationError}</p>
        )}
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={!!durationError} 
        >
          Save Quiz Details
        </button>
      </div>
    </form>
  );
};

export default QuizDetailsForm;
