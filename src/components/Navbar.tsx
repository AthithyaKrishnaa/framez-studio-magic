import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PackageSearch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Framez Studio" className="h-10 sm:h-12 w-auto" />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  link.to === "/track-order"
                    ? "px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-all shadow-soft flex items-center gap-2 hover:scale-105"
                    : `text-sm font-body font-medium transition-colors duration-200 ${
                        location.pathname === link.to
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`
                }
              >
                {link.to === "/track-order" && <PackageSearch size={16} />}
                {link.label}
              </Link>
            ))}
          </div>

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

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={
                    link.to === "/track-order"
                      ? "flex justify-center items-center gap-2 mt-4 px-4 py-3 bg-primary text-primary-foreground text-base font-semibold rounded-lg shadow-sm"
                      : `block text-base font-body font-medium py-2 ${
                          location.pathname === link.to
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`
                  }
                >
                  {link.to === "/track-order" && <PackageSearch size={18} />}
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
