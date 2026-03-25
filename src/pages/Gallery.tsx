import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import SectionHeading from "@/components/SectionHeading";
import Lightbox from "@/components/Lightbox";

const Gallery = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            title="Our"
            goldWord="Gallery"
            subtitle="Browse our collection of handcrafted frames and gifts"
          />
          <div className="columns-2 sm:columns-3 gap-4 space-y-4">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="break-inside-avoid cursor-pointer group gold-border-trace rounded-lg overflow-hidden"
                onClick={() => setLightboxImage(product.image)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  );
};

export default Gallery;
