import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';

const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    const [isAdmin, isAdminLoading] = useAdmin(user?.email)

    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="h-32 w-32 border-8 border-dashed rounded-full animate-spin border-black mx-auto mt-64"></div>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;