import { useState } from "react";
import { motion } from "framer-motion";
import { products, categories } from "@/lib/products";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import Lightbox from "@/components/Lightbox";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            title="Our"
            goldWord="Shop"
            subtitle="Browse and order your favorites via WhatsApp"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium font-body transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium font-body transition-all ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card text-muted-foreground hover:bg-secondary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onClick={() => setLightboxImage(product.image)}
              />
            ))}
          </motion.div>
        </div>
      </section>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
};

export default Shop;
