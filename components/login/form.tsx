"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";
import { validateWhatsApp } from "@/lib/utils/validation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    whatsapp: "",
    password: "",
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate WhatsApp number
      if (!validateWhatsApp(formData.whatsapp)) {
        throw new Error("رقم الواتساب غير صحيح. يجب أن يبدأ برمز الدولة (مثال: ‎+966555555555)");
      }

      const { data, error } = await signIn(formData.whatsapp, formData.password);

      if (error) throw error;

      if (!data?.user) {
        throw new Error("فشل تسجيل الدخول - لم يتم العثور على المستخدم");
      }

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "جاري تحويلك للوحة التحكم...",
      });

      // Check session before redirecting
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      } else {
        throw new Error("فشل في إنشاء جلسة المستخدم");
      }

    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="whatsapp" className="text-white">رقم الواتساب</Label>
        <Input
          id="whatsapp"
          placeholder="‎+966555555555"
          value={formData.whatsapp}
          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          required
          disabled={isSubmitting}
          dir="ltr"
          className="bg-background/50 text-white placeholder:text-muted-foreground border-muted disabled:opacity-70"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">كلمة المرور</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={isSubmitting}
            className="bg-background/50 text-white border-muted pr-10 disabled:opacity-70"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isSubmitting}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors disabled:opacity-50"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            جاري تسجيل الدخول...
          </>
        ) : (
          "تسجيل الدخول"
        )}
      </Button>
    </form>
  );
}
