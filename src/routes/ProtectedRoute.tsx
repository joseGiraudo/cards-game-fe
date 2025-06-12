import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../store/store';

interface ProtectedRouteProps {
  allowedRoles: number[];
}


const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    // No autenticado
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // No tiene permisos
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;