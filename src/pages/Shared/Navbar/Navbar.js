import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const Navbar = () => {


    const { user, signOutUser, theme, ThemeChange, setTheme } = useContext(AuthContext);

    const navigate = useNavigate();


    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate('/')
            })
            .catch(error => console.error(error.message))

    }


    const handleThemeSwitch = () => {
        ThemeChange();
        //setTheme(null)
    }



    const menuItems = <React.Fragment>

        <li className='dark:text-white dark:hover:text-orange-500'><Link to='/'>Home</Link></li>
        <li className='dark:text-white dark:hover:text-orange-500'><Link to='/appointment'>Appointment</Link></li>
        <li className='dark:text-white dark:hover:text-orange-500'><Link to='/about'>About Us</Link></li>

        {
            user?.uid ?
                <>
                    {user?.uid && <p className='text-md text-blue-600 block lg:hidden'>Welcome, {user.email}</p>}

                    <li className='dark:text-white dark:hover:text-orange-500'><Link to='/dashboard'>Dashboard</Link></li>

                    <li className='text-red-600 font-bold'><button onClick={handleLogOut} className='bg-red-600 text-white rounded-lg'>Sign Out</button></li>

                </>
                :
                <>
                    <li className='font-bold'><Link to='/login' className='bg-green-600 text-white rounded-lg lg:mr-2'>Login</Link></li>
                    <li className='font-bold'><Link to='/signup' className='bg-blue-700 text-white rounded-lg sm:mt-2 md:mt-2 lg:mt-0 mt-2'>Signup</Link></li>
                </>
        }

        <input onClick={handleThemeSwitch} type="checkbox" className="toggle toggle-md my-auto ml-4 sm:mt-2 md:mt-2 mt-2 bg-black" title={theme === "dark" ? 'Light Mode' : 'Dark Mode'} />

    </React.Fragment>




    return (
        <div>
            <div className="navbar bg-base-100 flex justify-between dark:bg-gray-900 pb-6">

                <div className="navbar-start w-[400px]">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 dark:bg-gray-900">
                            {menuItems}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl dark:text-green-600 mt-6" href='/'>Doctors Portal</Link>
                </div>


                <div className='hidden lg:block'>
                    {
                        user?.uid && <p className='text-2xl text-blue-600 font-semibold'>Welcome, {user?.email ? user.email : user.email}</p>
                    }
                </div>


                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0 mt-6">
                        {menuItems}
                    </ul>
                </div>

                {/* dashboard er toggle button */}
                <label htmlFor="dashboard-drawer"  tabIndex={2} className="btn btn-ghost lg:hidden dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>

            </div>
        </div>
    );
};

export default Navbar;