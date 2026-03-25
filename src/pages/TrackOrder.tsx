import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageCircle, CheckCircle2, Clock, Palette, Wrench, PackageCheck, Truck, Home } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import SectionHeading from "@/components/SectionHeading";

const trackingSteps = [
  { icon: CheckCircle2, label: "Order Received", desc: "We've got your order" },
  { icon: Palette, label: "In Design Process", desc: "Creating your design" },
  { icon: Wrench, label: "Frame in Production", desc: "Crafting your frame" },
  { icon: PackageCheck, label: "Ready for Dispatch", desc: "Packed & ready to go" },
  { icon: Truck, label: "Out for Delivery", desc: "On its way to you" },
  { icon: Home, label: "Delivered", desc: "Enjoy your memories!" },
];

const TrackOrder = () => {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentStep] = useState(2); // Simulated: step index (0-based)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) setSubmitted(true);
  };

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            title="Track Your"
            goldWord="Order"
            subtitle="Enter your Order ID or phone number to check status"
          />

          {/* Search */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex gap-3"
          >
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSubmitted(false); }}
                placeholder="Order ID or Phone Number"
                className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-input bg-card text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-soft whitespace-nowrap"
            >
              Check Status
            </button>
          </motion.form>

          {/* Results */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="mt-10"
              >
                {/* Order info badge */}
                <div className="flex items-center justify-between bg-card rounded-lg p-4 shadow-soft mb-8">
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Order ID</p>
                    <p className="font-display font-semibold text-foreground">{query}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground font-body flex items-center gap-1 justify-end">
                      <Clock size={12} /> Estimated delivery
                    </p>
                    <p className="font-display font-semibold text-accent">3–5 days</p>
                  </div>
                </div>

                {/* Timeline — vertical on mobile, horizontal on desktop */}
                {/* Desktop horizontal */}
                <div className="hidden sm:block">
                  <div className="relative flex items-start justify-between">
                    {/* Connecting line */}
                    <div className="absolute top-5 left-5 right-5 h-0.5 bg-border" />
                    <div
                      className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-700"
                      style={{ width: `${(currentStep / (trackingSteps.length - 1)) * 100}%`, maxWidth: "calc(100% - 40px)" }}
                    />

                    {trackingSteps.map((step, i) => {
                      const isCompleted = i < currentStep;
                      const isCurrent = i === currentStep;
                      const isFuture = i > currentStep;

                      return (
                        <motion.div
                          key={step.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="relative z-10 flex flex-col items-center text-center flex-1"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isCompleted
                                ? "bg-primary text-primary-foreground shadow-soft"
                                : isCurrent
                                ? "bg-primary text-primary-foreground shadow-gold ring-4 ring-primary/20"
                                : "bg-card text-muted-foreground border-2 border-border"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={20} />
                            ) : (
                              <step.icon size={18} />
                            )}
                          </div>
                          <p
                            className={`mt-3 text-xs font-body font-medium leading-tight max-w-[80px] ${
                              isFuture ? "text-muted-foreground/50" : isCurrent ? "text-primary font-semibold" : "text-foreground"
                            }`}
                          >
                            {step.label}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile vertical */}
                <div className="sm:hidden space-y-0">
                  {trackingSteps.map((step, i) => {
                    const isCompleted = i < currentStep;
                    const isCurrent = i === currentStep;
                    const isFuture = i > currentStep;
                    const isLast = i === trackingSteps.length - 1;

                    return (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="flex items-start gap-4"
                      >
                        {/* Icon + connector line */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isCompleted
                                ? "bg-primary text-primary-foreground"
                                : isCurrent
                                ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-gold"
                                : "bg-card text-muted-foreground border-2 border-border"
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 size={20} /> : <step.icon size={18} />}
                          </div>
                          {!isLast && (
                            <div className={`w-0.5 h-10 ${i < currentStep ? "bg-primary" : "bg-border"}`} />
                          )}
                        </div>

                        {/* Text */}
                        <div className={`pt-2 pb-4 ${isFuture ? "opacity-40" : ""}`}>
                          <p className={`text-sm font-body font-semibold ${isCurrent ? "text-primary" : "text-foreground"}`}>
                            {step.label}
                          </p>
                          <p className="text-xs text-muted-foreground">{step.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Note + WhatsApp CTA */}
                <div className="mt-10 bg-card rounded-lg p-5 shadow-soft text-center space-y-4">
                  <p className="text-sm text-muted-foreground font-body">
                    For updates or changes, contact us on WhatsApp
                  </p>
                  <a
                    href={whatsappUrl(`Hi, I want an update on my order. My Order ID is ${query}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-whatsapp text-primary-foreground font-semibold text-sm hover:bg-whatsapp-dark transition-all shadow-soft hover:scale-105"
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp for Updates
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default TrackOrder;
