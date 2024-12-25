"use client";

import { GetStartedForm } from "@/components/get-started/form";
import { GetStartedHeader } from "@/components/get-started/header";
import { GetStartedFeatures } from "@/components/get-started/features";

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background pt-20">
      <div className="container mx-auto px-4">
        <GetStartedHeader />
        <div className="max-w-6xl mx-auto">
          <GetStartedFeatures />
          <div className="mt-8 bg-background/50 border border-border/40 backdrop-blur-sm rounded-lg p-6">
            <GetStartedForm />
          </div>
        </div>
      </div>
    </main>
  );
}