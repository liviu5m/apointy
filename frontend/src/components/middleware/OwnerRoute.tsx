import { useAppContext } from "@/lib/AppProvider";
import { getUserRole } from "@/lib/utils";
import React from "react";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface OwnerRouteProps {
  children: ReactNode;
}

const OwnerRoute: React.FC<OwnerRouteProps> = ({ children }) => {
  const { user } = useAppContext();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to="/" state={{ from: location.pathname }} replace={true} />
    );
  }

  if (user.role != "BUSINESS_OWNER") {
    return (
      <Navigate
        to={`/${getUserRole(user)}/dashboard`}
        state={{ from: location.pathname }}
        replace={true}
      />
    );
  }
  return <>{children}</>;
};

export default OwnerRoute;
