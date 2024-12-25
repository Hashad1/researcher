"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { History, Trash2, MessageSquare, Download, LogOut, LogIn, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  user_id: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

interface TaskadeMessage {
  text: string;
}

interface TaskadeConfig {
  publicAgentId: string;
  onMessage?: (message: TaskadeMessage) => void;
}

interface TaskadeEmbed {
  AgentPublicChatPopup: {
    init: (config: TaskadeConfig) => void;
  };
}

declare global {
  interface Window {
    TaskadeEmbed: TaskadeEmbed;
  }
}

export default function ChatPage() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Initialize Taskade
  const initializeTaskade = useCallback((sessionId: string) => {
    if (!window.TaskadeEmbed?.AgentPublicChatPopup) {
      console.error('TaskadeEmbed is not available');
      return;
    }

    try {
      window.TaskadeEmbed.AgentPublicChatPopup.init({
        publicAgentId: '01JFP5XB8SSD0RCVA5C813JBSS',
        onMessage: async (message: TaskadeMessage) => {
          if (!message.text) return;

          try {
            const newMessage: Message = {
              role: 'assistant',
              content: message.text,
              timestamp: new Date().toISOString(),
            };

            const { error } = await supabase
              .from('chat_sessions')
              .update({
                messages: [...(currentSession?.messages || []), newMessage],
                updated_at: new Date().toISOString(),
              })
              .eq('id', sessionId);

            if (error) throw error;

            // Update local state
            setCurrentSession(prev => prev ? {
              ...prev,
              messages: [...prev.messages, newMessage],
              updated_at: new Date().toISOString(),
            } : null);

          } catch (error: any) {
            console.error('Error updating chat session:', error?.message || error);
            toast({
              title: "خطأ في حفظ المحادثة",
              description: error?.message || "حدث خطأ أثناء حفظ الرسالة",
              variant: "destructive",
            });
          }
        }
      });
    } catch (error) {
      console.error('Error initializing Taskade:', error);
      toast({
        title: "خطأ في تهيئة المحادثة",
        description: "حدث خطأ أثناء تهيئة المحادثة",
        variant: "destructive",
      });
    }
  }, [currentSession, toast]);

  // Load chat sessions
  const loadChatSessions = useCallback(async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      
      if (!user) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "يرجى تسجيل الدخول للمتابعة",
          variant: "destructive",
        });
        return;
      }

      const { data, error: dbError } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;
      setSessions(data || []);
    } catch (error: any) {
      console.error('Error loading chat sessions:', error?.message || error);
      toast({
        title: "خطأ في تحميل المحادثات",
        description: error?.message || "حدث خطأ أثناء تحميل المحادثات السابقة",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Load session
  const loadSession = useCallback(async (sessionId: string) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { data: session, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;
      if (!session) throw new Error('لم يتم العثور على المحادثة');

      setCurrentSession(session);
      initializeTaskade(session.id);
      setIsHistoryOpen(false);

      toast({
        title: "تم تحميل المحادثة",
        description: `تم تحميل محادثة تحتوي على ${session.messages.length} رسائل`,
      });
    } catch (error: any) {
      console.error('Error loading session:', error?.message || error);
      toast({
        title: "خطأ في تحميل المحادثة",
        description: error?.message || "حدث خطأ أثناء تحميل المحادثة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [initializeTaskade, isLoading, toast]);

  // Create new session
  const createNewSession = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (!user) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "يرجى تسجيل الدخول للمتابعة",
          variant: "destructive",
        });
        return;
      }

      // Create new session
      const { data: session, error: insertError } = await supabase
        .from('chat_sessions')
        .insert([{
          user_id: user.id,
          messages: [],
        }])
        .select()
        .single();

      if (insertError) throw insertError;
      if (!session) throw new Error('لم يتم إنشاء جلسة جديدة');

      setCurrentSession(session);
      setSessions(prev => [session, ...prev]);
      initializeTaskade(session.id);
      setIsHistoryOpen(false);

      toast({
        title: "تم إنشاء محادثة جديدة",
        description: "يمكنك الآن بدء المحادثة",
      });
    } catch (error: any) {
      console.error('Error creating new session:', error?.message || error);
      toast({
        title: "خطأ في إنشاء محادثة جديدة",
        description: error?.message || "حدث خطأ أثناء إنشاء المحادثة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [initializeTaskade, isLoading, toast]);

  // Delete session
  const deleteSession = useCallback(async (sessionId: string) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { error: deleteError } = await supabase
        .from('chat_sessions')
        .delete()
        .eq('id', sessionId);

      if (deleteError) throw deleteError;

      setSessions(prev => prev.filter(s => s.id !== sessionId));
      if (currentSession?.id === sessionId) {
        setCurrentSession(null);
      }

      toast({
        title: "تم حذف المحادثة",
        description: "تم حذف المحادثة بنجاح",
      });
    } catch (error: any) {
      console.error('Error deleting session:', error?.message || error);
      toast({
        title: "خطأ في حذف المحادثة",
        description: error?.message || "حدث خطأ أثناء حذف المحادثة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentSession, isLoading, toast]);

  // Export session
  const exportSession = useCallback(async (session: ChatSession) => {
    try {
      const content = {
        id: session.id,
        messages: session.messages,
        created_at: session.created_at,
        updated_at: session.updated_at,
      };

      const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-session-${format(new Date(session.created_at), 'yyyy-MM-dd-HH-mm', { locale: ar })}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "تم تصدير المحادثة",
        description: "تم حفظ المحادثة كملف JSON",
      });
    } catch (error: any) {
      console.error('Error exporting session:', error);
      toast({
        title: "خطأ في تصدير المحادثة",
        description: "حدث خطأ أثناء تصدير المحادثة",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Check auth state
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error?.message || "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  // Load initial data
  useEffect(() => {
    loadChatSessions();
  }, [loadChatSessions]);

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      <div className="flex items-center justify-between px-4 h-16 md:h-20 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              عودة
            </Button>
          </Link>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => createNewSession()}
            disabled={isLoading || !user}
          >
            <MessageSquare className="w-4 h-4" />
            {isLoading ? "جاري الإنشاء..." : "محادثة جديدة"}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2" disabled={!user}>
                <History className="w-4 h-4" />
                المحادثات السابقة
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle className="text-right">المحادثات السابقة</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex flex-col gap-2 p-4 rounded-lg bg-background/50 border border-border/40"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSession(session.id)}
                            disabled={isLoading}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => exportSession(session)}
                            disabled={isLoading}
                            className="h-8 w-8 p-0"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(session.created_at), 'PPpp', { locale: ar })}
                          </p>
                          <p className="text-sm">
                            {session.messages.length} رسائل
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadSession(session.id)}
                        disabled={isLoading || currentSession?.id === session.id}
                        className="w-full mt-2"
                      >
                        {currentSession?.id === session.id ? "المحادثة الحالية" : "عرض المحادثة"}
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {user ? (
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </Button>
          ) : (
            <Link href="/auth">
              <Button 
                variant="ghost" 
                size="sm"
                className="gap-2"
              >
                <LogIn className="w-4 h-4" />
                تسجيل الدخول
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="flex-1 relative w-full">
        <iframe 
          src="https://www.taskade.com/a/01JFP5XB8SSD0RCVA5C813JBSS" 
          className="absolute inset-0 w-full h-full"
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      </div>
    </main>
  );
}