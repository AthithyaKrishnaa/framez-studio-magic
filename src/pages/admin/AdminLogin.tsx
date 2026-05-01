import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ADMIN_EMAIL } from "@/lib/supabase";

const AdminLogin = () => {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, isAdmin, user } = useAuth();
  const navigate = useNavigate();

  // If already admin, go to dashboard
  if (user && isAdmin) { navigate("/admin/dashboard"); return null; }
  if (user && !isAdmin) { return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Access denied. Admin only.</p>
    </div>
  ); }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast.error(error.message || "Invalid credentials.");
    } else if (email !== ADMIN_EMAIL) {
      toast.error("This portal is for admins only.");
    } else {
      toast.success("Welcome back, Admin!");
      navigate("/admin/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-foreground via-foreground/95 to-primary/80 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent/20 border border-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur">
            <Shield className="text-accent" size={32} />
          </div>
          <h1 className="font-display text-3xl font-bold text-primary-foreground">Admin Portal</h1>
          <p className="text-primary-foreground/60 mt-2 text-sm font-body">Framez Studio Control Panel</p>
        </div>

        {/* Card */}
        <div className="bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 rounded-2xl p-8 shadow-elevated">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-primary-foreground/70 mb-2 uppercase tracking-wider">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/30 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="admin@framezstudio.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-primary-foreground/70 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/30 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all shadow-gold disabled:opacity-60 mt-2"
            >
              <Lock size={16} />
              {loading ? "Signing in…" : "Access Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center text-primary-foreground/30 text-xs mt-6 font-body">
          © {new Date().getFullYear()} Framez Studio — Admin Access Only
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
