import React from 'react';
import { Link } from 'react-router-dom';
import footerimg from '../../../assets/images/footer.png';
import pic from '../../../assets/nav-footer-img/2.jpg';





const Footer = () => {

    const date = new Date()
    const year = date.getFullYear();

    return (
        <footer className=" mt-64 " style={{
            background: `url(${footerimg})`,
            backgroundSize: 'cover',
            backgroundPosition: "center"
        }}>

            <div className='footer bg-gray-800 py-12 px-16 text-white'>

                <div className=''>
                    <span className="footer-title ">Services</span>
                    <Link className="link link-hover" to='/'>Branding</Link>
                    <Link className="link link-hover" to='/'>Design</Link>
                    <Link className="link link-hover" to='/'>Marketing</Link>
                    <Link className="link link-hover" to='/'>Advertisement</Link>
                </div>

                <div className=''>
                    <span className="footer-title">Company</span>
                    <Link className="link link-hover" to='/'>About us</Link>
                    <Link className="link link-hover" to='/'>Contact</Link>
                    <Link className="link link-hover" to='/'>Jobs</Link>
                    <Link className="link link-hover" to='/'>Press kit</Link>
                </div>

                <div className=''>
                    <span className="footer-title">Legal</span>
                    <Link className="link link-hover" to='/'>Terms of use</Link>
                    <Link className="link link-hover" to='/'>Privacy policy</Link>
                    <Link className="link link-hover" to='/'>Cookie policy</Link>
                </div>

            </div>

            <div className='text-center  bg-gray-900 py-4 flex justify-center items-center gap-4 flex-col sm:flex-col md:flex-row'>
                <div>
                    <p className='font-semibold text-white'>{`Doctors Portal Copyright © ${year} - All right reserved by`} <span className='text-white'>Fahim Faysal</span></p>
                </div>
                <div className="avatar">
                    <div className="w-16 rounded-full">
                        <img src={pic} alt='' />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;