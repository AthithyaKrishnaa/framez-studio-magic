import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, Star, Camera, Gift, Image } from "lucide-react";
import { whatsappUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { products } from "@/lib/products";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import heroBg from "@/assets/hero-bg.jpg";

const steps = [
  { icon: Camera, title: "Choose Your Design", desc: "Browse our gallery or share your idea" },
  { icon: MessageCircle, title: "Order on WhatsApp", desc: "Send us your photo and preferences" },
  { icon: Gift, title: "Receive Your Frame", desc: "We craft and deliver to your doorstep" },
];

const testimonials = [
  { name: "Priya S.", text: "The quality is amazing! My anniversary frame was absolutely perfect. Will order again!", rating: 5 },
  { name: "Rahul M.", text: "Ordered a custom collage frame for my parents. They loved it! Great craftsmanship.", rating: 5 },
  { name: "Anita K.", text: "Super easy ordering via WhatsApp. The team was very helpful and delivery was on time.", rating: 5 },
];

const categoryItems = [
  { icon: Image, label: "Photo Frames", desc: "Custom frames for every memory", link: "/shop" },
  { icon: Gift, label: "Gifts", desc: "Personalized gift sets", link: "/shop" },
  { icon: Camera, label: "Polaroids", desc: "Retro-style photo prints", link: "/shop" },
];

const Index = () => (
  <div>
    {/* Hero */}
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Framez Studio hero" width={1920} height={1080} className="w-full h-full object-cover ken-burns" />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight"
        >
          Frame It. Love It.{" "}
          <span className="text-accent">Keep It Forever.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg sm:text-xl text-primary-foreground/80 font-body"
        >
          Where Every Photo Gets Its Perfect Frame
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={whatsappUrl(WHATSAPP_MESSAGES.order)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-whatsapp text-primary-foreground font-semibold text-base hover:bg-whatsapp-dark transition-all shadow-elevated hover:scale-105"
          >
            <MessageCircle size={20} /> Order on WhatsApp
          </a>
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary-foreground/20 backdrop-blur text-primary-foreground font-semibold text-base border border-primary-foreground/30 hover:bg-primary-foreground/30 transition-all"
          >
            Browse Designs <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Categories */}
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading title="Our" goldWord="Collections" subtitle="Find the perfect frame or gift for every occasion" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categoryItems.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                to={cat.link}
                className="block p-8 rounded-lg bg-card shadow-soft hover:shadow-card transition-all duration-300 text-center group hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <cat.icon size={28} className="text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{cat.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Best Sellers */}
    <section className="section-padding bg-cream">
      <div className="container-narrow">
        <SectionHeading title="Best" goldWord="Sellers" subtitle="Our most loved designs" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-soft"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading title="How It" goldWord="Works" subtitle="Get your custom frame in 3 simple steps" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon size={28} className="text-primary" />
              </div>
              <div className="w-8 h-8 mx-auto -mt-8 mb-2 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold font-display">
                {i + 1}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding bg-cream">
      <div className="container-narrow">
        <SectionHeading title="What Our Customers" goldWord="Say" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card p-6 rounded-lg shadow-soft"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.text}"</p>
              <p className="mt-4 font-display font-semibold text-sm text-foreground">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="section-padding bg-primary text-primary-foreground text-center">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Ready to Frame Your <span className="text-accent">Memories?</span>
          </h2>
          <p className="mt-4 text-primary-foreground/80 font-body max-w-lg mx-auto">
            Start your order in seconds. Just send us a message on WhatsApp!
          </p>
          <a
            href={whatsappUrl(WHATSAPP_MESSAGES.order)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-whatsapp text-primary-foreground font-bold text-lg hover:bg-whatsapp-dark transition-all shadow-elevated hover:scale-105"
          >
            <MessageCircle size={22} /> Order Now on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Index;
