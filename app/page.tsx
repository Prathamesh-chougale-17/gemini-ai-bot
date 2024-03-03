"use client";

import React, { useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { SearchPrompt } from "./Scheme";
import { z } from "zod";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";

interface ConversationProp {
  Question: string;
  Answer: string;
}
import { IconArrowRight } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import ExampleComponent from "@/components/TypeAnimation/TextAnimation";
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
export type SearchInputType = z.infer<typeof SearchPrompt>;
const GeminiAi = () => {
  const [Conversation, setConversation] = useState<ConversationProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const acceptresponse = async (data: SearchInputType) => {
    setIsLoading(true);
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
    // console.log(response.text());
    setConversation((prev) => [
      ...prev,
      { Question: data.search, Answer: response.text() },
    ]);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SearchInputType>();
  const processForm = (data: SearchInputType) => {
    acceptresponse(data);
    if (errors.search) {
      console.log(errors.search);
    }
    reset();
    setIsLoading(false);
  };
  return (
    <main className="flex flex-col justify-between h-screen pt-20">
      <div className="h-[85vh] pt-1 overflow-scroll no-scrollbar">
        {Conversation.map((item, index) => {
          return (
            <div key={index}>
              {/* design below question and answer fasionable way*/}
              <div className="py-3">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white dark:text-black">
                      {index + 1}
                    </div>
                    <div className="ml-2 text-lg font-bold">
                      {item.Question}
                    </div>
                  </div>
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="flex pt-3">
                      <div className="flex items-center justify-center w-8 h-8  text-left rounded-full bg-primary text-white dark:text-black">
                        <IconArrowRight />
                      </div>
                    </div>
                    <div className="ml-2 mt-2 text-lg">
                      <ExampleComponent Answer={item.Answer} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex items-center justify-center">
            {/* create a loading spinner */}
            <div className="w-8 h-8 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(processForm)}>
        <Input placeholder="Search questions" {...register("search")} />
      </form>
    </main>
  );
};

export default GeminiAi;
