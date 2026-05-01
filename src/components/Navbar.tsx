import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, PackageSearch, ShoppingCart, User, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/gallery", label: "Gallery" },
  { to: "/custom-order", label: "Custom Order" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/track-order", label: "Track Order" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { totalItems } = useCart();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully.");
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Framez Studio" className="h-10 sm:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  link.to === "/track-order"
                    ? "px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all shadow-soft flex items-center gap-1.5 hover:scale-105"
                    : `text-sm font-body font-medium transition-colors duration-200 ${
                        location.pathname === link.to
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`
                }
              >
                {link.to === "/track-order" && <PackageSearch size={15} />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Cart">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* User menu */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-secondary transition-colors text-sm font-body font-medium text-foreground"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    {isAdmin ? <Shield size={14} className="text-primary" /> : <User size={14} className="text-primary" />}
                  </div>
                  <span className="hidden lg:block max-w-[100px] truncate">
                    {isAdmin ? "Admin" : (user.user_metadata?.name?.split(" ")[0] || "Account")}
                  </span>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-52 bg-card border border-border rounded-xl shadow-elevated py-1 z-50"
                    >
                      <div className="px-4 py-2.5 border-b border-border">
                        <p className="text-xs font-semibold text-foreground font-body truncate">{user.email}</p>
                        {isAdmin && <p className="text-[10px] text-primary font-body font-medium mt-0.5">Admin Account</p>}
                      </div>
                      {isAdmin && (
                        <Link to="/admin/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors font-body">
                          <Shield size={15} className="text-primary" /> Dashboard
                        </Link>
                      )}
                      <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors font-body">
                        <LogOut size={15} className="text-muted-foreground" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-sm font-body font-medium text-foreground hover:bg-secondary transition-colors">
                <User size={14} /> Login
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={
                    link.to === "/track-order"
                      ? "flex justify-center items-center gap-2 mt-2 px-4 py-3 bg-primary text-primary-foreground text-base font-semibold rounded-lg shadow-sm"
                      : `flex items-center gap-2 text-base font-body font-medium py-2.5 px-2 rounded-lg ${
                          location.pathname === link.to
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`
                  }
                >
                  {link.to === "/track-order" && <PackageSearch size={18} />}
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border mt-2 space-y-1">
                {user ? (
                  <>
                    <p className="text-xs text-muted-foreground font-body px-2 py-1 truncate">{user.email}</p>
                    {isAdmin && (
                      <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-2 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors font-body">
                        <Shield size={16} className="text-primary" /> Admin Dashboard
                      </Link>
                    )}
                    <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="w-full flex items-center gap-2 px-2 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors font-body">
                      <LogOut size={16} className="text-muted-foreground" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-2 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors font-body">
                      <User size={16} /> Sign In
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-2 py-2.5 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors font-body">
                      <User size={16} /> Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
