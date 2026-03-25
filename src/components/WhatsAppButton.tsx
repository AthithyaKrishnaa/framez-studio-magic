import { MessageCircle } from "lucide-react";
import { whatsappUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

const WhatsAppButton = () => (
  <a
    href={whatsappUrl(WHATSAPP_MESSAGES.order)}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-primary-foreground flex items-center justify-center shadow-elevated transition-transform duration-200 hover:scale-110 whatsapp-pulse"
    aria-label="Order on WhatsApp"
  >
    <MessageCircle size={28} fill="currentColor" />
  </a>
);

export default WhatsAppButton;
