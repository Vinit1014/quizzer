'use client'
import React, { useEffect, useState } from 'react';
import { Trash2, Plus, CircleCheck } from 'lucide-react';

interface QuestionFormProps {
  currentQuestion: string;
  answers: string[];
  correctAnswer: number | null;
  setCurrentQuestion: (value: string) => void;
  setAnswers: (answers: string[]) => void;
  setCorrectAnswer: (value: number) => void;
  handleAddQuestion: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  currentQuestion,
  answers,
  correctAnswer,
  setCurrentQuestion,
  setAnswers,
  setCorrectAnswer,
  handleAddQuestion,
}) => {
  const [options, setOptions] = useState<string[]>(answers);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(()=>{
    setOptions(answers);
  },[answers])

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = options.map((option, i) => (i === index ? value : option));
    setOptions(updatedOptions);
    setAnswers(updatedOptions);
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    setAnswers(updatedOptions);
  };

  const toggleOptionSelection = (index: number) => {
    setSelectedOption(selectedOption === index ? null : index);
    setCorrectAnswer(index);
  };
  
  return (
    <div className=''>
      <div className="mb-4 mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Question 1</label>
        <input
          type="text"
          placeholder='What would you like to ask?'
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
        />
      </div>

      {/* Options List */}
      <div className="mb-2">
        {options.map((option, index) => (
          <div className="flex mb-2" key={index}>
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-full m-1 p-0 mt-2 hover:cursor-pointer ${
                selectedOption === index ? 'bg-green-700' : 'bg-white'
              }`}
              onClick={() => toggleOptionSelection(index)}
            >
              <CircleCheck
                className={`w-5 ${selectedOption === index ? 'text-white' : 'text-gray-400'}`}
              />
            </div>

            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
            />
            <Trash2
              className="text-gray-400 w-6 hover:text-gray-800 my-2 mx-2 hover:cursor-pointer"
              onClick={() => handleRemoveOption(index)}
            />
          </div>
        ))}
      </div>

      {/* Add option button */}
      <div
        onClick={handleAddOption}
        className="p-1 bg-white border-2 flex rounded text-gray-500 hover:cursor-pointer hover:border-slate-300"
      >
        <Plus className="w-4 mx-2" />
        <span className="mx-2">Add option</span>
      </div>

      {/* Save question */}
      <div className="flex justify-center mt-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" 
        onClick={()=>{
          handleAddQuestion();
          setOptions(['']);
        }}
        >
          Save this question
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
