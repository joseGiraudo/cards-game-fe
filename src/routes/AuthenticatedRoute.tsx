import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../store/store';

const AuthenticatedRoute = () => {

    const { user } = useSelector((state: RootState) => state.auth);

    return user ? <Outlet /> : <Navigate to="/login" replace />;

}

export default AuthenticatedRoute