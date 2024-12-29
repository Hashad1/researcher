"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import NotificationComponent from '@/components/NotificationComponent';
import EmbedCodeComponent from '@/components/EmbedCodeComponent';
import ImageComponent from '@/components/ImageComponent';
import { useSession, signIn, signOut } from 'next-auth/react';
import { LogIn, LogOut } from 'lucide-react';

const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  loading: () => <Spinner />,
  ssr: false,
});

interface Message {
  text: string;
}

const ChatPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      // Fetch messages from the server
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const handleNotification = () => {
    setNotification('This is a notification message!');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center">
        <Button onClick={() => router.push('/dashboard')}>العودة للوحة التحكم</Button>
        {status === 'loading' ? (
          <Spinner />
        ) : session ? (
          <Button onClick={() => signOut()}>
            <LogOut className="ml-2 h-4 w-4" />
            تسجيل الخروج
          </Button>
        ) : (
          <Button onClick={() => signIn()}>
            <LogIn className="ml-2 h-4 w-4" />
            تسجيل الدخول
          </Button>
        )}
      </div>
      <div className="pt-16">
        <h1>Chat Page</h1>
        <Button onClick={handleNotification}>Show Notification</Button>
        <NotificationComponent message={notification} type="success" />
        <EmbedCodeComponent embedUrl="https://www.example.com/embed" title="Embedded Content" />
        <ImageComponent src="/path/to/image.jpg" alt="Example Image" />
        <Chatbot messages={messages} />
      </div>
    </div>
  );
};

export default ChatPage;