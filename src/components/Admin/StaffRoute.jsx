import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Allows both admins and managers through — used for pages managers
// need (Orders, Cancellations) without granting them full admin
// access to products, coupons, or manager accounts.
const StaffRoute = ({ children }) => {
  const { isAuthenticated, isStaff, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-brand-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isStaff) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default StaffRoute;
