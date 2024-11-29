const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function checkGeminiAPI(quizTitle: string, difficultyLevel: string, numQuestions: string) {
  const prompt = `
    Generate ${numQuestions} multiple-choice questions about "${quizTitle}" with a ${difficultyLevel.toLowerCase()} difficulty level.
    Return the questions as a JSON array, without any code formatting, backticks, or additional text.
    Use the following structure for each question:
    [
      {
        "questionText": "Sample question text?",
        "answers": [
          { "answerText": "Option A", "isCorrect": false },
          { "answerText": "Option B", "isCorrect": true },
          { "answerText": "Option C", "isCorrect": false },
          { "answerText": "Option D", "isCorrect": false }
        ]
      }
    ]`;


  try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log(response.text());
      
      const questions = JSON.parse(await response.text());
      console.log("Generated questions:", questions);
      return questions;
      
  } catch (error) {
      console.error("Error calling Gemini API:", error);
  }
}
