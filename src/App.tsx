import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main className={isAuthPage ? "" : "min-h-screen"}>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />

          {/* Protected Store Routes (forces Google login) */}
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
          <Route path="/custom-order" element={<ProtectedRoute><CustomOrder /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/track-order" element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

          {/* Admin Protected Routes */}
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
      {!isAuthPage && <Footer />}
      {!isAuthPage && <WhatsAppButton />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
