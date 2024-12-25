import { HeroSection } from "@/components/sections/hero/hero-section";
import { FeaturesSection } from "@/components/sections/features/features-section";
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-section";
import { FAQSection } from "@/components/sections/faq/faq-section";
import { IntroSection } from "@/components/sections/intro/intro-section";
import { BenefitsSection } from "@/components/sections/benefits/benefits-section";
import { Footer } from "@/components/sections/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <HeroSection />
      <div className="bg-background/50 backdrop-blur-sm">
        <IntroSection />
      </div>
      <FeaturesSection />
      <div className="bg-background/50 backdrop-blur-sm">
        <BenefitsSection />
      </div>
      <TestimonialsSection />
      <div className="bg-background/50 backdrop-blur-sm">
        <FAQSection />
      </div>
      <Footer />
    </main>
  );
}