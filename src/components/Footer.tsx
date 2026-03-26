import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="inline-block mb-4">
            <img src="/logo.png" alt="Framez Studio" className="h-14 w-auto brightness-0 invert" />
          </Link>
          <p className="text-sm opacity-70 leading-relaxed">
            Framing Moments, Creating Memories. Premium custom photo frames and gifts crafted with love.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            {[{ to: "/shop", label: "Shop" }, { to: "/gallery", label: "Gallery" }, { to: "/custom-order", label: "Custom Order" }].map(l => (
              <Link key={l.to} to={l.to} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Company</h4>
          <div className="space-y-2">
            {[{ to: "/about", label: "About Us" }, { to: "/contact", label: "Contact" }].map(l => (
              <Link key={l.to} to={l.to} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Connect</h4>
          <div className="space-y-2 text-sm opacity-70">
            <a href="https://wa.me/919342023282" target="_blank" rel="noopener noreferrer" className="block hover:opacity-100 transition-opacity">WhatsApp</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block hover:opacity-100 transition-opacity">Instagram</a>
            <p>+91 93420 23282</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center text-sm opacity-60 flex items-center justify-center gap-1">
        Made with <Heart size={14} className="text-primary" /> by Framez Studio
      </div>
    </div>
  </footer>
);

export default Footer;
