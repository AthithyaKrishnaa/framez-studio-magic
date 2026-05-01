import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import CustomOrder from "./pages/CustomOrder";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TrackOrder from "./pages/TrackOrder";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            <Navbar />
            <main className="min-h-screen">
              <Routes>
                {/* Public */}
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/custom-order" element={<CustomOrder />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/cart" element={<Cart />} />

                {/* Customer Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requireAdmin redirectTo="/admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
