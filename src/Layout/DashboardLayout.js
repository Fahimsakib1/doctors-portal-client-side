import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import Navbar from '../pages/Shared/Navbar/Navbar';



const DashboardLayout = () => {

    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile ">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side ">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 bg-base-100 text-base-content dark:bg-gray-700 dark:text-white">

                        <Link to='/dashboard'><button className='btn btn-md bg-blue-600 '>My Appointments</button></Link>
                        {
                            isAdmin &&
                            <>
                                <Link to='/dashboard/users'><button className='btn btn-md bg-green-600 mt-4'> Registered Users</button></Link>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;


