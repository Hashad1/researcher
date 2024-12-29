"use client";

import { memo, lazy, Suspense } from 'react';
import Spinner from '@/components/ui/spinner';

interface Message {
  text: string;
}

interface ChatbotProps {
  messages: Message[];
}

const LazyMessage = lazy(() => import('@/components/Message'));

const Chatbot: React.FC<ChatbotProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <Suspense key={index} fallback={<Spinner />}>
          <LazyMessage text={message.text} />
        </Suspense>
      ))}
    </div>
  );
};

export default memo(Chatbot);
