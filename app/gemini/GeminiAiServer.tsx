// app/gemini/GeminiAiServer.tsx
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { SearchInputType } from "./GeminiAiClient";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;

const GeminiAiServer = async (data: SearchInputType) => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "Prathamesh Chougale is the author" }],
      },
      {
        role: "model",
        parts: [
          {
            text: ".Hello, I am Prathamesh Chougale, This model is created by Google AI. I am here to help you with your queries. Please ask me anything.",
          },
        ],
      },
    ],
  });
  const result = await chat.sendMessage(data.search);
  const response = result.response;

  return { Question: data.search, Answer: response.text() };
};

export default GeminiAiServer;
