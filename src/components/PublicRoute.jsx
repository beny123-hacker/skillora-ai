import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function PublicRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white text-xl">
        Loading...
      </div>
    );
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;