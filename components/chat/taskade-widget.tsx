"use client";

import { useEffect, useState, useCallback } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";

interface TaskadeMessage {
  text: string;
  role: 'user' | 'assistant';
  user?: {
    id: string;
  };
}

interface TaskadeConfig {
  publicAgentId: string;
}

declare global {
  interface Window {
    TaskadeEmbed: {
      AgentPublicChatPopup: {
        init: (config: TaskadeConfig) => void;
      };
    };
  }
}

export function TaskadeWidget() {
  const { toast } = useToast();
  const [chatHistory, setChatHistory] = useState<TaskadeMessage[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState('');

  const loadChatHistory = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: history } = await supabase
          .from('chat_sessions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (history?.messages) {
          setChatHistory(history.messages);
        }
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  }, []);

  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  useEffect(() => {
    // Initialize widget after script loads
    const initWidget = () => {
      if (window.TaskadeEmbed) {
        window.TaskadeEmbed.AgentPublicChatPopup.init({
          publicAgentId: '01JFP5XB8SSD0RCVA5C813JBSS'
        });
      }
    };

    // Add event listener for script load
    window.addEventListener('load', initWidget);
    return () => window.removeEventListener('load', initWidget);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === '') return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const userMessage: TaskadeMessage = {
        text: message,
        role: 'user',
        user: { id: user.id }
      };

      // Update chat history with user message
      setChatHistory(prev => [...prev, userMessage]);
      setMessage('');

      // Initialize Taskade chat
      if (window.TaskadeEmbed) {
        window.TaskadeEmbed.AgentPublicChatPopup.init({
          publicAgentId: '01JFP5XB8SSD0RCVA5C813JBSS'
        });
      }
    } catch (error) {
      toast({
        title: "خطأ في إرسال الرسالة",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b border-border/40 bg-background/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white">المساعد الذكي</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-gray-300 hover:text-white border-gray-600 hover:bg-white/10"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(chatHistory, null, 2));
              toast({
                title: "تم نسخ المحادثة",
                description: "تم نسخ نص المحادثة إلى الحافظة",
              });
            }}
          >
            نسخ المحادثة
          </Button>
          <Button
            variant="outline"
            className={isRecording ? 
              "bg-red-500/80 hover:bg-red-500 text-white" : 
              "bg-primary/80 hover:bg-primary text-white"}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? "إيقاف التسجيل" : "تسجيل صوتي"}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-background/30">
        <Script 
          src="https://assets.taskade.com/embeds/latest/embed.iife.js"
          strategy="afterInteractive"
        />
      </ScrollArea>

      <div className="p-4 border-t border-border/40 bg-background/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 min-h-[52px] max-h-32 p-3 rounded-lg bg-background/50 border border-border/40 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            rows={1}
          />
          <Button 
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            إرسال
          </Button>
        </form>
      </div>
    </Card>
  );
}