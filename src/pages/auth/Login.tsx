import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast.error(error.message || "Login failed. Check your credentials.");
    } else {
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    }
    setLoading(false);
  };

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
            <LogIn className="text-primary" size={28} />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2 text-sm font-body">Sign in to your Framez account</p>
        </div>

        <div className="bg-card rounded-2xl shadow-card border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-soft disabled:opacity-60"
            >
              <LogIn size={16} />
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground font-body">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">Create one</Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
            <ShoppingBag size={14} />
            Continue as guest (cart only)
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
