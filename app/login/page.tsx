"use client";

import { LoginForm } from "@/components/login/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background/95 to-background p-4">
      <Card className="w-full max-w-md bg-background/50 border-border/40 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2 text-white">تسجيل الدخول</CardTitle>
          <CardDescription className="text-gray-300">
            أدخل رقم الواتساب وكلمة المرور للمتابعة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300 mb-4">
              ليس لديك حساب؟{" "}
              <Link href="/register" className="text-primary hover:text-primary/80">
                سجل الآن
              </Link>
            </p>
            
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
