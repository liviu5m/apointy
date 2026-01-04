import { useAppContext } from "@/lib/AppProvider";
import { getUserRole } from "@/lib/utils";
import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface CustomerRouteProps {
  children: ReactNode;
}

const CustomerRoute: React.FC<CustomerRouteProps> = ({ children }) => {
  const { user } = useAppContext();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to="/" state={{ from: location.pathname }} replace={true} />
    );
  }

  if (user.role != "CUSTOMER") {
    return (
      <Navigate to={`/${getUserRole(user)}/dashboard`} state={{ from: location.pathname }} replace={true} />
    );
  }

  return <>{children}</>;
};

export default CustomerRoute;
