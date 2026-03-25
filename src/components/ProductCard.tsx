import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  index?: number;
  onClick?: () => void;
}

const ProductCard = ({ product, index = 0, onClick }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group gold-border-trace rounded-lg overflow-hidden bg-card shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 cursor-pointer"
    onClick={onClick}
  >
    <div className="relative overflow-hidden aspect-square">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={800}
        height={800}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="font-display font-semibold text-foreground text-sm sm:text-base">{product.name}</h3>
      <p className="text-xs text-muted-foreground mt-1">{product.categoryLabel}</p>
      <a
        href={whatsappUrl(WHATSAPP_MESSAGES.product(product.name))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-whatsapp hover:text-whatsapp-dark transition-colors"
      >
        <MessageCircle size={14} /> Order on WhatsApp
      </a>
    </div>
  </motion.div>
);

export default ProductCard;
