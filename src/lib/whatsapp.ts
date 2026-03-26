const WHATSAPP_NUMBER = "919342023282";

export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_MESSAGES = {
  order: "Hi, I want to place an order!",
  custom: "Hi, I want to place a custom frame order.",
  gallery: "Hi, I liked a design from your gallery. Can I get something similar?",
  product: (name: string) => `Hi, I want to order ${name}`,
};
