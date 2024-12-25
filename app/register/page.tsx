"use client";

import { RegisterForm } from "@/components/register/form";
import { RegisterHeader } from "@/components/register/header";
import { RegisterFeatures } from "@/components/register/features";
import { RegisterFooter } from "@/components/register/footer";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-20">
      <div className="container mx-auto px-4">
        <RegisterHeader />
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <RegisterFeatures />
          <div className="bg-background/50 border border-border/40 backdrop-blur-sm rounded-lg p-6">
            <RegisterForm />
          </div>
        </div>
        <RegisterFooter />
      </div>
    </main>
  );
}