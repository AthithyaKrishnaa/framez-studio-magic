import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { whatsappUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

interface LightboxProps {
  image: string | null;
  alt?: string;
  onClose: () => void;
}

const Lightbox = ({ image, alt = "Product", onClose }: LightboxProps) => (
  <AnimatePresence>
    {image && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-3xl w-full bg-card rounded-lg overflow-hidden shadow-elevated"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-foreground/60 text-primary-foreground flex items-center justify-center hover:bg-foreground/80 transition-colors"
          >
            <X size={18} />
          </button>
          <img src={image} alt={alt} className="w-full max-h-[70vh] object-contain" />
          <div className="p-4 flex justify-center">
            <a
              href={whatsappUrl(WHATSAPP_MESSAGES.gallery)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-whatsapp text-primary-foreground font-medium text-sm hover:bg-whatsapp-dark transition-colors shadow-soft"
            >
              <MessageCircle size={18} /> Order Similar on WhatsApp
            </a>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Lightbox;
