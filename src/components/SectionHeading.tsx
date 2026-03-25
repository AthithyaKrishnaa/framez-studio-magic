import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  goldWord?: string;
}

const SectionHeading = ({ title, subtitle, goldWord }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12"
  >
    <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
      {goldWord ? (
        <>
          {title} <span className="gold-text">{goldWord}</span>
        </>
      ) : (
        title
      )}
    </h2>
    {subtitle && <p className="mt-3 text-muted-foreground font-body max-w-xl mx-auto">{subtitle}</p>}
    <div className="mt-4 mx-auto w-16 h-0.5 bg-accent" />
  </motion.div>
);

export default SectionHeading;
