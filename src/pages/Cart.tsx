import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Minus, Plus, Trash2, ArrowRight,
  MapPin, MessageSquare, User, Phone, Mail,
  CheckCircle, ShoppingBag
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Step = "cart" | "checkout" | "success";

const Cart = () => {
  const { items, updateQty, removeItem, clearCart, totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("cart");
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: user?.user_metadata?.name ?? "",
    email: user?.email ?? "",
    phone: user?.user_metadata?.phone ?? "",
    address: "",
    message: "",
  });

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value }),
  });

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { toast.error("Your cart is empty."); return; }
    setPlacing(true);

    const orderItems = items.map((i) => ({
      product_id: i.product.id,
      product_name: i.product.name,
      category: i.product.categoryLabel,
      quantity: i.quantity,
      customization: i.customization ?? null,
    }));

    const { data, error } = await supabase.from("orders").insert({
      user_id: user?.id ?? null,
      customer_name: form.name,
      customer_email: form.email || null,
      customer_phone: form.phone || null,
      items: orderItems,
      address: form.address,
      message: form.message || null,
      status: "pending",
      total_items: totalItems,
      updated_at: new Date().toISOString(),
    }).select("id").single();

    if (error) {
      toast.error("Failed to place order. Please try WhatsApp instead.");
      console.error(error);
    } else {
      setOrderId(data.id);
      clearCart();
      setStep("success");
    }
    setPlacing(false);
  };

  /* ── Empty cart ── */
  if (step !== "success" && items.length === 0 && step === "cart") {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag size={64} className="text-muted-foreground/30 mb-4" />
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground font-body mb-6">Browse our shop and add something you love!</p>
        <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-soft">
          Browse Shop <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  /* ── Success ── */
  if (step === "success") {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
          <CheckCircle size={72} className="text-whatsapp mx-auto mb-4" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">Order Placed! 🎉</h2>
          <p className="text-muted-foreground font-body max-w-sm mx-auto mb-2">
            Thank you! We've received your order and will reach out to confirm soon.
          </p>
          {orderId && (
            <p className="text-xs text-muted-foreground font-body mb-6">Order ID: <span className="font-mono text-foreground">{orderId.slice(0, 8).toUpperCase()}</span></p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-soft">
              Continue Shopping
            </Link>
            <a href="https://wa.me/919342023282" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-whatsapp text-primary-foreground font-medium text-sm hover:bg-whatsapp-dark transition-colors shadow-soft">
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {(["cart", "checkout"] as Step[]).map((s, idx) => (
            <div key={s} className="flex items-center gap-4">
              <div className={`flex items-center gap-2 text-sm font-body font-medium ${step === s ? "text-primary" : idx < ["cart","checkout"].indexOf(step) ? "text-whatsapp" : "text-muted-foreground"}`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === s ? "bg-primary text-primary-foreground" : idx < ["cart","checkout"].indexOf(step) ? "bg-whatsapp text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{idx + 1}</span>
                <span className="hidden sm:block capitalize">{s === "cart" ? "Cart Review" : "Checkout"}</span>
              </div>
              {idx < 1 && <div className={`w-12 h-0.5 ${step === "checkout" ? "bg-primary" : "bg-border"} transition-colors`} />}
            </div>
          ))}
        </div>

        {/* ── CART STEP ── */}
        {step === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
                <ShoppingCart size={24} /> Cart <span className="text-sm font-body text-muted-foreground font-normal">({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
              </h1>
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-soft"
                  >
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-sm sm:text-base">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground font-body">{item.product.categoryLabel}</p>
                      {item.customization && (
                        <p className="text-xs text-primary mt-0.5 font-body italic">Note: {item.customization}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-body font-medium">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 ml-1">
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 shadow-soft sticky top-24">
                <h2 className="font-display font-semibold text-foreground mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm font-body mb-6">
                  {items.map((i) => (
                    <div key={i.product.id} className="flex justify-between text-muted-foreground">
                      <span className="truncate pr-2">{i.product.name} × {i.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-2 flex justify-between font-medium text-foreground">
                    <span>Total Items</span>
                    <span>{totalItems}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-body mb-4 bg-secondary/50 rounded-lg p-3">
                  💬 Pricing is confirmed via WhatsApp after order review.
                </p>
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-soft"
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
                <Link to="/shop" className="block text-center text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors font-body">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── CHECKOUT STEP ── */}
        {step === "checkout" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-5">
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">Delivery Details</h1>

              {!user && (
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-sm font-body text-foreground">
                  <strong>Tip:</strong> <Link to="/login" className="text-primary underline">Sign in</Link> to save your details for faster checkout next time.
                </div>
              )}

              <div className="bg-card border border-border rounded-xl p-6 shadow-soft space-y-4">
                <h2 className="font-display font-semibold text-foreground flex items-center gap-2"><User size={18} /> Your Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Full Name *</label>
                    <input {...field("name")} type="text" required className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Phone *</label>
                    <input {...field("phone")} type="tel" required className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+91 9XXXXXXXXX" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Email</label>
                  <input {...field("email")} type="email" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring" placeholder="your@email.com" />
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-soft space-y-4">
                <h2 className="font-display font-semibold text-foreground flex items-center gap-2"><MapPin size={18} /> Delivery Address *</h2>
                <textarea
                  {...field("address")}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="House/flat no., Street, Area, City, State, PIN code"
                />
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-soft space-y-4">
                <h2 className="font-display font-semibold text-foreground flex items-center gap-2"><MessageSquare size={18} /> Special Instructions <span className="text-muted-foreground text-sm font-body font-normal">(optional)</span></h2>
                <textarea
                  {...field("message")}
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Any special requests, customization details, occasion, etc."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => setStep("cart")} className="flex-1 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors font-body">
                  ← Back to Cart
                </button>
                <button type="submit" disabled={placing} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-soft disabled:opacity-60">
                  {placing ? "Placing Order…" : "Place Order 🎉"}
                </button>
              </div>
            </form>

            {/* Mini order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 shadow-soft sticky top-24">
                <h2 className="font-display font-semibold text-foreground mb-4">Your Order</h2>
                <div className="space-y-3">
                  {items.map((i) => (
                    <div key={i.product.id} className="flex items-center gap-3">
                      <img src={i.product.image} alt={i.product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-body font-medium text-foreground truncate">{i.product.name}</p>
                        <p className="text-xs text-muted-foreground font-body">Qty: {i.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-4 pt-3 text-sm font-body font-medium text-foreground flex justify-between">
                  <span>Total Items</span><span>{totalItems}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
