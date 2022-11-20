import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';
import NavBar1 from '../pages/Shared/Navbar/NavBar1';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            {/* <NavBar1></NavBar1> */}
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main; 