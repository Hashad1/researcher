"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Facebook, href: "#", label: "فيسبوك" },
  { icon: Twitter, href: "#", label: "تويتر" },
  { icon: Instagram, href: "#", label: "انستغرام" },
  { icon: Linkedin, href: "#", label: "لينكد إن" },
];

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-end">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          className="bg-white/5 hover:bg-white/10 text-white hover:text-primary transition-all rounded-lg"
          asChild
        >
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={label}
            className="p-2"
          >
            <Icon className="h-5 w-5" />
          </a>
        </Button>
      ))}
    </div>
  );
}