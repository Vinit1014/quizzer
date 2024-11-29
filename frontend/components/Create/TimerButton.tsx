
import React from 'react';

interface TimerButtonProps {
  startTimer: () => void;
}

const TimerButton: React.FC<TimerButtonProps> = ({ startTimer }) => {
  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={startTimer}
        className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Start Timer
      </button>
    </div>
  );
};

export default TimerButton;
