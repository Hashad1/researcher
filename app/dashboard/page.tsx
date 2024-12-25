"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Loader2, Search, History, Settings, LogOut, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface UserData {
  id: string;
  full_name?: string;
  whatsapp?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          router.replace("/login");
          return;
        }

        // Get user metadata directly from the session
        const userData: UserData = {
          id: session.user.id,
          full_name: session.user.user_metadata?.full_name,
          whatsapp: session.user.user_metadata?.whatsapp,
        };

        console.log('Session user:', session.user);
        console.log('User metadata:', session.user.user_metadata);
        console.log('Processed user data:', userData);

        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.error("Dashboard error:", error);
        router.replace("/login");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.replace("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleNewSearch = () => {
    router.push("/search");
  };

  const handleChat = () => {
    router.push("/chat");
  };

  const handleHistory = () => {
    toast({
      title: "السجل",
      description: "سيتم إضافة هذه الميزة قريباً",
    });
  };

  const handleEditProfile = async () => {
    if (!user) return;

    // Create a form to edit user data
    const fullName = window.prompt("الاسم الكامل:", user.full_name || "");
    if (fullName === null) return; // User cancelled

    const whatsapp = window.prompt("رقم الواتساب:", user.whatsapp || "");
    if (whatsapp === null) return; // User cancelled

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          whatsapp: whatsapp,
        }
      });

      if (error) throw error;

      // Update local state
      setUser(prev => ({
        ...prev!,
        full_name: fullName,
        whatsapp: whatsapp,
      }));

      toast({
        title: "تم التحديث",
        description: "تم تحديث معلومات الملف الشخصي بنجاح",
      });
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الملف الشخصي",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-white text-lg">جاري تحميل لوحة التحكم...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border/40 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await supabase.auth.signOut();
                router.replace("/login");
              }}
              className="flex items-center gap-2 text-red-400 hover:text-red-500 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 pb-8">
        {/* User Profile Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="bg-background/50 rounded-lg shadow-lg p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-4">معلومات المستخدم</h2>
            <div className="space-y-2">
              <p className="text-gray-200 flex items-center justify-between">
                <span>الاسم:</span>
                <span className="text-white font-medium">{user?.full_name || "غير متوفر"}</span>
              </p>
              <p className="text-gray-200 flex items-center justify-between">
                <span>رقم الواتساب:</span>
                <span dir="ltr" className="text-white font-medium">{user?.whatsapp || "غير متوفر"}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-background/50 rounded-lg shadow-lg p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-4">الإجراءات السريعة</h2>
            <div className="grid grid-cols-3 gap-4">
              <Button 
                variant="default" 
                className="w-full flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={handleNewSearch}
              >
                <Search className="h-4 w-4" />
                بحث جديد
              </Button>
              <Button 
                variant="default" 
                className="w-full flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
                onClick={handleChat}
              >
                <Bot className="h-4 w-4" />
                المساعد الذكي
              </Button>
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 border-gray-500 text-gray-300 hover:bg-gray-500/20 hover:text-white"
                onClick={handleHistory}
              >
                <History className="h-4 w-4" />
                السجل
              </Button>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-background/50 rounded-lg shadow-lg p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white mb-4">الإعدادات</h2>
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2 border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
              onClick={handleEditProfile}
            >
              <Settings className="h-4 w-4" />
              تعديل الملف الشخصي
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-background/50 rounded-lg shadow-lg p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-4">النشاط الأخير</h2>
          <div className="text-gray-400 text-center py-8">
            لا يوجد نشاط حديث
          </div>
        </div>
      </main>
    </div>
  );
}
