import React from 'react';
import { HeroSection } from "@/components/sections/hero/hero-section";
import { FeaturesSection } from "@/components/sections/features/features-section";
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-section";
import { FAQSection } from "@/components/sections/faq/faq-section";
import { IntroSection } from "@/components/sections/intro/intro-section";
import { BenefitsSection } from "@/components/sections/benefits/benefits-section";
import { Footer } from "@/components/sections/footer/footer";

const HomePage = () => {
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
      <div className="bg-background/50 backdrop-blur-sm">
        <section className="pt-8 pb-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="rounded-lg border border-border p-6 elevation-1 max-w-3xl mx-auto elevation-3 bg-gradient-to-br from-secondary/10 via-primary/5 to-secondary/10">
              <div className="p-8">
                <p className="text-lg text-white/90 text-center mb-8 leading-relaxed backdrop-blur-sm">
                  لقد صُممت أداتنا لمساعدتك في صياغة محتوى أكاديمي متكامل مع ضمان الدقة والاحترافية. سواء كنت طالبًا، أكاديميًا، أو باحثًا محترفًا – نحن هنا لدعمك!
                </p>
                <div className="text-center">
                  <button className="inline-flex items-center justify-center text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-11 rounded-md px-8 text-white bg-gradient-to-r from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary transition-all duration-300 neon-glow">
                    ابدأ رحلتك البحثية الآن
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left mr-2 h-4 w-4">
                      <path d="m12 19-7-7 7-7"></path>
                      <path d="M19 12H5"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container mx-auto px-4 mt-4">
        <div className="rounded-lg border border-border p-6 elevation-1 max-w-4xl mx-auto backdrop-blur-sm elevation-3">
          <div className="flex flex-col space-y-1.5">
            <h3 className="tracking-tight text-4xl font-bold mb-6 text-center text-white neon-text">
              الأداة المثلى لإنجاز أبحاثك بفعالية واحترافية
            </h3>
          </div>
          <div className="pt-0">
            <p className="text-xl text-white mb-8 text-center">
              اكتشف مساعدك الذكي المصمم خصيصًا لتوجيهك في كل خطوة من خطوات البحث العلمي. من تحديد المشكلة إلى توثيق المراجع – نقدم لك الأدوات والموارد التي تحتاجها لإنشاء دراسة متكاملة بسهولة.
            </p>
            <div className="flex justify-center gap-4">
              <a href="/register">
                <button className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-11 rounded-md px-8 text-white neon-glow neon-pulse" id="register-cta">
                  ابدأ الآن مجاناً
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left mr-2 h-4 w-4">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                  </svg>
                </button>
              </a>
              <button className="inline-flex items-center justify-center text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-11 rounded-md px-8 text-white border-secondary hover:bg-secondary/20 transition-colors neon-glow" aria-label="شاهد كيف يعمل الباحث العلمي">
                شاهد كيف يعمل
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;