"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    // TODO: Implement search functionality
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border/40 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="text-white hover:text-white/80"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للوحة التحكم
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20">
        {/* Search Form */}
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-8">البحث في المستندات</h1>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="اكتب ما تريد البحث عنه..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-background/50 text-white border-border/40 focus:border-primary pl-12"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={isSearching || !query.trim()}
            >
              {isSearching ? "جاري البحث..." : "بحث"}
            </Button>
          </form>

          {/* Results will be shown here */}
          <div className="mt-8 bg-background/50 rounded-lg border border-border/40 backdrop-blur-sm p-6">
            {/* TODO: Add search results */}
          </div>
        </div>
      </main>
    </div>
  );
}
