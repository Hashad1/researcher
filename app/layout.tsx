import './globals.css';
import type { Metadata } from 'next';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import AuthProvider from "@/components/providers/session-provider"
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['arabic'],
});

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'الباحث العلمي - أداة متطورة للذكاء الاصطناعي للبحث العلمي',
  description: 'اكتشف مساعدك الذكي المصمم خصيصًا لتوجيهك في كل خطوة من خطوات البحث العلمي',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ibmPlexSansArabic.className,
          inter.className
        )}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Header />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}