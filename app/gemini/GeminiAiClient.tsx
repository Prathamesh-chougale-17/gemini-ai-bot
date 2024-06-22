// app/gemini/GeminiAiClient.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { IconArrowRight } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";

interface ConversationProp {
  Question: string;
  Answer: string;
}

export type SearchInputType = {
  search: string;
};

const GeminiAiClient = () => {
  const [conversation, setConversation] = useState<ConversationProp[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SearchInputType>();

  const processForm = async (data: SearchInputType) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setConversation((prev) => [...prev, result]);
    } catch (error) {
      console.error("Error:", error);
    }
    reset();
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col justify-between h-screen pt-20">
      <div className="h-[85vh] pt-1 overflow-scroll no-scrollbar">
        {conversation.map((item, index) => (
          <div key={index}>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full">
                {index + 1}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <div className="font-bold">Question:</div>
                  <div>{item.Question}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="font-bold">Answer:</div>
                  <ReactMarkdown>{item.Answer}</ReactMarkdown>
                </div>
              </div>
            </div>
            <hr className="my-2 border-t border-gray-200" />
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center">
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

export default GeminiAiClient;
