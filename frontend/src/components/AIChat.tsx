"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BotIcon, SendIcon, UserIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { mockCoursesData } from "../constants/data";
import ProductCard from "./ProductCard";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  courseIds?: string[];
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Hi! I'm your EduMarket AI assistant. How can I help you today?",
      sender: "bot",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputValue }),
      });

      const data = await res.json();

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: data.reply,
        sender: "bot",
        courseIds: Array.isArray(data.courseIds) ? data.courseIds : undefined,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to get reply:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-error-${Date.now()}`,
          text: "Oops! There was an error. Please try again later.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-500/80 rounded-full h-14 w-14 p-0 shadow-lg z-50 cursor-pointer"
      >
        <BotIcon className="h-8 w-8" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-0 right-0 w-full sm:w-96 h-[90vh] md:h-[500px] rounded-t-xl shadow-xl z-50 flex flex-col p-0 border border-gray-300/30 mb-[unset] mr-[unset] md:mb-4 md:mr-2">
          <div className="bg-gradient-to-r from-green-500 to-green-400 text-white px-4 py-3 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center">
              <BotIcon className="h-7 w-7 mr-2" />
              <h3 className="font-bold text-white text-lg">Edu AI Assistant</h3>
            </div>
            <Button
              className="hover:bg-red-500/90 text-white cursor-pointer rounded-full"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="h-5 w-5 text-white" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-4 py-2 space-y-4 h-10">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={` w-full rounded-lg px-4 py-2 text-sm shadow mb-5  ${
                    message.sender === "user"
                      ? "bg-green-100 text-gray-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    {message.sender === "user" ? (
                      <UserIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <BotIcon className="h-4 w-4 text-green-600" />
                    )}
                    <span className="text-xs text-gray-500">
                      {message.sender === "user" ? "You" : "Bot"}
                    </span>
                  </div>
                  <p>{message.text}</p>
                  {message.sender === "bot" &&
                    Array.isArray(message.courseIds) &&
                    message.courseIds.length > 0 && (
                      <div className="w-full py-4 space-y-2 flex flex-col gap-4">
                        {mockCoursesData
                          .filter(
                            (course) =>
                              course.courseId !== undefined &&
                              message.courseIds!.includes(
                                course.courseId as string,
                              ),
                          )
                          .map((course) => (
                            <ProductCard key={course.courseId} {...course} />
                          ))}
                      </div>
                    )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>

          <form onSubmit={handleSend} className="border-t p-3 flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600"
              disabled={!inputValue.trim()}
            >
              <SendIcon className="h-5 w-5" />
            </Button>
          </form>
        </Card>
      )}
    </>
  );
};

export default AIChat;
