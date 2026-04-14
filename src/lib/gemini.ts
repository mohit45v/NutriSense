import { GoogleGenerativeAI } from '@google/generative-ai';

// Use the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiModel = (modelName: string = 'gemini-3-flash-preview') => {
  // Upgraded to Gemini 3 Flash for maximum intelligence and speed
  return genAI.getGenerativeModel({ model: modelName });
};
