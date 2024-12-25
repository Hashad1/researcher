"use client";

import { useEffect, useRef } from "react";
import { Message } from "./message";
import { useMessages } from "@/hooks/use-messages";

export function ChatWindow() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages } = useMessages();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-4">
      <div className="container mx-auto px-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}