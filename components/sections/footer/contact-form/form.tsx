"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateWhatsApp } from "@/lib/utils/validation";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!validateWhatsApp(formData.whatsapp)) {
      setError("رقم الواتساب غير صحيح. يجب أن يبدأ برمز الدولة (مثال: ‎+966555555555)");
      setIsSubmitting(false);
      return;
    }

    // Add form submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", whatsapp: "", message: "" });
    }, 1000);
  };

  return (
    <Card className="elevation-2">
      <CardHeader>
        <CardTitle className="text-xl text-center text-white">تواصل معنا</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <Input
            placeholder="الاسم"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Input
            type="tel"
            placeholder="رقم الواتساب (مثال: ‎+966555555555)"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            required
            dir="ltr"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Textarea
            placeholder="رسالتك"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            rows={4}
          />
          <Button 
            type="submit" 
            className="w-full neon-glow"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإرسال..." : "إرسال"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}