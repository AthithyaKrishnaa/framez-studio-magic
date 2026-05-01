import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "@/lib/emailjs";
import { whatsappUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { supabase } from "@/lib/supabase";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      // Save to Supabase (admin dashboard visibility)
      await supabase.from("contacts").insert({
        name: form.name,
        email: form.email || null,
        message: form.message,
        status: "new",
      });

      // Also send via EmailJS if configured
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: form.name,
            from_contact: form.email,
            message: form.message,
            form_type: "Contact",
            time: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
          },
          EMAILJS_PUBLIC_KEY
        );
      } catch { /* EmailJS is optional */ }

      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send. Please try WhatsApp instead.");
    }
    setSending(false);
  };

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            title="Get In"
            goldWord="Touch"
            subtitle="We'd love to hear from you"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-5 bg-card p-6 sm:p-8 rounded-lg shadow-card"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-soft disabled:opacity-50"
              >
                <Send size={16} /> {sending ? "Sending..." : "Send Message"}
              </button>
            </motion.form>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-card p-6 rounded-lg shadow-soft">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <a href="tel:+919342023282" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Phone size={18} className="text-primary" /> +91 93420 23282
                  </a>
                  <a
                    href={whatsappUrl(WHATSAPP_MESSAGES.order)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MessageCircle size={18} className="text-whatsapp" /> Chat on WhatsApp
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-primary fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    Follow on Instagram
                  </a>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin size={18} className="text-primary mt-0.5" /> India
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-cream-dark rounded-lg h-56 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin size={32} className="mx-auto mb-2 text-accent" />
                  <p className="text-sm font-body">Map placeholder</p>
                  <p className="text-xs">Add Google Maps embed here</p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl(WHATSAPP_MESSAGES.order)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-4 rounded-lg bg-whatsapp text-primary-foreground font-semibold hover:bg-whatsapp-dark transition-colors shadow-soft"
              >
                <MessageCircle size={20} className="inline mr-2" /> Message Us on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
