import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error("Passwords don't match."); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    setLoading(true);
    const { error } = await signUp(form.email, form.password, form.name, form.phone);
    if (error) {
      toast.error(error.message || "Registration failed.");
    } else {
      toast.success("Account created! Please check your email to verify.");
      navigate("/login");
    }
    setLoading(false);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value }),
  });

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-primary" size={28} />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2 text-sm font-body">Join Framez Studio today</p>
        </div>

        <div className="bg-card rounded-2xl shadow-card border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Full Name *</label>
              <input {...field("name")} type="text" required className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="Your full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Email *</label>
              <input {...field("email")} type="email" required className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Phone <span className="text-muted-foreground">(optional)</span></label>
              <input {...field("phone")} type="tel" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="+91 9XXXXXXXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Password *</label>
              <div className="relative">
                <input {...field("password")} type={show ? "text" : "password"} required className="w-full px-4 py-3 pr-12 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="Min. 6 characters" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Confirm Password *</label>
              <input {...field("confirm")} type={show ? "text" : "password"} required className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="Re-enter password" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-soft disabled:opacity-60 mt-2"
            >
              <UserPlus size={16} />
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground font-body">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
