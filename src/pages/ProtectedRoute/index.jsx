import { Navigate } from "react-router-dom";
import useAuth from "../../zustand-store/auth/authStore";

const ProtectedRoute = ({ children, allowedTypes = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>جارٍ التحقق من الصلاحيات...</p>;

  if (!user) return <Navigate to="/" replace />;

  if (allowedTypes.length && !allowedTypes.includes(user.user_type)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
