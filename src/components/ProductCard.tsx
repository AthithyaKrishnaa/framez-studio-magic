import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, Check } from "lucide-react";
import { whatsappUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/products";

const BADGE_COLORS: Record<string, string> = {
  "Popular":    "bg-blue-100 text-blue-700",
  "Best Seller":"bg-accent text-accent-foreground",
  "Trending":   "bg-rose-100 text-rose-700",
  "Customize":  "bg-purple-100 text-purple-700",
  "Premium":    "bg-yellow-100 text-yellow-800",
};

interface ProductCardProps {
  product: Product;
  index?: number;
  onClick?: () => void;
}

const ProductCard = ({ product, index = 0, onClick }: ProductCardProps) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group gold-border-trace rounded-xl overflow-hidden bg-card shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${BADGE_COLORS[product.badge] ?? "bg-secondary text-foreground"}`}>
            {product.badge}
          </span>
        )}
        {/* Hover overlay with Add to Cart */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-full text-xs font-semibold font-body shadow-elevated transition-all duration-200 flex items-center gap-1.5 ${
              added
                ? "bg-whatsapp text-primary-foreground"
                : "bg-primary-foreground text-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {added ? <><Check size={12} /> Added!</> : <><ShoppingCart size={12} /> Add to Cart</>}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5 flex-1 flex flex-col">
        <h3 className="font-display font-semibold text-foreground text-sm sm:text-base leading-tight">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 font-body">{product.categoryLabel}</p>

        <div className="mt-auto pt-3 flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold font-body transition-all ${
              added
                ? "bg-whatsapp/10 text-whatsapp"
                : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {added ? <><Check size={12} /> Added</> : <><ShoppingCart size={12} /> Add to Cart</>}
          </button>
          <a
            href={whatsappUrl(WHATSAPP_MESSAGES.product(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-lg bg-whatsapp/10 hover:bg-whatsapp text-whatsapp hover:text-primary-foreground transition-all flex items-center justify-center flex-shrink-0"
            title="Order on WhatsApp"
          >
            <MessageCircle size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
