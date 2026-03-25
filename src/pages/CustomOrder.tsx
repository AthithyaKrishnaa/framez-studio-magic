import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Upload } from "lucide-react";
import emailjs from "@emailjs/browser";
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "@/lib/emailjs";
import { whatsappUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";

const CustomOrder = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          from_contact: form.phone,
          message: form.message,
          form_type: "Custom Order",
          time: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        },
        EMAILJS_PUBLIC_KEY
      );
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send. Please try WhatsApp instead.");
    }
    setSending(false);
  };

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            title="Custom"
            goldWord="Order"
            subtitle="Tell us your vision and we'll craft it for you"
          />
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Phone</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                placeholder="Your phone number"
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
                placeholder="Describe your custom frame idea..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">
                Attach reference image (share via WhatsApp)
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-input bg-background text-muted-foreground text-sm">
                <Upload size={18} />
                <span>Select file (UI only — send via WhatsApp)</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={sending}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-soft disabled:opacity-50"
              >
                <Send size={16} /> {sending ? "Sending..." : "Send Message"}
              </button>
              <a
                href={whatsappUrl(WHATSAPP_MESSAGES.custom)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-whatsapp text-primary-foreground font-medium text-sm hover:bg-whatsapp-dark transition-colors shadow-soft"
              >
                <MessageCircle size={16} /> Order via WhatsApp
              </a>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default CustomOrder;
