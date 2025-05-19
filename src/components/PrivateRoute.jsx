import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hook/useAuth";
import useProfile from "../hook/useProfile";
import { Spin } from "antd";

export const AdminRoute = () => {
  const { isAuthenticated } = useAuth();
  const { profile, isLoading } = useProfile();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" tip="Đang tải..." />
      </div>
    );
  }

  if (profile?.role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default { AdminRoute };
