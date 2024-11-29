// require('dotenv').config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// export async function checkGeminiAPI() {
//   const prompt = "generate me 3 mcq questions with answers topic web dev difficulty hard";
  
//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log("Gemini API response:", text);
//   } catch (error) {
//     console.error("Error calling Gemini API:", error);
//   }
// }
