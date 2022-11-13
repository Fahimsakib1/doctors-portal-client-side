import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const Navbar = () => {


    const { user, signOutUser } = useContext(AuthContext);

    const navigate = useNavigate();


    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                navigate('/')
            })
            .catch(error => console.error(error.message))

    }


    const menuItems = <React.Fragment>

        <li><Link to='/'>Home</Link></li>
        <li><Link to='/appointment'>Appointment</Link></li>
        <li><Link to='/about'>About Us</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        {
            user?.uid ?
                <>
                    {user?.uid && <p className='text-md text-blue-600 block lg:hidden'>Welcome, {user.displayName}</p>}
                    
                    {/* <li><Link to='/dashboard'>Dashboard</Link></li> */}
                    
                    <li className='text-red-600 font-bold'><button onClick={handleLogOut} className='bg-red-600 text-white rounded-lg'>Sign Out</button></li>

                </>
                :
                <>
                    <li className='font-bold'><Link to='/login' className='bg-green-600 text-white rounded-lg lg:mr-2'>Login</Link></li>
                    <li className='font-bold'><Link to='/signup' className='bg-blue-600 text-white rounded-lg sm:mt-2 lg:mt-0 md:mt-2'>Signup</Link></li>
                </>
        }

    </React.Fragment>


    return (
        <div>
            <div className="navbar bg-base-100 flex justify-between">

                <div className="navbar-start w-[400px]">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl" href='/'>Doctors Portal</Link>
                </div>


                <div className='hidden lg:block'>
                    {
                    user?.uid && <p className='text-2xl text-blue-600 font-semibold'>Welcome, {user?.displayName ? user.displayName : user.email}</p>
                    }
                </div>


                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;