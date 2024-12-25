export function validateWhatsApp(number: string): boolean {
  // Validate WhatsApp number format: +[country code][number]
  // Example: +966555555555
  const whatsappRegex = /^\+\d{1,3}\d{9,}$/;
  return whatsappRegex.test(number);
}

export function normalizeWhatsApp(number: string): string {
  // Remove all non-digit characters except the plus sign
  return number.replace(/[^\d+]/g, '');
}