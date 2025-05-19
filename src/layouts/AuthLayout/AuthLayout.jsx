import { useEffect } from "react";
import useAuth from "../../hook/useAuth";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  return <Outlet />;
};

export default AuthLayout;
