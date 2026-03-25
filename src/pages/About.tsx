import { motion } from "framer-motion";
import { Heart, Sparkles, Award } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";

const values = [
  { icon: Heart, title: "Made with Love", desc: "Every frame is handcrafted with care and attention to detail." },
  { icon: Sparkles, title: "Premium Quality", desc: "We use the finest materials to ensure your memories last forever." },
  { icon: Award, title: "Customer First", desc: "Your satisfaction is our priority. We work until you're delighted." },
];

const About = () => (
  <div className="pt-20">
    {/* Hero */}
    <section className="relative h-64 sm:h-80 overflow-hidden">
      <img src={heroBg} alt="About Framez Studio" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
      <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground"
        >
          Our <span className="text-accent">Story</span>
        </motion.h1>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Framing Moments, Creating <span className="gold-text">Memories</span>
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            At Framez Studio, we believe every photograph tells a story — a story of love, laughter, milestones, and memories worth preserving. What started as a small passion project has grown into a studio dedicated to transforming your most cherished moments into beautiful, tangible keepsakes.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            We handcraft each frame with premium materials, paying attention to every detail — because your memories deserve nothing less than perfection. From classic wooden frames to modern acrylic designs, from personalized gifts to nostalgic polaroid sets, we create something special for every occasion.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            Our process is simple: you share your vision via WhatsApp, and we bring it to life. No complicated checkouts, no endless forms — just a conversation and a commitment to making you smile.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-cream">
      <div className="container-narrow">
        <SectionHeading title="What We Stand" goldWord="For" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center p-6 bg-card rounded-lg shadow-soft"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <v.icon size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
