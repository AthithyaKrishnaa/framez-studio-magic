import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ children, requireAdmin = false, redirectTo = "/login" }: Props) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to={redirectTo} replace />;
  if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
