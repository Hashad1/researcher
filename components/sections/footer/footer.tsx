"use client";

import { SocialLinks } from "./social-links";
import { ContactForm } from "./contact-form/form";
import { ContactInfo } from "./contact-info";
import { Card } from "@/components/ui/card";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-background/95 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <Card className="p-6 bg-background/40 backdrop-blur-sm elevation-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center md:text-right neon-text">
                  تواصل معنا
                </h2>
                <ContactInfo />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center md:text-right">
                  تابعنا على مواقع التواصل
                </h3>
                <SocialLinks />
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60">
            جميع الحقوق محفوظة © {new Date().getFullYear()} الباحث العلمي
          </p>
        </div>
      </div>
    </footer>
  );
}