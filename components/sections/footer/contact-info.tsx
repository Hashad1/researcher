"use client";

import { Phone, Mail } from "lucide-react";

interface ContactItem {
  label: string;
  value: string;
}

const phoneNumbers: ContactItem[] = [
  { label: "البحرين", value: "+973 354 33011" },
  { label: "السعودية", value: "+966 555 016119" },
  { label: "مصر", value: "+201 111 366082" },
];

export function ContactInfo() {
  return (
    <div className="space-y-6 text-white/80">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Phone className="h-5 w-5" />
          <h4 className="font-semibold text-white">للتواصل:</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phoneNumbers.map((phone) => (
            <div key={phone.label} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
              <p className="flex flex-col gap-1">
                <span className="text-primary font-medium">{phone.label}</span>
                <a 
                  href={`tel:${phone.value.replace(/\s/g, '')}`}
                  className="hover:text-primary transition-colors"
                  dir="ltr"
                >
                  {phone.value}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-5 w-5 text-primary" />
          <span className="text-primary font-medium">البريد الإلكتروني</span>
        </div>
        <a 
          href="mailto:info@fateenai.com" 
          className="hover:text-primary transition-colors"
          dir="ltr"
        >
          info@fateenai.com
        </a>
      </div>
    </div>
  );
}