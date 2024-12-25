"use client";

import { Book, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <Book className="w-12 h-12 text-primary animate-pulse" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-center text-white neon-text">
            الباحث العلمي
          </h1>
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <LogIn className="ml-2 h-4 w-4" />
              تسجيل الدخول
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}